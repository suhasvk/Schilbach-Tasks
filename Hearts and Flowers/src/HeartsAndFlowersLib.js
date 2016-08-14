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
PID_INPUT_GROUP_SELECTOR = "#pidGroup";

RIGHT_GAME_PANE_SELECTOR = '#game-right';
LEFT_GAME_PANE_SELECTOR = '#game-left';

HEART_STIMULI_SELECTOR = ".heart";
FLOWER_STIMULI_SELECTOR = ".flower";

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

randomConditionList = function(length, phase){
	var conditionList = []
	if (phase == TASK_PHASE_BOTH){
		for (var k = 0; k < length; k++){
			var z = Math.floor(rand(0,4));
			switch (z){
				case 0:
					conditionList.push(CONDITION_HEART_LEFT);
					break;
				case 1:
					conditionList.push(CONDITION_HEART_RIGHT);
					break;
				case 2:
					conditionList.push(CONDITION_FLOWER_LEFT);
					break;
				case 3: 
					conditionList.push(CONDITION_FLOWER_RIGHT);
					break;
			}
		}
	}

	else if (phase == TASK_PHASE_HEARTS) {
		for (var k = 0; k < length; k++){
			var z = Math.floor(rand(0,2));
			switch (z){
				case 0:
					conditionList.push(CONDITION_HEART_LEFT);
					break;
				case 1:
					conditionList.push(CONDITION_HEART_RIGHT);
					break;
			}
		}		
	}

	else if (phase == TASK_PHASE_FLOWERS) {
		for (var k = 0; k < length; k++){
			var z = Math.floor(rand(0,2));
			switch (z){
				case 0:
					conditionList.push(CONDITION_FLOWER_LEFT);
					break;
				case 1:
					conditionList.push(CONDITION_FLOWER_RIGHT);
					break;
			}
		}		
	}

	else console.log('ERROR INVALID TASK PHASE: ' + phase);
	return conditionList;
}