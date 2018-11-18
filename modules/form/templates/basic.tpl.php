<div class="form_basic_container">
	<div class="form_basic_content">

		<?php if(!empty($heading)): ?>
			<div class="form_basic_title">
				<?= $heading ?>
			</div>
		<?php endif ?>

		<div class="form_basic_form">
			<form style="display: inline; " method="post">
			
				<input type="hidden" name="do" value="send_form">
				<input type="hidden" name="id" value="<?= $cms_page_panel_id ?>">

				<?php foreach($elements as $element): ?>
					<div class="form_basic_input form_basic_input_<?= $element['name'] ?>">

						<?php if (empty($label_as_placeholder)): ?>
							<label for="form_basic_<?php print($element['name']); ?>"><?= $element['label'] ?></label>
						<?php endif ?>

						<?php if ($element['type'] == 'text'): ?>
						
							<input class="form_basic_input_input <?php print($element['mandatory'] ? 'form_basic_mandatory' : ''); ?>" 
									id="form_basic_<?php print($element['name']); ?>" type="text" name="<?php print($element['name']); ?>"
									placeholder="<?= empty($label_as_placeholder) ? str_replace('[name]', $element['name'], $placeholder) : $element['label'] ?>"
									<?php _p(!empty($element['limit']) ? ' data-limit="'.$element['limit'].'" ' : ''); ?> >
						
						<?php elseif ($element['type'] == 'textarea'): ?>
							
							<textarea class="form_basic_input_input <?php print($element['mandatory'] ? 'form_basic_mandatory' : ''); ?>"
									id="form_basic_<?php print($element['name']); ?>" name="<?php print($element['name']); ?>"
									placeholder="<?= empty($label_as_placeholder) ? str_replace('[name]', $element['name'], $placeholder) : $element['label'] ?>"
									<?php _p(!empty($element['limit']) ? ' data-limit="'.$element['limit'].'" ' : ''); ?>></textarea>
						
						<?php elseif ($element['type'] == 'select'): ?>
						
							<select class="form_basic_input_input <?php print($element['mandatory'] ? 'form_basic_mandatory' : ''); ?>"
									id="form_basic_<?php print($element['name']); ?>" name="<?php print($element['name']); ?>">
									
								<?php if (!empty($label_as_placeholder)): ?>
									<option value="" disabled="disabled" selected="selected"><?= $element['label'] ?></option>
								<?php endif ?>
						
								<?php if (!empty($values)) foreach($values as $value): ?>
									<?php if ($value['element'] == $element['name']): ?>
										<option value="<?php print($value['value']); ?>"><?php print($value['label']); ?></option>
									<?php endif ?>
								<?php endforeach ?>
						
							</select>

						<?php elseif ($element['type'] == 'spacer'): ?>
														
						<?php endif ?>

					</div>
				<?php endforeach ?>

				<div class="form_basic_submit">
					<div class="form_basic_submit_label" <?php !empty($submit_icon) ? _ib($submit_icon, 20) : '' ?>><?= $submit_text ?></div>
				</div>
				
				<div class="form_basic_message">
					<div class="form_basic_message_text"><?= $success_message ?></div>
					<div class="form_basic_message_sending"><?= $sending_message ?></div>
				</div>

			</form>
		</div>

	</div>
</div>