<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

// load config
$working_directory = str_replace('\\', '/', trim(getcwd()).'/');
include($working_directory.'system/core/config.php');

// check if api call
if (substr($_SERVER['REQUEST_URI'], 0, strlen($GLOBALS['config']['base_url'])) == $GLOBALS['config']['base_url']) {
	$string = substr($_SERVER['REQUEST_URI'], strlen($GLOBALS['config']['base_url']));
} else {
	$string = $_SERVER['REQUEST_URI'];
}

$request_uri = trim($string, '/');

if (stristr($request_uri, '/')){
	
	list($module, $api) = explode('/', $request_uri, 2);
	
	if (!empty($GLOBALS['config']['module'][$module]['api'])){
	
		foreach($GLOBALS['config']['module'][$module]['api'] as $capi){
			if ($capi['id'] == $api){
				
				include($GLOBALS['config']['base_path'].'modules/'.$module.'/api/'.$api.'.php');
				die();
				
			}
		}
	
	}
	
}

// router - check if landing page and landing page set
if (empty($GLOBALS['config']['landing_page']['_value'])){
	$GLOBALS['config']['landing_page']['_value'] = '1';
	$GLOBALS['config']['landing_page']['url'] = '/';
}

// if landing page by slug
$landing_uri = trim($GLOBALS['config']['landing_page']['url'], '/');
if (!empty($landing_uri) && $landing_uri === $request_uri){
	header('Location: //'.$_SERVER['HTTP_HOST'].'/'.ltrim($GLOBALS['config']['base_url'], '/'), true, 307);
	exit();
}

// check if cron needs to run
if (!empty($GLOBALS['config']['cron_trigger']) && $GLOBALS['config']['cron_trigger'] == 'visits'){
	
	$cron_data_filename = $GLOBALS['config']['base_path'].'cache/cron.json';
	if (!file_exists($cron_data_filename) || (time() - filemtime($cron_data_filename)) >= 240){
		$GLOBALS['config']['js'][] = ['script' => 'modules/cms/js/cms_cron_run.js', 'sync' => 'defer', ];
	}

}

// start session
include($GLOBALS['config']['base_path'].'system/core/session.php');

// check for visitor target groups
$_SESSION['config']['targets']['hash'] = '';
if (!empty($GLOBALS['config']['targets_enabled'])){
	
	include($GLOBALS['config']['base_path'].'system/core/targets.php');
	
}

require_once(BASEPATH.'core/Common.php');
require_once(BASEPATH.'core/Controller.php');
require_once(BASEPATH.'core/bootstrap.php');
