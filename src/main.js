// main.js
// This file contains the code which is to be executed when the application runs
// It defines and initializes controllers for different parts of the user interface


/*******
GLOBALS
*******/
// jQuery selectors
INITIAL_SETINGS_MODAL_SELECTOR = '#initialSettingsModal';
TASK_SELECT_LIST_SELECTOR = '#taskSelector';
EXIT_BUTTON_SELECTOR = '#initExitButton';
CONFIGURE_DEFAULT_SETTINGS_BUTTON_SELECTOR = "#configureDefaultSettingsButton";

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

	});

}

// Code to execute on page load.
$(document).ready(function(){
	sttingsController = new SettingsController();
	$(INITIAL_SETINGS_MODAL_SELECTOR).modal('show');
});

