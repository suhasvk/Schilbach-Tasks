// HeartsAndFlowersTask.js
// Suhas Vijaykumar, July 2016

HeartsAndFlowersTask = function(ID,opts){
	console.log('building')

	var task = this;

	// This is the duration each stimulus is displayed
	this.appearanceTime = opts.appearanceTime;

	// The number of stimuli to display
	this.numberOfConditions = opts.numberOfConditions;

	// Whether or not to display a timer (for debugging / verification purposes)
	// [not implemented]
	// this.displayTimer = opts.displayTimer;

	// The intervals between stimuli
	this.intervals = [opts.waitTime]

	for (var n = 1; n < this.numberOfConditions; n++){
		this.intervals.push(rand(opts.isi.min,opts.isi.max))
	}

	this.conditionList = randomConditionList(this.numberOfConditions);

	this.conditionIndex = -1;

	// These are for logging game info
	this.results = [];
	this.gameData = {
		"ID": ID,
		"opts": opts,
		"conditions": this.conditionList,
		"intervals": this.intervals
	}

	this.isRunning = false;

	this.isCorrect = function(inpt, condition){
		return (((inpt == 'R') && (condition == 'HR' || condition == 'FL')) 
			|| ((inpt == 'L') && (condition == 'HL' || condition == 'FR')));
	}

	this.log = function(data){
		task.results.push(data);
	}

	this.begin = function(){
		if (task.conditionIndex == -1){
			task.isRunning = true;
			task.update();
		}

		else {
			console.log("Erraneous HeartsAndFlowersTask.begin() call.");
		}
	}

	this.recordResults = function(){
		// This is for debugging purposes. In the final version this will be written to a database.
		console.log(task.gameData);
		console.log(task.results);

	}

	this.end = function(isComplete){
		task.isRunning = false;
		task.recordResults();
		task.dispatchEvent(EVENT_TASK_END, {
			"complete": isComplete
		});
	}

	this.update = function(){
		task.conditionIndex++; 

		if (task.conditionIndex == task.numberOfConditions) {
			console.log('donezo');
			task.end(true);
		}

		else if (task.conditionIndex < task.numberOfConditions) {
			console.log('poopcop')
			task.dispatchEvent(EVENT_TASK_INPUT,{
				"number": task.conditionIndex + 1,
				"wait": task.getInterval(),
				"newCondition": task.getCondition()
			});
		}

		else {
			console.log('Erroneous late HeartsAndFlowersTask.udpate() call. Call number: '+toString(task.conditionIndex)+', Number of conditions: '+toString(task.numberOfConditions));
		}
	}

	this.getCondition = function(){
		return this.conditionList[this.conditionIndex];
	}

	this.getInterval = function(){
		return this.intervals[this.conditionIndex];
	}

	////////////////////////////
	// EVENT LISTENING INTERFACE
	// 

	this.allHandlers = new Array();

	/*
	 * Dispatch a new event to all the event listeners of a given event type
	 */
	this.dispatchEvent = function(type, details){
		var newEvent = details;

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
