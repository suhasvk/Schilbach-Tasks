// HeartsAndFlowersController.js
// Suhas Vijaykumar, July 2016

function HeartsAndFlowersController(opts, session_id) {

	this.session_id = session_id;
	this.opts = opts;
	this.appearanceTimer = null;
	this.isLong = true;

	var controller = this;
	var results = [];
	var phaseIndex = 0;

	this.reset = function(){
		controller.game = null;
		controller.pid = null;
		controller.results = null;
		appearanceTimer = null;
		phaseIndex = 0;
		results = [];
		this.isLong = true;
	}

	this.isPractice = function(){
		return !Boolean(phaseIndex % 2);
	}

	this.isFinalRound = function(){
		return phaseIndex == 5;
	}

	this.flowerPath = function(){
		return controller.opts[0].stimuli.flower;
	}

	this.heartPath = function(){
		return controller.opts[0].stimuli.heart;
	}

	this.beginPhase = function(){
		controller.game = new HeartsAndFlowersTask(controller.pid,controller.opts[phaseIndex]);
		controller.initialize(controller.game, !controller.isPractice());
		switch(phaseIndex){
			case 0:
				setTimeout(function(){
					controller.heartsIntro(controller.game,true,!controller.isPractice());
				}, 500);
				break;
			case 2:
				setTimeout(function(){
					controller.flowersIntro(controller.game,true,!controller.isPractice());
				}, 500);
				break;
			case 4: 
				setTimeout(function(){
					controller.bothIntro(controller.game,true,!controller.isPractice());
				}, 500);
				break;
			case 1:
				setTimeout(function(){
					controller.heartsIntro(controller.game,true,!controller.isPractice());
				}, 500);
				break;
			case 3:
				setTimeout(function(){
					controller.flowersIntro(controller.game,true,!controller.isPractice());
				}, 500);
				break;
			case 5:
				setTimeout(function(){
					controller.bothIntro(controller.game,true,!controller.isPractice());
				}, 500);
				break;
		}
	};

	this.heartsIntro = function(game, isLong, isReal) {
		$(INSTRUCTIONS_TEXT_AREA_SELECTOR)
			.html((isReal ? '<p><strong>You are now being timed.</strong></p>' : '') + '<p> In this section, <strong>hearts</strong> will appear on the screen. </p> <p> When a heart appears, press on the <strong>same side</strong> as the heart. </p>');
			
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
			.html((isReal ? '<p><strong>You are now being timed.</strong></p>' : '')+'<p> In this section, <strong>flowers</strong> will appear on the screen. </p> <p> When a flower appears, press on the <strong>opposite side</strong> from the flower. </p>');
			
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
			.html((isReal ? '<p><strong>You are now being timed.</strong></p>' : '')+'<p> In this section, <strong>both hearts and flowers</strong> will appear on the screen. </p><p> When a heart appears, press on the <strong>same side</strong> as the heart. </p><p> When a flower appears, press on the <strong>opposite side</strong> from the flower. </p>');
			
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

				controller.appearanceTimer = setTimeout(function() {
					controller.beginNextCondition();	
				}, controller.isPractice() ? 100000 : controller.game.appearanceTime);
			}, data.wait);
		}
	};

	this.beginNextCondition = function(){
		$(ALL_STIMULI_SELECTOR).hide();
		controller.game.update();
	};

	this.formatResults = function(results){
		return {
			'Hearts Only Round':{
				'Fraction Correct': results[1].summary.totalCorrect + '/' + results[1].summary.totalStimuli,
				'Avg. Correct Response Time': (results[1].summary.averageTime === NaN ? 'N/A' : results[1].summary.averageTime.toFixed(2) + ' milliseconds'),
				'Score': results[1].summary.score.toFixed(2)
			},
			'Flowers Only Round':{
				'Fraction Correct': results[3].summary.totalCorrect + '/' + results[3].summary.totalStimuli,
				'Avg. Correct Response Time': (results[3].summary.averageTime === NaN ? 'N/A' : results[3].summary.averageTime.toFixed(2) + ' milliseconds'),
				'Score': results[3].summary.score.toFixed(2)
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
			"isCorrect": controller.game.isCorrect(input, controller.game.getCondition())
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
			if (!controller.isFinalRound()){
				phaseIndex++;
				controller.beginPhase();
			}
			else {
				controller.dispatchEvent(EVENT_END_SEQUENCE, {
					resuts: results,
					options: opts,
					displayResults: controller.formatResults(results)
				});
				controller.results = results;
			}
		});
	};

	this.saveResults = function(){
		var data = {
			session_id: controller.session_id,
			pid: controller.pid,
			task_id: HF_TASK_ID,
			resultData: {
				avg_time_1: controller.results[1].summary.averageTime,
				avg_time_2: controller.results[3].summary.averageTime,
				avg_time_3: controller.results[5].summary.averageTime,
				n_correct_1: controller.results[1].summary.totalCorrect,
				n_correct_2: controller.results[3].summary.totalCorrect,
				n_correct_3: controller.results[5].summary.totalCorrect,
				deviceInfo: navigator.userAgent,
				raw: JSON.stringify(controller.results)
			}
		};

		var form_data = new FormData();

		for (key in data) {
			form_data.append(key,data[key]);
		}

		$.ajax({
	    type: "POST",
		    url: "/save-results",
		    data: form_data,
		    processData: false,
		    contentType: false,
		    success: function(response) {
		    	if (!response.success) {
		    		// TODO CACHE RESULTS
		    	}
		    },
		    error: function(errResponse) {
		        console.log(errResponse);
		    }
		});
	};

	////////////////////////
	// Model manipulation
	// 

	// Inputs during game
	$(LEFT_GAME_PANE_SELECTOR).click(function(evt,err){
		controller.registerGameInput(INPUT_LEFT);
		if (controller.isPractice() && controller.game.isCorrect(INPUT_LEFT, controller.game.getCondition())){
			clearTimeout(controller.appearanceTimer);
			controller.beginNextCondition();
		};
	});

	$(RIGHT_GAME_PANE_SELECTOR).click(function(evt,err){
		controller.registerGameInput(INPUT_RIGHT);
		if (controller.isPractice() && controller.game.isCorrect(INPUT_RIGHT, controller.game.getCondition())){
			clearTimeout(controller.appearanceTimer);
			controller.beginNextCondition();
		};
	});

	$(window).keydown(function(evt,err){
		input = null;
		switch(evt.keyCode){
			case 37:
				input = INPUT_LEFT;
				break;
			case 39:
				input = INPUT_RIGHT;
				break;
		};
		if (input) {
			controller.registerGameInput(input);
			if (controller.isPractice() && controller.game.isCorrect(input, controller.game.getCondition())){
				clearTimeout(controller.appearanceTimer);
				controller.beginNextCondition();
			};
		};
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


