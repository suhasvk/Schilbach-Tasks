// HeartsAndFlowersController.js
// Suhas Vijaykumar, July 2016

function HeartsAndFlowersController(hfGame) {

	this.game = hfGame;
	this.appearanceTimer = null;

	this.setDisplayCondition = function setDisplayCondition(data){
		setTimeout(function(){
			switch(data.newCondition){
				case CONDITION_HEART_LEFT:
					console.log('poop');
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
				"type": "DISPLAY"
				"time": performance.now(),
				"condition": data.newCondition,
				"conditionNumber": data.number
			});
		}, data.wait);

		this.appearanceTimer = setTimeout(function() {
			$(ALL_STIMULI_SELECTOR).hide();
			this.game.update()
		}, this.game.appearanceTime);
	}

	this.registerGameInput = function(input){
		this.game.log({
			"type": "INPUT",
			"time": performance.now(),
			"input": input,
			"isCorrect": this.game.isCorrect(input, this.game.getCondition())
		});

		// The following lines make the current stimulus disappear and immediately begin the next isi upon input

		// clearTimeout(this.appearanceTimer);
		// $(ALL_STIMULI_SELECTOR).hide();
		// makeMove()
	}

	////////////////////////
	// Model event listeners
	// 
	this.game.addEventListener(EVENT_TASK_INPUT, function(data){
		this.setDisplayCondition({
			"number": data.number,
			"wait": data.wait,
			"newCondition": data.newCondition
		});
	});

	////////////////////////
	// Model manipulation
	// 



	// During game inputs
	
	$(LEFT_GAME_PANE_SELECTOR).click(function(evt,err){
		this.registerGameInput(INPUT_LEFT);
	});

	$(RIGHT_GAME_PANE_SELECTOR).click(function(evt,err){
		this.registerGameInput(INPUT_RIGHT);
	});

	$(window).keypress(function(evt,err){
		switch(evt.keyCode){
			case 37:
				this.registerGameInput(INPUT_LEFT);
				break;
			case 39:
				this.registerGameInput(INPUT_RIGHT);
				break;
		}
	});
}


