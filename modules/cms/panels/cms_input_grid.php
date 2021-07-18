<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class cms_input_grid extends CI_Controller {

	function __construct(){

		parent::__construct();

		// check if user
		if(empty($_SESSION['cms_user']['cms_user_id'])){
			header('Location: '.$GLOBALS['config']['base_url'].'cms_login/', true, 302);
			exit();
		}

		$this->load->model('cms/cms_css_model');
		$this->cms_css_model->add_css('modules/cms/css/cms_input.scss');
		
	}
	
	function panel_action($params){
		
		if(!empty($params['do'])){
			if ($params['do'] == 'create_row'){
				
				$this->load->model('cms/cms_page_panel_model');
				
				$base = $this->cms_page_panel_model->get_cms_page_panel($params['base_id']);
				$params['data'] = $this->run_panel_method($base['panel_name'], 'ds_'.$params['ds'], [
						'do' => 'C',
						'id' => $params['base_id'],
				]);
				
				print(json_encode(['result' => $params['data']], JSON_PRETTY_PRINT));
				
				die();
				
			}
		}
		
		return $params;
		
	}

	function panel_params($params){
		
		$params['data'] = [];

		if(!empty($params['base_id'])){
		
			$this->load->model('cms/cms_page_panel_model');
			$base = $this->cms_page_panel_model->get_cms_page_panel($params['base_id']);
			
			if (!empty($params['operations']) && stristr($params['operations'], 'S')){
				
				$params['fields'] = $this->run_panel_method($base['panel_name'], 'ds_'.$params['ds'], [
					'do' => 'S',
					'id' => $params['base_id'],
					'fields' => $params['fields'],
				]);
				
				if (!empty($params['fields']['_no_cache'])) unset($params['fields']['_no_cache']);

			}
			
			usort($params['fields'], function($a, $b){
				if (empty($a['order'])) $a['order'] = 20;
				if (empty($b['order'])) $b['order'] = 20;
				return ((int)$a['order'] > $b['order'])*2 - 1;
			});
					
			$params['data'] = $this->run_panel_method($base['panel_name'], 'ds_'.$params['ds'], [
					'do' => 'L',
					'id' => $params['base_id'],
			]);
			
			if (!empty($params['data']['_no_cache'])) unset($params['data']['_no_cache']);
		
		}
		
		$params['_params'] = &$params;

		return $params;

	}

}
