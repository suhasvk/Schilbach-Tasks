// HeartsAndFlowersController.js
// Suhas Vijaykumar, July 2016

function HeartsAndFlowersController(hfGame) {

	this.game = hfGame;
	var appearanceTimer = null;
	var controller = this;

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
	this.game.addEventListener(EVENT_TASK_INPUT, function(data){
		controller.setDisplayCondition({
			"number": data.number,
			"wait": data.wait,
			"newCondition": data.newCondition
		});
	});

	this.game.addEventListener(EVENT_TASK_END, function(data){
		$(ALL_STIMULI_SELECTOR).css('display','none');
	});

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
}


