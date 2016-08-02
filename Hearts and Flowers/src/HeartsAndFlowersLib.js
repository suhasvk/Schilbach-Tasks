// HeartsAndFlowersLib.js
// Suhas Vijaykumar, July 2016

// Constants
CONDITION_HEART_LEFT = 'HL';
CONDITION_HEART_RIGHT = 'HR';
CONDITION_FLOWER_LEFT = 'FL';
CONDITION_FLOWER_RIGHT = 'FR';

INPUT_LEFT = 'L';
INPUT_RIGHT = 'R';

// jQuery selectors
HEART_LEFT_SELECTOR = '#heartLeft';
FLOWER_LEFT_SELECTOR = '#flowerLeft';
HEART_RIGHT_SELECTOR = '#heartRight';
FLOWER_RIGHT_SELECTOR = '#flowerRight';
ALL_STIMULI_SELECTOR = '.stimulus';

GAME_START_BUTTON_SELECTOR = "#gameStartButton";

RIGHT_GAME_PANE_SELECTOR = '#game-right';
LEFT_GAME_PANE_SELECTOR = '#game-left';

// Event names
EVENT_TASK_START = 'start';
EVENT_TASK_END = 'end';
EVENT_TASK_INPUT = 'input';

// Utility functions
rand = function(min,max){
	return min + (max-min)*Math.random();
}

randomConditionList = function(length){
	var conditionList = []
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
	return conditionList;
}