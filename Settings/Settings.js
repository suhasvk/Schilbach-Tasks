// Settings.js
// Suhas Vijaykumar, September 2016

// Constants
SETTINGS_MODAL_SELECTOR = "#settingsModal";
SUBMIT_STIMULUS_BUTTON_SELECTOR = "#submitStimulusButton";
TASK_INPUT_SELECTOR = "#taskInput";

$("#fileInput").change(function(){
	if (($('#fileInput').val()).length > 0) {
		$('#fileName')
			.text($("#fileInput")[0].files[0].name)
		$("#createStimulus")
			.removeClass('disabled');
	}
});
console.log('dog')
$(document).ready(function(){
	$(SETTINGS_MODAL_SELECTOR).modal('show');
	

	$.get('/tasks-list', function(resp){
		$.each(resp.tasks, function(i,val){
			var opt = document.createElement("option");
			opt.text = val.NAME;
			opt.value = val.ID;
			$(TASK_INPUT_SELECTOR).append(opt);
		});
	})
});

