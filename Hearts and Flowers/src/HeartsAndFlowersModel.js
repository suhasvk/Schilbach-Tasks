// HeartsAndFlowersTask.js
// Suhas Vijaykumar, July 2016

HeartsAndFlowersTask = function(ID,opts){

	// This is the duration each stimulus is displayed
	this.appearanceTime = opts.appearanceTime;

	// The number of stimuli to display
	this.numberOfConditions = opts.numberOfConditions;

	// Whether or not to display a timer (for debugging / verification purposes)
	// [not implemented]
	this.displayTimer = opts.displayTimer;

	// The intervals between stimuli
	this.itervals = [opts.waitTime]
	for (var n = 1; n < numberOfConditions; n++){
		this.intervalList.push(rand(opts.isi.min,opts.isi.max))
	}
	this.conditionList = randomConditionList(numberOfConditions);

	this.conditionIndex = -1;

	// These are for logging game info
	this.results = [];
	this.gameData = {
		"ID": ID,
		"opts": opts,
		"conditions": conditionList,
		"intervals": intervals
	}

	this.isRunning = false;

	this.isCorrect = function(inpt, condition){
		return (((inpt == 'R') && (condition == 'HR' || condition == 'FL')) 
			|| ((inpt == 'L') && (condition == 'HL' || condition == 'FR')));
	}

	this.log = function(data){
		this.results.push(data);
	}

	this.begin = function(){
		if (this.conditionIndex == -1){
			this.update();
			this.running = true;
		}

		else {
			console.log("Erraneous HeartsAndFlowersTask.begin() call.");
		}
	}

	this.recordResults = function(){
		// This is for debugging purposes. In the final version this will be written to a database.
		alert(this.gameData);
		alert(this.results);
	}

	this.end = function(){
		this.running = false;
		this.recordResults();
	}

	this.update = function(){
		this.conditionIndex++; 

		if (this.conditionIndex == this.numberOfConditions) {
			this.dispatchEvent(EVENT_GAME_END, {
				"complete": true
			});
			this.end();
		}


		this.dispatchEvent(EVENT_TASK_INPUT,{
			"number": this.conditionIndex + 1,
			"wait": this.intervals[this.conditionIndex],
			"newCondition": this.conditionList[this.conditionIndex]
		});
	}

	this.getCondition = function(){
		return conditionList[conditionIndex];
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
