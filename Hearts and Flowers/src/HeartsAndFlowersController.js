// HeartsAndFlowersController.js
// Suhas Vijaykumar, July 2016

function HeartsAndFlowersController(opts) {

	this.opts = opts;
	var appearanceTimer = null;
	var controller = this;
	results = [];
	var isFinalRound = false;

	this.beginSequence = function(){
		for (var i = 0; i < controler.opts.length; i++) {
			var current_opts = controller.opts[i];
			controller.game = HeartsAndFlowersTask(current_opts);
			switch(i){
				case 0:
					controller.animateDescription();
					controller.waitToBegin(practice=false);
					controller.animateHeartsIntro();
					controller.animateHeartsPractice();
					break;
				case 1:
					controller.animateFlowersIntro();
					controller.animateHeartsPractice();
					break;
				case 2: 
					controller.animateBothIntro();
					controller.animateBothPractice();
					break;
				case 3:
					controle.waitToBegin(practice=false);
					controller.animateHeartsIntro();
					break;
				case 4:
					controller.animateFlowersIntro();
					break;
				case 5:
					controller.animateBothIntro();
					isFinalRound = true;
					break;
			}
			controller.initialize(controller.game, i > 2);
			controller.game.begin();
		}
	};

	this.animateDescription = function() {
		console.log('animate description'); //debug
	};

	this.waitToBegin = function() {
		console.log('wait to begin'); //debug
	};

	this.animateHeartsIntro = function() {
		console.log('hearts description'); //debug
	};

	this.animateHeartsPractice = function() {
		console.log('hearts animated description'); //debug
	};

	this.animateFlowersIntro = function() {
		console.log('flowers description'); //debug
	};

	this.animateHeartsPractice = function() {
		console.log('flowers animated description'); //debug
	};

	this.show


	this.setDisplayCondition = function(data){
		if (controller.game.isRunning) {
			setTimeout(function(){
				switch(data.newCondition){
					case CONDITION_HEART_LEFT:
						$(HEART_LEFT_SELECTOR).show();
						break;
					case CONDITION_HEART_RIGHT:
						$(HEART_RIGHT_SELECTOR).show();
						break;
					case CONDITION_FLOWER_LEFT:
						$(FLOWER_LEFT_SELECTOR).show();
						break;
					case CONDITION_FLOWER_RIGHT:
						$(FLOWER_RIGHT_SELECTOR).show();
						break;
					default:
						console.log('INVALID INPUT IN "HeartsAndFlowersController.setDisplayCondition": ' + data.newCondition);
						break;
				}
				this.game.log({
					"type": "DISPLAY",
					"time": performance.now(),
					"condition": data.newCondition,
					"conditionNumber": data.number
				});

				appearanceTimer = setTimeout(function() {
						$(ALL_STIMULI_SELECTOR).hide();
						controller.game.update();
				}, controller.game.appearanceTime);
			}, data.wait);
		}
	};

	this.registerGameInput = function(input){
		controller.game.log({
			"type": "INPUT",
			"time": performance.now(),
			"input": input,
			"isCorrect": this.game.isCorrect(input, this.game.getCondition())
		});
	}

	////////////////////////
	// Model event listeners
	// 
	this.initialize = function(game, isPractice){
		game.addEventListener(EVENT_TASK_INPUT, function(data){
			controller.setDisplayCondition({
				"number": data.number,
				"wait": data.wait,
				"newCondition": data.newCondition
			});
		});
		game.addEventListener(EVENT_TASK_END, function(data){
			$(ALL_STIMULI_SELECTOR).css('display','none');
			controller.results.append(data.resultsSummary);
		});
	}

	////////////////////////
	// Model manipulation
	// 

	$(GAME_START_BUTTON_SELECTOR).click(function(evt,err){
		$(BEGIN_MODAL).modal('dismiss');
		controller.game.begin()
	});

	// Inputs during game
	$(LEFT_GAME_PANE_SELECTOR).click(function(evt,err){
		controller.registerGameInput(INPUT_LEFT);
	});

	$(RIGHT_GAME_PANE_SELECTOR).click(function(evt,err){
		controller.registerGameInput(INPUT_RIGHT);
	});

	$(window).keydown(function(evt,err){
		evt.preventDefault();
		switch(evt.keyCode){
			case 37:
				controller.registerGameInput(INPUT_LEFT);
				break;
			case 39:
				controller.registerGameInput(INPUT_RIGHT);
				break;
		}
	});

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


