// BeginTask.js
// This file contains the code which is to be executed when the application runs
// It defines and initializes controllers for different parts of the user interface


/*******
GLOBALS
*******/
// jQuery selectors
SETUP_MODAL_SELECTOR = '#setupModal';
RID_INPUT_SELECTOR = "#ridInput";
TASK_INPUT_SELECTOR = '#taskSelector';
RID_FORM_GROUP_SELECTOR = "#ridGroup";
PRESET_INPUT_SELECTOR = "#presetSelect";
CHOOSE_SETTINGS_BUTTON_SELECTOR = "#chooseSettingsButton"
BEGIN_SESSION_BUTTON_SELECTOR = "#beginSessionButton";

RID_INPUT_PANE_ITEM_SELECTOR = ".ridInputPaneItem";
SETTINGS_PRESET_PANE_ITEM_SELECTOR = ".presetPaneItem";

// Game names
// TODO: Pull these from database
// FOR NOW, MUST MATCH NAMES IN main.js HEADER
TASK_NAME_HEARTSANDFLOWERS = 'Hearts and Flowers';
TASK_NAME_CORSI = 'Corsi';
TASK_NAME_N_BACK = 'N-Back';

// Settings constants
AVAILABLE_TASKS_LIST = [
	TASK_NAME_HEARTSANDFLOWERS,
	TASK_NAME_CORSI,
	TASK_NAME_N_BACK
]
/**********
CONTROLLERS
**********/
function SessionCreationController() {

	var controller = this;

	this.requestSettings = function(){
		var rid = $(RID_INPUT_SELECTOR).val()
		var task = $(TASK_INPUT_SELECTOR).val()

		var data = {
			rid: rid,
			task: task,
			time: (new Date()).toJSON()
		};

		$.get('/validate-rid', data, function (resp){
			console.log();
			var bad_rid = resp.bad_rid;
			if (bad_rid){
				$(RID_FORM_GROUP_SELECTOR)
					.addClass("has-error has-feedback")
					.find('.form-control-feedback, .help-block')
						.removeClass('hidden');

			} else {
				$(RID_INPUT_PANE_ITEM_SELECTOR).addClass('hidden');
				$(SETTINGS_PRESET_PANE_ITEM_SELECTOR).removeClass('hidden');
				$.get('/settings-presets', data, function(resp){
					controller.rid = Number(resp.query.rid);
					$.each(resp.presets, function(i, val){
						var opt = document.createElement("option");
						opt.text = val.NAME;
						opt.value = val.ID;
						$(PRESET_INPUT_SELECTOR).append(opt);
						// TODO display summary of preset when selected
					});
				});	
			}
		});
	};

	this.createSession = function(){
		
		var data = {
			setting_id: Number($(PRESET_INPUT_SELECTOR).val()),
			rid: controller.rid
		};
		var form_data = new FormData();
		for (key in data) {
			form_data.append(key,data[key]);
		}
		$.ajax({
	    type: "POST",
		    url: "/create-session",
		    data: form_data,
		    processData: false,
		    contentType: false,
		    success: function(response) {
		    	if (!response.success) {
		    		// TODO CACHE RESULTS
		    	} else {
		    		window.location.href = "/HeartsAndFlowers.html?session_id="+response.session_id;
		    	}
		    },
		    error: function(errResponse) {
		        console.log(errResponse);
		    }
		});
	}

	// Populate task selection list
	$.each(AVAILABLE_TASKS_LIST, function(i, value){
		var opt = document.createElement("option");
		opt.text = value;
		opt.value = value;
		$(TASK_INPUT_SELECTOR).append(opt);
	});

	$(CHOOSE_SETTINGS_BUTTON_SELECTOR).click(function(evt,err){
		controller.requestSettings();
	});

	$(BEGIN_SESSION_BUTTON_SELECTOR).click(function(evt,err){
		controller.createSession();
	});


}

// Code to execute on page load.
$(document).ready(function(){
	scc = new SessionCreationController();
	$(SETUP_MODAL_SELECTOR).modal('show');
});

