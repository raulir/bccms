function cms_position_link_init(){
	
	$('a[data-_pl="1"]').each(function(){
		
		var $link = $(this);

		if (!$link.data('cms_position_link_ok')){
			$link.data('cms_position_link_ok', true)
			
			$link.on('click.cms', function(){
			
				var data = {}

				var $this = $(this)
				
				// default before
				if (!$._data($this.get(0), 'events')['before']){
					$this.on('before', function(){
					
						return new Promise(resolve => {
							$('.cms_position_main').css({'opacity':'0'})
							setTimeout(() => resolve($(this)), 300)
						})
					
					})
				}
				
				// default after
				if (!$._data($this.get(0), 'events')['after']){
					$this.on('after', function(){ 				

						return new Promise(resolve => {
							setTimeout(() => $('.cms_position_main').css({'opacity':''}), 300)
							resolve($(this))
						})
						
					})
				}
				
				var download_page = new Promise( resolve => {
						
					let positions = {}
					$('.cms_position').each(function(){
						var $this = $(this)
						positions[$this.data('position')] = $this.data('cms_page_id')
					})

					get_ajax_positions($this.attr('href'), {'cms_positions':positions}, function(result){
						resolve(result)
					})

				})
				
				var update_page = before_result => new Promise ( resolve => {
				
					let $backup_this = before_result[0].clone(true, true)

					$.each(before_result[1].positions, function(i, posdata){
						$('.cms_position_' + i).html(posdata._html).data('cms_page_id', posdata.cms_page_id)
					})
					
					change_url($this.attr('href'))
					document.title = before_result[1].title

					if (typeof gtag != 'undefined'){
							
						let $a = $('<a href="' + $this.attr('href') + '"></a>');
						let page = $a[0].pathname + $a[0].hash

						gtag('event', 'page_view', {
							page_title: before_result[1].title,
  							page_path: page
						})

					}

					setTimeout(() => {
						resolve($backup_this)
					}, 100)

				})
				
				Promise
					.all([$this.triggerHandler('before'), download_page])
					.then(update_page)
					.then($bu => $bu.triggerHandler('after'))
					.then($bu => $bu.remove())

				return false;
				
			});
			
		}
		
	});

}

/*
// save gmap
if ($('.akdn_map').length && !$('.akdn_map_backup').length){
	$('.akdn_map').addClass('akdn_map_backup').detach().appendTo('body');
}
*/

function cms_position_link_resize(){

}

$(document).ready(function() {
	
	$(window).on('resize.cms', function(){
		cms_position_link_resize();
	});
	
	cms_position_link_init();

	cms_position_link_resize();
	
});
