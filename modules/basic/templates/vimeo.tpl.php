<div class="basic_vimeo_container <?= !empty($cover) ? ' basic_vimeo_cover ' : '' ?>">
	<div class="basic_vimeo_content" <?php !empty($image) ? _ib($image, 500) : '' ?>>

		<iframe class="basic_vimeo_iframe" src="https://player.vimeo.com/video/<?= $vimeo_id ?>?background=1" width="640" height="360" frameborder="0" 
			allow="autoplay; fullscreen" allowfullscreen></iframe>
		
		<?php if(!empty($soundcontrols)): ?>
			<div class="basic_vimeo_sound basic_vimeo_sound_is_off basic_vimeo_sound_align_<?= !empty($soundalign) ? $soundalign : 'right' ?>">
				<div class="basic_vimeo_sound_off" <?php _ib($sound_off, 20) ?>></div>
				<div class="basic_vimeo_sound_on" <?php _ib($sound_on, 20) ?>></div>
			</div>
		<?php endif ?>

	</div>
</div>