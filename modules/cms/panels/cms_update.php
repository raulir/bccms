<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class cms_update extends CI_Controller {

	function __construct(){

		parent::__construct();

		// check if user
		if(empty($_SESSION['cms_user']['cms_user_id'])){
			header('Location: '.$GLOBALS['config']['base_url'].'cms_login/', true, 302);
			exit();
		}

	}

	function panel_action($params){
		
		$this->load->model('cms/cms_update_model');

		$do = $this->input->post('do');

		if ($do == 'cms_update' && !empty($GLOBALS['config']['update']['allow_updates'])){

			$params['result'] = $this->cms_update_model->update();
			$params['ajax'] = true;

			$version_data = $this->cms_update_model->get_version('');
			$params['local_version'] = $version_data['version'];

			$version_data = $this->cms_update_model->get_master_version();
			$params['master_version'] = !empty($version_data['version']) ? $version_data['version'] : '';

		} else if ($do == 'cms_update_list'){
			 
			$params['result'] = $this->cms_update_model->get_needed_files();
			 
		} else if ($do == 'cms_update_file'){ // updates file
			 
			$filename = $this->input->post('filename');
			
			$this->cms_update_model->update_file($filename);
			 
			$params['result']['filename'] = $filename;
			$params['result']['fn_hash'] = md5($filename);
			$params['result']['letter'] = $this->input->post('letter');
			 
		} else if ($do == 'cms_update_copy'){

			$this->cms_update_model->update_copy();
			
			// check and update version information
			$master_data = $this->cms_update_model->get_master_version();
			$this->cms_update_model->rebuild();
			$local_data = $this->cms_update_model->get_version('');
			
			$master_hash = !empty($master_data['version_hash']) ? $master_data['version_hash'] : 'error';
			if ($local_data['current_hash'] == $master_hash){
				// update local json
				$this->cms_update_model->update_version_cache([
						'version' => !empty($master_data['version']) ? $master_data['version'] : '',
						'version_hash' => !empty($master_data['version_hash']) ? $master_data['version_hash'] : '',
						'version_time' => !empty($master_data['version_time']) ? $master_data['version_time'] : '',
						'update_time' => time(),
				]);
			}

		} else if ($do == 'cms_update_cleanup'){
			
			while ($this->cms_update_model->update_cleanup());
			
		}

		return $params;

	}

	function panel_params($params){

		if (!empty($params['ajax'])){
			return $params;
		}

		$this->load->model('cms/cms_update_model');

		$params['can_update'] = false;

		// update local hashes
		$params['data'] = $this->cms_update_model->rebuild();
		
		if (empty($GLOBALS['config']['update']['master'])){
			$GLOBALS['config']['update']['master'] = [];
		}
		
		if (!empty($GLOBALS['config']['update']['is_master'])){
			$GLOBALS['config']['update']['master'][] = '';
		}

		// get master version
		foreach($params['data'] as $key => $module){
			
			if (!in_array($module['module'], $GLOBALS['config']['update']['master'])){
				
				$version_data = $this->cms_update_model->get_master_version($module['module']);
// print('<pre>');
// print_r($version_data);
// print('</pre>');
				$params['data'][$key]['master_version'] = !empty($version_data['version']) ? $version_data['version'] : '';
				$params['data'][$key]['master_hash'] = !empty($version_data['current_hash']) ? $version_data['current_hash'] : '';
				$params['data'][$key]['master_time'] = !empty($version_data['version_time']) ? $version_data['version_time'] : 0;
				if ($params['data'][$key]['master_hash'] != $module['local_hash']){
					$params['data'][$key]['can_update'] = true;
				}
				
			} else {
				
				// check if to increment master version
				if (!empty($GLOBALS['config']['update']['master']) && in_array($module['module'], $GLOBALS['config']['update']['master'])){

					if ($module['local_hash'] !== $module['version_hash']){

						$this->cms_update_model->increment_master_version($module['module']);
						$local_data = $this->cms_update_model->get_version($module['module']);
						
//						print_r($local_data);
						
						$params['data'][$key]['local_version'] = $local_data['version'];
						$params['data'][$key]['local_hash'] = $local_data['version_hash'];
						$params['data'][$key]['current_hash'] = $local_data['current_hash'];
						$params['data'][$key]['local_updated'] = $local_data['version_time'];
						
					}
					
					$params['data'][$key]['status'] = 'This is master';
				
				}

			}
		
		}

		return $params;

	}

}
