<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class gtm extends MY_Controller {

    function panel_params($params) {

    	$this->load->model('cms/cms_page_panel_model');

        $settings_a = $this->cms_page_panel_model->get_cms_page_panels_by(array('panel_name' => 'basic/gtm', ));
        $params['settings'] = !empty($settings_a[0]) ? $settings_a[0] : array();
    	
		return $params;

    }

}