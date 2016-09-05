// HeartsAndFlowersTask.js
// Suhas Vijaykumar, July 2016

HeartsAndFlowersTask = function(ID,opts){

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

	this.conditionList = randomConditionList(this.numberOfConditions, opts.phase);

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

	this.processResponses = function(log){
		var isLooking = false;
		var stimulusTime;
		var condition;
		var processedResults = [];

		for (var k = 0; k < log.length; k++){
			var data = log[k];
			if (data.type == "DISPLAY"){
				if (isLooking) {
					var summary = {
						time: Infinity,
						condition: condition,
						correct: false
					};
					processedResults.push(summary);
				}
				isLooking = true;
				stimulusTime = data.time;
				condition = data.condition;
			}
			else if (isLooking && (data.time - MIN_BUFFER_TIME > stimulusTime) && (data.type == "INPUT")) {
				isLooking = false;
				var summary = {
					time: (data.time - stimulusTime),
					condition: condition,
					correct: data.isCorrect
				}
				processedResults.push(summary);
			}
		}

		if (isLooking) {
			var summary = {
				time: Infinity,
				condition: condition,
				correct: false
			};
			processedResults.push(summary);
		}

		return processedResults;
	}

	this.createSummary = function(processedResults){
		var flowerTotal = 0;
		var heartTotal = 0;
		var flowerCorrect = 0;
		var heartCorrect = 0;
		var heartAverage = 0;
		var flowerAverage = 0;

		for (var k = 0; k < processedResults.length; k++) {
			var result = processedResults[k];
			if (result.condition[0] === "H") {
				heartTotal++;
				if (result.correct) {
					heartCorrect++;
					heartAverage = heartAverage*(heartTotal-1)/heartTotal + result.time/heartTotal;
				}
			}
			else if (result.condition[0] === "F") {
				flowerTotal++;
				if (result.correct) {
					flowerCorrect++;
					flowerAverage = flowerAverage*(flowerTotal-1)/flowerTotal + result.time/flowerTotal;
				}
			}
		}

		var totalCorrect = flowerCorrect + heartCorrect;
		var averageTime = (flowerAverage*flowerCorrect + heartAverage*heartCorrect)/totalCorrect;

		return {
			flowerTotal: flowerTotal,
			heartTotal: heartTotal,
			flowerCorrect: flowerCorrect,
			heartCorrect: heartCorrect,
			flowerAverage: flowerAverage,
			heartAverage: heartAverage,
			totalCorrect: totalCorrect,
			totalStimuli: flowerTotal + heartTotal,
			averageTime: averageTime,
			score: SCORE_FUNC(averageTime)*totalCorrect
		};
	}

	this.rawResults = function(){
		// This is for debugging purposes. In the final version this will be written to a database.
		return task.results;
	}

	this.resultsSummary = function(){
		return task.createSummary(task.processResponses(task.results));
	}

	this.end = function(isComplete){
		task.isRunning = false;
		task.dispatchEvent(EVENT_TASK_END, {
			"complete": isComplete,
			"resultsSummary": task.resultsSummary(),
			"resultsRaw": task.rawResults()
		});
	}

	this.update = function(){
		task.conditionIndex++; 

		if (task.conditionIndex == task.numberOfConditions) {
			task.end(true);
		}

		else if (task.conditionIndex < task.numberOfConditions) {
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
