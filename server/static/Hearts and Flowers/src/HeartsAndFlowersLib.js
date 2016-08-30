// HeartsAndFlowersLib.js
// Suhas Vijaykumar, July 2016

////////////////
// CONSTANTS
// 

// Scoring rules

// This is the amount of time (in milliseconds) after a stimulus appears when considered impossible for the user to have responded
MIN_BUFFER_TIME = 100;

// This is the score given for responding exactly at MIN_BUFFER_TIME after the stimulus appears
MAX_SCORE = 2;

SCORE_FUNC = function(time){
	return MAX_SCORE - (time-MIN_BUFFER_TIME)/1000;
}

CONDITION_HEART_LEFT = 'HL';
CONDITION_HEART_RIGHT = 'HR';
CONDITION_FLOWER_LEFT = 'FL';
CONDITION_FLOWER_RIGHT = 'FR';

INPUT_LEFT = 'L';
INPUT_RIGHT = 'R';

TASK_PHASE_HEARTS = 'HeartsPhase';
TASK_PHASE_FLOWERS = 'FlowersPhase';
TASK_PHASE_BOTH = 'BothPhase';

// jQuery selectors
HEART_LEFT_SELECTOR = '#heartLeft';
FLOWER_LEFT_SELECTOR = '#flowerLeft';
HEART_RIGHT_SELECTOR = '#heartRight';
FLOWER_RIGHT_SELECTOR = '#flowerRight';
ALL_STIMULI_SELECTOR = '.stimulus';

GAME_START_BUTTON_SELECTOR = "#gameStartButton";
BEGIN_TASK_MODAL_SELECTOR = "#beginTaskModal";
END_TASK_MODAL_SELECTOR = "#endTaskModal";
PID_INPUT_GROUP_SELECTOR = "#pidGroup";
PID_INPUT_SELECTOR = "#pidInput";

PID_CONFIRMATION_GROUP_SELECTOR = "#pidConfirmationGroup";
PID_CONFIRMATION_INPUT_SELECTOR = "#pidConfirmationInput";
SUBMIT_RESULTS_BUTTON_SELECTOR = "#submitResultsButton";
PID_CONFIRMATION_OVERRIDE_CHECKBOX_SELECTOR = "#pidConfirmOverride";

RESULTS_AREA_SELECTOR = '#resultsArea';

RIGHT_GAME_PANE_SELECTOR = '#game-right';
LEFT_GAME_PANE_SELECTOR = '#game-left';

HEART_STIMULI_SELECTOR = ".heart";
FLOWER_STIMULI_SELECTOR = ".flower";

GAME_AREA_SELECTOR = "#gameArea";
INSTRUCTIONS_BG_SELECTOR = "#instructions-bg";
INSTRUCTIONS_TEXT_AREA_SELECTOR = "#instructions-txt";
INSTRUCTIONS_IMAGE_AREA_SELECTOR = "#instructions-img";
ALL_INSTRUCTIONS_SELECTOR = ".instructions";

// Event names
EVENT_TASK_START = 'start';
EVENT_TASK_END = 'end';
EVENT_TASK_INPUT = 'input';
EVENT_BEGIN_SEQUENCE = 'beginSequence';
EVENT_END_SEQUENCE = 'endSequence';

// Utility functions
rand = function(min,max){
	return min + (max-min)*Math.random();
}

wait = function(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

randomConditionList = function(length, phase){
	var conditions = [CONDITION_HEART_LEFT, CONDITION_HEART_RIGHT, CONDITION_FLOWER_LEFT, CONDITION_FLOWER_RIGHT]
	var conditionList = []
	var l = ll = length;

	if (phase == TASK_PHASE_BOTH){
		if (length < 20){
			var types = [];
			while (l--) types[l] = (l < length/2); 
			while (ll--) {
				var k = Math.floor(rand(0,ll));
				var t = types[k]
				types[k] = types[ll];
				conditionList[ll] = conditions[t?Math.floor(rand(0,2)):Math.floor(rand(2,4))]
			}
		} else {
			while (l--) conditionList[l] = conditions[Math.floor(rand(0,4))];
		}
	}

	else if (phase == TASK_PHASE_HEARTS) {
		while (l--) conditionList[l] = conditions[Math.floor(rand(0,2))];
	}

	else if (phase == TASK_PHASE_FLOWERS) {
		while (l--) conditionList[l] = conditions[Math.floor(rand(2,4))];
	}

	else console.log('ERROR INVALID TASK PHASE: ' + phase);
	return conditionList;
}