<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class cms_input_date extends MY_Controller{

	function __construct(){

		parent::__construct();

		// check if user
		if(empty($_SESSION['cms_user']['cms_user_id'])){
			header('Location: '.$GLOBALS['config']['base_url'].'cms_login/', true, 302);
			exit();
		}

		$this->css[] = 'system/vendor/flatpickr/flatpickr.min.css';
		$this->js[] = 'system/vendor/flatpickr/flatpickr.min.js';
		
	}
	
	function panel_params($params){
		
		if (!empty($params['default']) && $params['default'] == 'today'){
			
			$params['default'] = date('Y-m-d');
			
		}
		
		if (empty($params['value']) && !empty($params['default'])){
			$params['value'] = $params['default'];
		}

		return $params;
		
	}

}
