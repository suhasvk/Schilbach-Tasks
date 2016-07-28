// main.js
// This file contains the code which is to be executed when the application runs
// It defines and initializes controllers for different parts of the user interface


/*******
GLOBALS
*******/
// jQuery selectors
SETUP_MODAL_SELECTOR = '#setupModal';
SETTINGS_MODAL_SELECTOR = '#settingsModal';
TASK_SELECT_LIST_SELECTOR = '#taskSelector';
EXIT_BUTTON_SELECTOR = '#initExitButton';
CONFIGURE_DEFAULT_SETTINGS_BUTTON_SELECTOR = "#configureDefaultSettingsButton";
SETUP_RID_INPUT_SELECTOR = '#ridInput';
SETUP_TASK_INPUT_SELECTOR = '#taskSelector';

SETUP_RID_INPUT_AND_GAME = '#ridInputAndGameSelection';
SETUP_CHOOSE_SETTINGS = '#settingsSelector';

// Game names
TASK_NAME_HEARTSANDFLOWERS = 'Hearts and Flowers';
TASK_NAME_CORSI = 'Corsi';

// Settings constants
AVAILABLE_TASKS_LIST = [
	TASK_NAME_HEARTSANDFLOWERS,
	TASK_NAME_CORSI
]

/**********
CONTROLLERS
**********/
function SettingsController() {

	self.createNewSetting = function(init, taskType){
		$(SETTINGS_MODAL_SELECTOR).modal('show');
	};
	// Populate task selection list
	$.each(AVAILABLE_TASKS_LIST, function(index, value){
		var optionElement = document.createElement("option");
		optionElement.text = value;
		optionElement.value = value;
		$(TASK_SELECT_LIST_SELECTOR).append(optionElement);
	});

	// Activate the exit button
	$(EXIT_BUTTON_SELECTOR).click(function(evt, err){
		window.close();
	});

	// Activate the 'configure default settings' button
	$(CONFIGURE_DEFAULT_SETTINGS_BUTTON_SELECTOR).click(function(evt,err){
		var rid = $(SETUP_RID_INPUT_SELECTOR).val();
		var task  = $(SETUP_TASK_INPUT_SELECTOR).val();

		currentSession = new Session({
			RID: rid,
			taskType: task
		});

		$(SETUP_MODAL_SELECTOR).modal('hide');
		self.createNewSetting(true,task);
	});
}

// Code to execute on page load.
$(document).ready(function(){
	sttingsController = new SettingsController();
	$(SETUP_MODAL_SELECTOR).modal('show');
});

