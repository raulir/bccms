<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

use Leafo\ScssPhp\Compiler;

if ( !function_exists('pack_css')) {
	
	function pack_css($csss, $scsss = array(), $return_array = false){

		// compile scss
		foreach($scsss as $scsss_item){
	
			// put together related scss files
			$scss_set = array_merge($scsss_item['related'], array($scsss_item['script']));
	
			// check if needed to compile
			$css_file_update_needed = false;
			foreach($scss_set as $scss_file){
				$css_file = $GLOBALS['config']['base_path'].$scsss_item['css'];
				// if needs update
				if(!file_exists($css_file) || (filemtime($GLOBALS['config']['base_path'].$scss_file) > filemtime($css_file))){
					$css_file_update_needed = true;
				}
			}
	
			if ($css_file_update_needed){
	
				// load files
				$scss_string = '';
				foreach($scsss_item['related'] as $scss_file){
					$scss_string .= file_get_contents($GLOBALS['config']['base_path'].$scss_file);
				}
				$prelines_count = substr_count($scss_string, "\n");
				$scss_string .= '/* CUT HERE */'.file_get_contents($GLOBALS['config']['base_path'].$scsss_item['script']);
	
				// compile scss
				require_once($GLOBALS['config']['base_path'].'application/libraries/scss/scss.inc.php');
		   
				$scss_compiler = new Compiler();
		   
				try {
					$compiled = $scss_compiler->compile($scss_string);

					list($throwaway, $css_string) = explode('/* CUT HERE */', $compiled);
					
					// if has resources
					if(!empty($scsss_item['module_path'])){
						
						// fonts x 2, background
						$css_string = str_replace(
								array("src: url('", ", url('", "image: url('../"), 
								array("src: url('../".$scsss_item['module_path'].'css/', ", url('../".$scsss_item['module_path'].'css/', "image: url('../".$scsss_item['module_path']), 
								$css_string);
						
					}
		
					file_put_contents($GLOBALS['config']['base_path'].$scsss_item['css'], 
							"/* \n".
							"    THIS FILE IS AUTOMATICALLY GENERATED\n".
							"    PLEASE DO NOT EDIT THIS FILE\n".
							"    LOCATION OF SOURCE:\n".
							"    ".$scsss_item['script']."\n".
							"*/\n".
							$css_string);

				} catch (Exception $e) {
					if (!empty($GLOBALS['config']['errors_visible'])){
						$error_str = $e->getMessage();
						list($error, $line_no) = explode(': line: ', $error_str);
						_html_error('SCSS error:<br>Message: '.$error.'<br>Filename: '.$scsss_item['script'].'<br>Line number: '.($line_no > 0 ? $line_no - $prelines_count : $line_no));
					}
				}

			}

			// remove from css array and put new cache css file there
			foreach($csss as $key => $css_item){
				if (is_array($css_item) && $css_item['script'] == str_replace('.scss', '.css', $scsss_item['script'])){
					unset($csss[$key]);
				}
			}
			$csss[] = array(
					'script' => $scsss_item['css'],
					'no_pack' => !empty($scsss_item['no_pack']) ? 1 : 0,
			);
	
		}
		 
		$css_arr = array();
		$csss_no_pack = array();
	
		// normalise css array
		foreach($csss as $key => $value){
			if (!is_array($value)){
				$csss[$key] = array(
						'script' => $value,
						'no_pack' => 0,
				);
			} else {
				if (empty($value['no_pack'])){
					$csss[$key]['no_pack'] = 0;
				} else {
					if (!in_array($csss[$key], $csss_no_pack)){
						$csss_no_pack[] = $csss[$key];
					}
					unset($csss[$key]);
				}
			}
		}
	
		// get unique
		$csss = array_intersect_key($csss, array_unique(array_map('serialize', $csss)));
		$css_arr = array_merge($csss_no_pack, $csss);
	
		$css_string = '';
	
		if (!empty($csss_no_pack)){
			foreach($csss_no_pack as $css){
				$css_string .= '<link rel="stylesheet" type="text/css" href="'.$GLOBALS['config']['base_url'].$css['script'].
				(!empty($GLOBALS['config']['cache']['force_download']) ? '?v='.time() : '').'"/>'."\n";
			}
		}
	
		if (!empty($csss)){
				
			if ($GLOBALS['config']['cache']['pack_css']){
	
				$hash = substr(md5(serialize($csss)), 0, 8);
				// check if any of files is changed
				$filename = $GLOBALS['config']['base_path'].'cache/'.$hash.'.css';
				$fileurl = $GLOBALS['config']['base_url'].'cache/'.$hash.'.css';
	
				if (file_exists($filename)){
					$filetime = filemtime($filename);
					$max_scripttime = 0;
					foreach($csss as $key => $css){
						$css = $GLOBALS['config']['base_path'] . trim($css['script'], '/');
						$max_scripttime = max(filemtime($css), $max_scripttime);
					}
				} else {
					$filetime = 0;
				}
	
				// if new css generation needed
				if (!file_exists($filename) || $max_scripttime > $filetime){
						
					touch($filename);
						
					// load all css files
					$css_contents = '';
					foreach($csss as $css){
						$css = $GLOBALS['config']['base_path'] . trim($css['script'], '/');
						$css_contents .= file_get_contents($css)."\n";
					}
						
					// TODO: needs minifier
					$css_contents = trim(preg_replace('/[ \t]+/', ' ', $css_contents));
					$css_contents = trim(preg_replace('/\r/', '', $css_contents));
					$css_contents = trim(preg_replace('/\n /', "\n", $css_contents));
					$css_contents = trim(preg_replace('/[\n]+/', "\n", $css_contents));
					file_put_contents($filename, $css_contents);
						
				}
	
				$css_string .= '<link rel="stylesheet" type="text/css" href="'.$fileurl.
				(!empty($GLOBALS['config']['cache']['force_download']) ? '?v='.time() : '').'"/>'."\n";
	
			} else {
	
				foreach($csss as $css){
					$css_string .= '<link rel="stylesheet" type="text/css" href="'.$GLOBALS['config']['base_url'].$css['script'].
					(!empty($GLOBALS['config']['cache']['force_download']) ? '?v='.time() : '').'"/>'."\n";
				}
			  
			}
				
		}

		if ($return_array){
			return $css_arr;
		} else {
			return $css_string;
		}
		 
	}
	
	function pack_js($js){
	
		// normalise js array
		foreach($js as $key => $value){
			if (!is_array($value)){
				$js[$key] = array(
						'script' => $value,
						'sync' => 'defer',
						'no_pack' => 0,
				);
			} else {
				if (empty($value['no_pack'])){
					$js[$key]['no_pack'] = 0;
				}
				if (!isset($value['sync'])){
					$js[$key]['sync'] = 'defer';
				}
			}
		}
		 
		// get unique
		$js = array_intersect_key($js, array_unique(array_map('serialize', $js)));
	
		$js_strs = array();
		$js_to_cache = array();
		foreach($js as $_js){
	
			$_js['script'] = str_replace('\\', '/', $_js['script']);
	
			if ($_js['sync'] == 'defer' && $GLOBALS['config']['cache']['pack_js'] && empty($_js['no_pack']) && substr($_js['script'], 0, 4) !== 'http'){
				$js_to_cache[] = $_js['script'];
			} else if (substr($_js['script'], 0, 4) !== 'http'){ // local script
				$js_strs[] = '<script type="text/javascript" src="'.$GLOBALS['config']['base_url'].$_js['script'].
				(!empty($GLOBALS['config']['cache']['force_download']) ? '?v='.time() : '').'" '.$_js['sync'].'></script>';
			} else { // outside script
				$js_strs[] = '<script type="text/javascript" src="'.$_js['script'].'" '.$_js['sync'].'></script>';
			}
	
		}
	
		$js_cache = '';
		if (!empty($js_to_cache)){
				
			$hash = substr(md5(implode(' ', $js_to_cache)), 0, 8);
			// check if any of files is changed
			$filename = $GLOBALS['config']['base_path'].'cache/'.$hash.'.js';
			$fileurl = $GLOBALS['config']['base_url'].'cache/'.$hash.'.js';
				
			if (file_exists($filename)){
				$filetime = filemtime($filename);
				$max_scripttime = 0;
				foreach($js_to_cache as $js_file){
					$js_file = $GLOBALS['config']['base_path'] . trim($js_file, '/');
					$max_scripttime = max(filemtime($js_file), $max_scripttime);
				}
			} else {
				$filetime = 0;
			}
				
			// if new js cache generation needed
			if (!file_exists($filename) || $max_scripttime > $filetime){
	
				touch($filename);
	
				// load all js files
				$js_string = '';
				foreach($js_to_cache as $js_file){
					$js_file = $GLOBALS['config']['base_path'] . trim($js_file, '/');
					$js_file_content = trim(file_get_contents($js_file));
						
					// if file ends with ) add ;
					if (mb_substr($js_file_content, -1) == ')'){
						$js_file_content .= ';';
					}
						
					$js_string .= $js_file_content."\n";
				}
	
				// TODO: needs minifier
				$js_string = trim(preg_replace('/[ \t]+/', ' ', $js_string));
				$js_string = trim(preg_replace('/\r/', '', $js_string));
				$js_string = trim(preg_replace('/\n /', "\n", $js_string));
				$js_string = trim(preg_replace('/[\n]+/', "\n", $js_string));
				file_put_contents($filename, $js_string);
	
			}
				
			$js_cache = '<script type="text/javascript" src="'.$fileurl.
			(!empty($GLOBALS['config']['cache']['force_download']) ? '?v='.time() : '').'" defer></script>';
	
		}
	
		return implode("\n", $js_strs)."\n".$js_cache;
	
	}
	
}
