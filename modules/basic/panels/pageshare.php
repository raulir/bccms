<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class pageshare extends CI_Controller{
	
	function panel_action($params){
		
		$do = $this->input->post('do');
        
        if ($do == 'shorten'){
        	$url = $_POST['url'];
        	$new_url = file_get_contents('http://v.gd/create.php?format=simple&url='.urlencode($url));
        	print(json_encode(array('url' => $new_url, )));
        	exit();
        }
        
        return $params;
 	
	}
	
	function panel_params($params){
		
		$this->load->model('cms/cms_page_panel_model');
		$params = array_merge($params, $this->cms_page_panel_model->get_cms_page_panel_settings('basic/pageshare'));
		
		return $params;
		
	}

}
