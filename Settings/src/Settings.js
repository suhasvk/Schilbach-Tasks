// Settings.js
// Suhas Vijaykumar, September 2016

// Constants
SETTINGS_MODAL_SELECTOR = "#settingsModal";
SUBMIT_STIMULUS_BUTTON_SELECTOR = "#submitStimulusButton";
TASK_INPUT_SELECTOR = "#taskInput";

VARIABLE_REGION_CLASS_SELECTOR = ".variable";
STIMULUS_CLASS_SELECTOR = ".stimulus"

STIMULUS_FILE_INPUT_BUTTON_SELECTOR = "#fileInput";
STIMULUS_FILE_SUBMIT_BUTTON_SELECTOR = "#createStimulus";
STIMULUS_NAME_ELEM_SELECTOR = "#stimulusName";
STIMULUS_FILENAME_ELEM_SELECTOR = "#fileName";

MECHANICS_TAB_SELECTOR = "#tab-mechanics";
PRACTICE_TAB_SELECTOR = "#tab-practice";
STIMULI_TAB_SELECTOR = "#stimuli-variable-region";

SUBMIT_SETTINGS_BUTTON_SELECTOR = "#chooseSettingsButton";

var populateSettings = function(spec){
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

var populateSettingsHelper = function(category, opts, fieldset, pane_selector){
	$.each(opts, function(i,v){

		var form_group = document.createElement("div");
		$(form_group).addClass("form-group");

		var label = document.createElement("label");
		$(label)
			.attr("for", 'settings'+i)
			.text(v["display"])
			.appendTo(form_group);
		if (v["type"]==="stimulus"){
			var s = document.createElement("select");
			$(s)
				.addClass('form-control')
				.addClass('stimulus')
				.attr("column", v["column"])
				.attr("id", 'settings'+i)
				.appendTo(form_group);

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
				.attr("id", 'settings'+i)
				.appendTo(form_group);
		}
		$(fieldset).append(form_group);
	});
	$(pane_selector).append(fieldset);
}

var loadStimuli = function(){
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

var submit = function(){
	var data = new FormData();
	$('input, select').each(function(i,v){
		if ($(this).attr('column')); {
			var column = $(this).attr('column');
			var val = $(this).val();
			data.append(column,val);
		}
	});

	console.log(data);

	$.ajax({
	    type: "POST",
	    url: "/create-setting",
	    data: data,
	    processData: false,
	    contentType: false,
	    success: function(response) {
	    	console.log(response);
	    	window.location.reload(true);
	    },
	    error: function(errResponse) {
	        console.log(errResponse);
	    }
	});
}

// var isInvalid = function(elem) {
// 	if ($(elem).attr("column")){
// 		return $(elem).val() === "";
// 	} else {
// 		return false;
// 	}
// }

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

	$(STIMULUS_FILE_INPUT_BUTTON_SELECTOR).change(function(){
		$("form[action='/new-stimulus']")
			.removeClass('has-success')
			.removeClass('has-danger');
		if (($(STIMULUS_FILE_INPUT_BUTTON_SELECTOR).val()).length > 0) {
			$(STIMULUS_FILENAME_ELEM_SELECTOR)
				.text($(STIMULUS_FILE_INPUT_BUTTON_SELECTOR)[0].files[0].name);
			$(STIMULUS_FILE_SUBMIT_BUTTON_SELECTOR)
				.removeClass('disabled');
		} else {
			$(STIMULUS_FILENAME_ELEM_SELECTOR).text('No file selected.');
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

	$(SUBMIT_SETTINGS_BUTTON_SELECTOR).click(function(ev,er){
		submit();
	});

	$("form[action='/new-stimulus']").submit(function(ev,er){
		ev.preventDefault();
		var form = this;

		var data = new FormData();
		data.append('stimulus-file',$(STIMULUS_FILE_INPUT_BUTTON_SELECTOR).get(0).files[0]);
		data.append('stimulus-name',$(STIMULUS_NAME_ELEM_SELECTOR).val());

		$.ajax({
		    type: "POST",
		    url: "/new-stimulus",
		    data: data,
		    processData: false,
		    contentType: false,
		    success: function(response) {
		    	console.log(response);
		        if (response.success) {
		        	$(form)
		        		.addClass('has-success');
    				$(STIMULUS_FILE_SUBMIT_BUTTON_SELECTOR)
						.addClass('disabled');
	        		loadStimuli();
		        } else {
		        	$(form)
		        		.addClass('has-error');
		        }
		    },
		    error: function(errResponse) {
		        console.log(errResponse);
		    }
		});
	});
});

