// HeartsAndFlowersController.js
// Suhas Vijaykumar, July 2016

function HeartsAndFlowersController(opts) {

	this.opts = opts;
	console.log(opts);
	var appearanceTimer = null;
	var controller = this;
	var results = [];
	var isFinalRound = false;
	var phaseIndex = 0;

	this.reset = function(){
		isFinalRound = false;
		controller.game = null;
		controller.pid = null;
		appearanceTimer = null;
		phaseIndex = 0;
		results = [];
	}

	this.recordResults = function(){
		//TODO
		return;
	}

	this.beginPhase = function(){
		controller.game = new HeartsAndFlowersTask(controller.pid,controller.opts[phaseIndex]);
		controller.initialize(controller.game, phaseIndex > 2);
		switch(phaseIndex){
			case 0:
				setTimeout(function(){
					controller.heartsIntro(controller.game,true,false);
				}, 500);
				break;
			case 1:
				setTimeout(function(){
					controller.flowersIntro(controller.game,true,false);
				}, 500);
				break;
			case 2: 
				setTimeout(function(){
					controller.bothIntro(controller.game,true,false);
				}, 500);
				break;
			case 3:
				setTimeout(function(){
					controller.heartsIntro(controller.game,true,true);
				}, 500);
				break;
			case 4:
				setTimeout(function(){
					controller.flowersIntro(controller.game,true,true);
				}, 500);
				break;
			case 5:
				setTimeout(function(){
					controller.bothIntro(controller.game,true,true);
				}, 500);
				isFinalRound = true;
				break;
		}
	};

	this.heartsIntro = function(game, isLong, isReal) {
		$(INSTRUCTIONS_TEXT_AREA_SELECTOR)
			.html((isReal ? '<p><strong>You are now being timed.</strong></p>' : '') + '<p> In the first section, <strong>hearts</strong> will appear on the screen. </p> <p> When a heart appears, press on the <strong>same side</strong> as the heart. </p>');
			
		$(INSTRUCTIONS_IMAGE_AREA_SELECTOR)
			.append(
				$(document.createElement('img'))
					.attr('src',controller.opts[0].stimuli.heart)
				);

		$(ALL_INSTRUCTIONS_SELECTOR)
			.toggleClass('show')


		$(GAME_AREA_SELECTOR).toggleClass('demo');
		var [l_ar, r_ar] = controller.makeControls();

		if (isLong && !isReal){
			setTimeout(function(){
				$(ALL_INSTRUCTIONS_SELECTOR).toggleClass('show')
			},8000)

			setTimeout(function(){
				$(l_ar).show();
				$(r_ar).show();
			},9000)

			setTimeout(function(){
				$(HEART_RIGHT_SELECTOR).show();
			},11000)
			
			for (var i = 0; i < 3; i++) {
				setTimeout(function(){
					controller.flashControl(r_ar);
				},12000 + i * 1000)
			};

			setTimeout(function(){
				$(HEART_RIGHT_SELECTOR).hide();
			}, 15000);

			setTimeout(function(){
				$(HEART_LEFT_SELECTOR).show();
			}, 16000);

			for (var i = 0; i < 3; i++) {
				setTimeout(function(){
					controller.flashControl(l_ar);
				},17000 + i * 1000)
			};

			setTimeout(function(){
				$(HEART_LEFT_SELECTOR).hide();
				$(l_ar).hide().detach();
				$(r_ar).hide().detach();
			}, 20000);

			setTimeout(function(){
				$(ALL_INSTRUCTIONS_SELECTOR).toggleClass('show');	
			}, 21000);

			setTimeout(function(){
				$(INSTRUCTIONS_TEXT_AREA_SELECTOR).append(
					$(document.createElement('button'))
						.addClass('btn')
						.addClass('btn-danger')
						.addClass('btn-lg')
						.addClass('btn-block')
						.text('Click here to '+(isReal?'begin':'practice')+'.')
						.click(function(ev,er){
							$(ALL_INSTRUCTIONS_SELECTOR)
								.toggleClass('show')
								.empty();
							$(GAME_AREA_SELECTOR).toggleClass('demo');
							setTimeout(function(){
								game.begin();
							}, 1000);
						})
				);
			}, 22000);
		} else {
			$(INSTRUCTIONS_TEXT_AREA_SELECTOR).append(
					$(document.createElement('button'))
						.addClass('btn')
						.addClass('btn-danger')
						.addClass('btn-lg')
						.addClass('btn-block')
						.text('Click here to '+(isReal?'begin':'practice')+'.')
						.click(function(ev,er){
							$(ALL_INSTRUCTIONS_SELECTOR)
								.toggleClass('show')
								.empty();
							$(GAME_AREA_SELECTOR).toggleClass('demo');
							setTimeout(function(){
								game.begin();
							}, 1000);
						})
				);
		}
	};

	this.flowersIntro = function(game, isLong, isReal) {

		$(INSTRUCTIONS_TEXT_AREA_SELECTOR)
			.html('<p> In the second section, <strong>flowers</strong> will appear on the screen. </p> <p> When a flower appears, press on the <strong>opposite side</strong> from the flower. </p>');
			
		$(INSTRUCTIONS_IMAGE_AREA_SELECTOR)
			.append(
				$(document.createElement('img'))
					.attr('src',controller.opts[0].stimuli.flower)
				);

		$(ALL_INSTRUCTIONS_SELECTOR)
			.toggleClass('show')

		$(GAME_AREA_SELECTOR).toggleClass('demo');
		var [l_ar, r_ar] = controller.makeControls();

		if (isLong && !isReal){
			setTimeout(function(){
				$(ALL_INSTRUCTIONS_SELECTOR).toggleClass('show')
			},8000)

			setTimeout(function(){
				$(l_ar).show();
				$(r_ar).show();
			},9000)

			setTimeout(function(){
				$(FLOWER_RIGHT_SELECTOR).show();
			},11000)
			
			for (var i = 0; i < 3; i++) {
				setTimeout(function(){
					controller.flashControl(l_ar);
				},12000 + i * 1000)
			};

			setTimeout(function(){
				$(FLOWER_RIGHT_SELECTOR).hide();
			}, 15000);

			setTimeout(function(){
				$(FLOWER_LEFT_SELECTOR).show();
			}, 16000);

			for (var i = 0; i < 3; i++) {
				setTimeout(function(){
					controller.flashControl(r_ar);
				},17000 + i * 1000)
			};

			setTimeout(function(){
				$(FLOWER_LEFT_SELECTOR).hide();
				$(l_ar).hide().detach();
				$(r_ar).hide().detach();
			}, 20000);

			setTimeout(function(){
				$(ALL_INSTRUCTIONS_SELECTOR).toggleClass('show');	
			}, 21000);

			setTimeout(function(){
				$(INSTRUCTIONS_TEXT_AREA_SELECTOR).append(
					$(document.createElement('button'))
						.addClass('btn')
						.addClass('btn-danger')
						.addClass('btn-lg')
						.addClass('btn-block')
						.text('Click here to '+(isReal?'begin':'practice')+'.')
						.click(function(ev,er){
							$(ALL_INSTRUCTIONS_SELECTOR)
								.toggleClass('show')
								.empty();
							$(GAME_AREA_SELECTOR).toggleClass('demo');
							setTimeout(function(){
								game.begin();
							}, 1000);
						})
				);
			}, 22000);
		} else {
			$(INSTRUCTIONS_TEXT_AREA_SELECTOR).append(
					$(document.createElement('button'))
						.addClass('btn')
						.addClass('btn-danger')
						.addClass('btn-lg')
						.addClass('btn-block')
						.text('Click here to '+(isReal?'begin':'practice')+'.')
						.click(function(ev,er){
							$(ALL_INSTRUCTIONS_SELECTOR)
								.toggleClass('show')
								.empty();
							$(GAME_AREA_SELECTOR).toggleClass('demo');
							setTimeout(function(){
								game.begin();
							}, 1000);
						})
				);
		}
	};

	this.bothIntro = function(game, isLong, isReal) {

		$(INSTRUCTIONS_TEXT_AREA_SELECTOR)
			.css('font-size','1.5em')
			.html('<p> In the third section, <strong>both hearts and flowers</strong> will appear on the screen. </p><p> When a heart appears, press on the <strong>same side</strong> as the heart. </p><p> When a flower appears, press on the <strong>opposite side</strong> from the flower. </p>');
			
		$(INSTRUCTIONS_IMAGE_AREA_SELECTOR)
			.append(
				$(document.createElement('img'))
					.attr('src',controller.opts[0].stimuli.heart)
					.css('height','60%')
					.css('width','60%')
				)
			.append(
				$(document.createElement('img'))
					.attr('src',controller.opts[0].stimuli.heart)
					.css('height','40%')
					.css('width','40%')
					.css('opacity','0')
				)
			.append(
				$(document.createElement('img'))
					.attr('src',controller.opts[0].stimuli.flower)
					.css('height','40%')
					.css('width','40%')
					.css('opacity','0')
				)
			.append(
				$(document.createElement('img'))
					.attr('src',controller.opts[0].stimuli.flower)
					.css('height','60%')
					.css('width','60%')
					.css('position','relative')
					.css('top','-20%')
				);


		$(ALL_INSTRUCTIONS_SELECTOR)
			.toggleClass('show')

		$(GAME_AREA_SELECTOR).toggleClass('demo');

		var [l_ar, r_ar] = controller.makeControls();

		if (isLong && !isReal){
			setTimeout(function(){
				$(ALL_INSTRUCTIONS_SELECTOR).toggleClass('show')
			},8000)

			setTimeout(function(){
				$(l_ar).show();
				$(r_ar).show();
			},9000)

			setTimeout(function(){
				$(HEART_RIGHT_SELECTOR).show();
			},11000)
			
			for (var i = 0; i < 3; i++) {
				setTimeout(function(){
					controller.flashControl(r_ar);
				},12000 + i * 1000)
			};

			setTimeout(function(){
				$(HEART_RIGHT_SELECTOR).hide();
			}, 15000);

			setTimeout(function(){
				$(HEART_LEFT_SELECTOR).show();
			}, 16000);

			for (var i = 0; i < 3; i++) {
				setTimeout(function(){
					controller.flashControl(l_ar);
				},17000 + i * 1000)
			};

			setTimeout(function(){
				$(HEART_LEFT_SELECTOR).hide();
			}, 20000);

			setTimeout(function(){
				$(FLOWER_RIGHT_SELECTOR).show();
			}, 21000)
			
			for (var i = 0; i < 3; i++) {
				setTimeout(function(){
					controller.flashControl(l_ar);
				},22000 + i * 1000)
			};

			setTimeout(function(){
				$(FLOWER_RIGHT_SELECTOR).hide();
			}, 25000);

			setTimeout(function(){
				$(FLOWER_LEFT_SELECTOR).show();
			}, 26000);

			for (var i = 0; i < 3; i++) {
				setTimeout(function(){
					controller.flashControl(r_ar);
				},27000 + i * 1000)
			};

			setTimeout(function(){
				$(FLOWER_LEFT_SELECTOR).hide();
				$(l_ar).hide().detach();
				$(r_ar).hide().detach();
			}, 30000);

			setTimeout(function(){
				$(ALL_INSTRUCTIONS_SELECTOR).toggleClass('show');	
			}, 31000);

			setTimeout(function(){
				$(INSTRUCTIONS_TEXT_AREA_SELECTOR).append(
					$(document.createElement('button'))
						.addClass('btn')
						.addClass('btn-danger')
						.addClass('btn-lg')
						.addClass('btn-block')
						.text('Click here to '+(isReal?'begin':'practice')+'.')
						.click(function(ev,er){
							$(ALL_INSTRUCTIONS_SELECTOR)
								.toggleClass('show')
								.empty();
							$(GAME_AREA_SELECTOR).toggleClass('demo');
							setTimeout(function(){
								game.begin();
							}, 1000);
						})
				);
			}, 32000);
		} else {
			$(INSTRUCTIONS_TEXT_AREA_SELECTOR).append(
					$(document.createElement('button'))
						.addClass('btn')
						.addClass('btn-danger')
						.addClass('btn-lg')
						.addClass('btn-block')
						.text('Click here to '+(isReal?'begin':'practice')+'.')
						.click(function(ev,er){
							$(ALL_INSTRUCTIONS_SELECTOR)
								.toggleClass('show')
								.empty();
							$(GAME_AREA_SELECTOR).toggleClass('demo');
							setTimeout(function(){
								game.begin();
							}, 1000);
						})
				);
		}
	};

	this.makeControls = function(){
		var leftArrow = $(document.createElement('span'))
			.addClass('glyphicon')
			.addClass('glyphicon-triangle-left')
			.css('font-size','2.5em')
			.get(0);

		var rightArrow = $(document.createElement('span'))
			.addClass('glyphicon')
			.addClass('glyphicon-triangle-right')
			.css('font-size','2.5em')
			.get(0);

		var height = $(GAME_AREA_SELECTOR).innerHeight();
		var width = $(GAME_AREA_SELECTOR).outerWidth(true);
		var mid_offset = $(RIGHT_GAME_PANE_SELECTOR).offset().left;
		var bot_offset = $(RIGHT_GAME_PANE_SELECTOR).offset().top + height;

		var l_xoff = mid_offset - width / 16;
		var l_yoff =  bot_offset - height / 4;

		var r_xoff = mid_offset + width / 16;
		var r_yoff = bot_offset - height / 4;

		$(rightArrow)
			.appendTo(document.body)
			.addClass('signal')
			.css('position','absolute')
			.offset({
				top: r_yoff,
				left: r_xoff
			})
			.hide();

		$(leftArrow)
			.appendTo(document.body)
			.addClass('signal')
			.css('position','absolute')
			.offset({
				top: l_yoff,
				left: l_xoff - $(rightArrow).innerWidth() 
			})
			.hide();

		$(window).resize(function(ev,er){
			var height = $(GAME_AREA_SELECTOR).innerHeight();
			var width = $(GAME_AREA_SELECTOR).outerWidth(true);
			var mid_offset = $(RIGHT_GAME_PANE_SELECTOR).offset().left;
			var bot_offset = $(RIGHT_GAME_PANE_SELECTOR).offset().top + height;

			var l_xoff = mid_offset - width / 12;
			var l_yoff =  bot_offset - height / 4;

			var r_xoff = mid_offset + width / 12
			var r_yoff = bot_offset - height / 4;
			$(rightArrow).offset({
				top: r_yoff,
				left: r_xoff
			});
			$(leftArrow).offset({
				top: l_yoff,
				left: l_xoff - $(rightArrow).innerWidth() 
			});
		});

		return [leftArrow, rightArrow];
	};

	this.flashControl = function(ar){
		$(ar).toggleClass('flash');
		setTimeout(function(){
			$(ar).toggleClass('flash');
		}, 300);
	};

	this.waitToBegin = function(a) {
		return;
	}

	this.animateHeartsPractice = function() {
		console.log('hearts animated description'); //debug
	};

	this.animateFlowersIntro = function() {
		console.log('flowers description'); //debug
	};

	this.animateFlowersPractice = function() {
		console.log('flowers animated description'); //debug
	};

	this.animateBothIntro = function() {
		console.log('both description'); //debug
	};

	this.animateBothPractice = function() {
		console.log('both animated description'); //debug
	}

	this.setDisplayCondition = function(data, override){
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
				controller.game.log({
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

	this.formatResults = function(results){
		return {
			'Hearts Only Round':{
				'Fraction Correct': results[3].summary.totalCorrect + '/' + results[3].summary.totalStimuli,
				'Avg. Correct Response Time': (results[3].summary.averageTime === NaN ? 'N/A' : results[3].summary.averageTime.toFixed(2) + ' milliseconds'),
				'Score': results[3].summary.score.toFixed(2)
			},
			'Flowers Only Round':{
				'Fraction Correct': results[4].summary.totalCorrect + '/' + results[4].summary.totalStimuli,
				'Avg. Correct Response Time': (results[4].summary.averageTime === NaN ? 'N/A' : results[4].summary.averageTime.toFixed(2) + ' milliseconds'),
				'Score': results[4].summary.score.toFixed(2)
			},
			'Final Round':{
				'Fraction Correct': results[5].summary.totalCorrect + '/' + results[5].summary.totalStimuli,
				'Avg. Correct Response Time': (results[5].summary.averageTime === NaN ? 'N/A' : results[5].summary.averageTime.toFixed(2) + ' milliseconds'),
				'Score': results[5].summary.score.toFixed(2)
			}
		}
	}

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
			results.push({
				summary: data.resultsSummary,
				raw: data.resultsRaw
			});
			if (phaseIndex < controller.opts.length - 1){
				phaseIndex++;
				controller.beginPhase();
			}
			else if (phaseIndex == controller.opts.length - 1){
				controller.dispatchEvent(EVENT_END_SEQUENCE, {
					resuts: results,
					options: opts,
					displayResults: controller.formatResults(results)
				});
			}
			else {
				console.log('ERROR phaseIndex = '+phaseIndex);
			}
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


