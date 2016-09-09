// Settings.js
// Suhas Vijaykumar, September 2016

// Constants
SETTINGS_MODAL_SELECTOR = "#settingsModal";
SUBMIT_STIMULUS_BUTTON_SELECTOR = "#submitStimulusButton";
TASK_INPUT_SELECTOR = "#taskInput";

VARIABLE_REGION_CLASS_SELECTOR = ".variable";
STIMULUS_CLASS_SELECTOR = ".stimulus"

MECHANICS_TAB_SELECTOR = "#tab-mechanics";
PRACTICE_TAB_SELECTOR = "#tab-practice";
STIMULI_TAB_SELECTOR = "#stimuli-variable-region";

function populateSettings(spec){
	var mechanics_opts = spec["mechanics"];
	var mechanics_fieldset = document.createElement("fieldset");
	populateSettingsHelper("mechanics",mechanics_opts, mechanics_fieldset, MECHANICS_TAB_SELECTOR)

	var practice_opts = spec["practice"];
	var practice_fieldset = document.createElement("fieldset");
	populateSettingsHelper("practice",practice_opts, practice_fieldset, PRACTICE_TAB_SELECTOR)

	var stimuli_opts = spec["stimuli"];
	var stimuli_fieldset = document.createElement("fieldset");
	populateSettingsHelper("practice",stimuli_opts, stimuli_fieldset, STIMULI_TAB_SELECTOR)

	loadStimuli();

}

function populateSettingsHelper(category, opts, fieldset, pane_selector){
	$.each(opts, function(i,v){

		var label = document.createElement("label")
		$(label)
			.attr("for", 'settings'+i)
			.text(v["display"])
			.appendTo(fieldset);
		if (v["type"]==="stimulus"){
			var s = document.createElement("select");
			$(s)
				.addClass('form-control')
				.addClass('stimulus')
				.attr("column", v["column"])
				.appendTo(fieldset);

		} else {
			var input = document.createElement(v["type"])
			if (v["type"] == "select"){
				$.each(resp.tasks, function(i,val){
					var opt = document.createElement("option");
					opt.text = val.name;
					opt.value = val.id;
					$(input).append(opt);
				});
			}
			$(input)
				.addClass("form-control")
				.attr("column", v["column"])
				.appendTo(fieldset);
		}
	});
	$(pane_selector).append(fieldset);
}

function loadStimuli(){
	$.get('/stimuli-list', function(resp){
		$(STIMULUS_CLASS_SELECTOR).empty();
		$.each(resp.tasks, function(i,val){
			var opt = document.createElement("option");
			opt.text = val.NAME;
			opt.value = val.ID;
			$(opt)
				.attr("path",val.PATH)
				.appendTo(STIMULUS_CLASS_SELECTOR);
		});
	});
}

function submit(){
	var data = {};
	$('input, select').each(function(i,v){
		var column = $(this).attr('column');
		var val = $(this).val();
		data[column] = val;
	});

	console.log(data);


}


$(document).ready(function(){
	$(SETTINGS_MODAL_SELECTOR).modal('show');


	$.get('/tasks-list', function(resp){
		$.each(resp.tasks, function(i,val){
			var opt = document.createElement("option");
			opt.text = val.NAME;
			opt.value = val.ID;
			$(TASK_INPUT_SELECTOR).append(opt);
		});
	});

	$("#fileInput").change(function(){
		if (($('#fileInput').val()).length > 0) {
			$('#fileName')
				.text($("#fileInput")[0].files[0].name)
			$("#createStimulus")
				.removeClass('disabled');
		}
	});



	$(TASK_INPUT_SELECTOR).change(function(ev,er){
		var task_id = Number($(this).val());
		// $(VARIABLE_REGION_CLASS_SELECTOR).empty()
		switch(task_id){
			case 1:
				populateSettings(HEARTS_AND_FLOWERS_SETTINGS_META);
			case 2:
				// TODO POPULATE CORSI SETTINGS
				break;

			case 3:
				// TODO POUPLATE N-BACK SETTINGS
				break;
		}
	});
});
