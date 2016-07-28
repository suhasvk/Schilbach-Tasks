// HeartsAndFlowersGame.js
// Suhas Vijaykumar, July 2016

rand = function(min,max){
	return min + (max-min)*Math.random();
}

randomConditionList = function(length){
	var conditionList = []
	for (var k = 0; k < length; k++){
		var conditionNumber = Math.floor(rand(0,4));
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

HeartsAndFlowersTask = function(opts){

	// This is the duration each stimulus is displayed
	this.appearanceTime = opts.appearanceTime;

	// This is the amount of time which passes after the game starts, before the first stimulus appears
	this.waitTime = opts.waitTime;

	// The number of stimuli to display
	this.numberOfConditions = opts.numberOfConditions;

	// Whether or not to display a timer (for debugging / verification purposes)
	// [not implemented]
	this.displayTimer = opts.displayTimer;

	this.itervals = []
	for (var n = 0; n < numberOfConditions; n++){
		this.intervalList.push(rand(opts.isi.min,opts.isi.max))
	}
	this.conditionList = randomConditionList(numberOfConditions);

	this.conditionNumber = -1;

	// These are for logging game info
	this.results = [];
	this.gameData = {
		// Stuff
	}
	this.running? = false;

	this.getStartTime = function(){
		return this.startTime;
	}

	this.isCompatible = function(inpt, condition){
		return (((inpt == 'R') && (condition == 'HR' || condition == 'FL')) 
			|| ((inpt == 'L') && (condition == 'HL' || condition == 'FR')));
	}


	this.logMove = function(data){
		this.results.push({
			"type": "INPUT",
			"time": data.time,
			"direction": data.input,
			"condition": data.condition,
			"correct?": this.isCompatible(data.input, data.condition);
		});
	}

	this.logDisplay = function(data){
		this.results.push({
			"type": "OUTPUT",
			"time": data.time,
			"condition": data.condition
		});
	}

	this.startTask = function(){
		this.conditionNumber = 0;
		this.running = true;
		this.dispatchEvent('start',{
			"number": this.conditionNumber,
			"newCondition": this.conditionList[this.conditionNumber],
		})

	}

	this.makeMove = function(data){
		this.conditionNumber++;
		this.dispatchEvent('move',{
			"number": this.conditionNumber,
			"newCondition": this.conditionList[this.conditionNumber],
		});
	}

	this.getCondition = function(){
		return conditionList[conditionNumber];
	}

	////////////////////////////
	// EVENT LISTENING INTERFACE
	// 

	this.allHandlers = new Array();

	/*
	 * Dispatch a new event to all the event listeners of a given event type
	 */
	this.dispatchEvent = function(type, details){
		var newEvent = new BoardEvent(type, details);

		if (this.allHandlers[type]){
			for (var i in this.allHandlers[type]){
				this.allHandlers[type][i](newEvent);
			}
		}
	}

	/**
	 * Add a new event listener for a given event type
	 * the parameter 'handler' has to be a function with one parameter which is an event object
	 */
	this.addEventListener = function(eventType, handler){
		if (!this.allHandlers[eventType])
			this.allHandlers[eventType] = [];
		this.allHandlers[eventType].push(handler);
	}		
}