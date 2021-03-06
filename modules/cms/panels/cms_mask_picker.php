<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class cms_mask_picker extends CI_Controller {

	function __construct(){

		parent::__construct();

		// check if user
		if(empty($_SESSION['cms_user']['cms_user_id'])){
			header('Location: '.$GLOBALS['config']['base_url'].'cms_login/', true, 302);
			exit();
		}
		
		add_css('cms/cms_input.scss');
		add_css('cms/cms_popup.scss');
		
		$GLOBALS['_panel_js'][] = [
				'script' => 'modules/cms/js/cms_popup.js',
				'sync' => 'defer', 
		];
		
	}

	function panel_params($params){

		return $params;
		
	}

}
