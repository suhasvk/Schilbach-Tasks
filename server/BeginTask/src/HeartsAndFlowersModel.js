// HeartsAndFlowersGame.js
// Suhas Vijaykumar, July 2016

// Constants
CONDITION_HEART_LEFT = 'HL'
CONDITION_HEART_RIGHT = 'HR'
CONDITION_FLOWER_LEFT = 'FL'
CONDITION_FLOWER_RIGHT = 'FR'

randInt = function(min,max){
	return Math.floor(min + (max-min)*Math.random());
}

randomConditionList = function(length){
	var conditionList = []
	for (var k = 0; k < length; k++){
		var conditionNumber = randInt(0,4);
		var condition;
		switch (conditionNumber){
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

HeartsAndFlowersTask = function(gameOptions){
	this.timeInterval = gameOptions.timeInterval;
	this.numberOfConditions = gameOptions.numberOfConditions;
	this.displayTimer = gameOptions.displayTimer;
	this.conditionList = randomConditionList(numberOfConditions);
	this.conditionNumber = -1;
	this.gameData = {
		// Stuff
	}

	this.startTask = function(data){
		// Stuff
	}

	this.makeMove = function(data){
		// Stuff
	}

	this.getCondition = function(){
		return conditionList[conditionNumber];
	}
		
}