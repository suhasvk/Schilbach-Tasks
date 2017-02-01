//wrote 'color shape decision' where I need to know whether we care about same colors, same shapes, or both
var NBackController = function (opts, session_id){
  this.session_id = session_id;
  this.opts = opts;
  var numBack =0;

  var controller = this;
  this.results = [];
  var phase =-1;

  this.reset = function (){
    controller.game = null;
    controller.pid = null;
    controller.results = null;
    phase =-1;
  }

  this.newGame = function (){ //starts a new Game (i.e: practice, real version, resetting game, etc.)
    phase++;
    controller.game = new NBackTask(controller.pid, controller.opts[phase]);
    numBack = controller.opts[phase].numBack;
    controller.initialize(controller.game);
    controller.introPartOne(controller.game, true);
  }

  this.initialize = function(game){
    var isPractice  = (phase==0?true:false)
    game.addEventListener(EVENT_CREATE_STIM, function(stimulus){
      controller.createBlock(stimulus, STIMULI_AREA_SELECTOR)
    });
    game.addEventListener(EVENT_DELETE_STIM, function(){
      controller.deleteBlock(isPractice);
    });
    game.addEventListener(EVENT_TASK_END, function(){
      controller.addResults(game.resultsSummary());
      controller.endGame();
    });
  }

  this.createBlock = function(stimulus, location){
    var color = stimulus["color"];
    var shape = stimulus["shape"];
    var left = controller.getSpacing(location);
    //currently have shapes with different colors hardcoded;
    switch(shape){ //for hard coded shapes
      case 'square':
      var stim = $(document.createElement('img'))
          .addClass('square')
          .css('background-color', color)
          .addClass('stimulus')
          .css('left', left)

      break;
      case 'triangle':
      var stim = $(document.createElement('img'))
          .addClass('triangle')
          .css('color', color)
          .addClass('stimulus')
          .css('left', left)

      break;
      case 'circle':
      var stim =$(document.createElement('img'))
          .addClass('circle')
          .css('color', color)
          .css('background-color', color)
          .addClass('stimulus')
          .css('left', left)
      break;
      default:
      console.log('problem '+shape + ' '+color);
      var stim =$(document.createElement('img'))
          .attr('src', shape)
          .addClass('stimulus')
          .css('left', left)
      break;
    }
    $(location).append(stim);
  }

  this.deleteBlock = function(isPractice){
    if (isPractice){
      var count = $(ALL_STIMULI_SELECTOR).length;
      var i = (count==numBack+1)?-1:0
      $(ALL_STIMULI_SELECTOR).each(function(index, elem){
        $(elem).css('opacity','.5');
        $(elem).css('left', 20*(index+i));
        $(elem).css('top', '0');
        $(elem).css('position', 'relative');
        //sets position to be inline with other stimuli but over to the side
        if ((index == 0)&&(count==numBack+1)){ //remove if block shouldn't be thought about any more
          $(elem).remove()
        }
      });
    }else{
        $(ALL_STIMULI_SELECTOR).each(function(index,elem){
          $(elem).remove(); //gets rid of block currently on screen
        });
      }
    }

//////Start of Tutorial Code///////
  this.introPartOne = function (game, isLong){
    $(STIMULI_AREA_SELECTOR).addClass('hidden');
    var isPractice = (phase==0?true:false);
    controller.deleteBlock(false);

    var text1 = 'In this task, shapes with diffferent colors will appear on the screen.';
    var text2 = 'If the block on screen is the same as the block that appeared ' + numBack +' before it, press the enter button.';
    var text3 = 'Otherwise, if the block on the screen does not match the block ' + numBack +' before it, press the space bar.';
    var text4 = 'You are scored on the number of correct responses. No response does not add anything to your score.';

    if (isPractice && isLong){
      //should explain everything from the beginning
      $(INSTRUCTIONS_TEXT_AREA_SELECTOR)
      .addClass('blue-fill')
      .html('<p>'+text1+'</p>')

      $(ALL_INSTRUCTIONS_SELECTOR)
      .toggleClass('show')

      setTimeout(function(){controller.showExampleStimuli();}, 2000);

      setTimeout(function(){
        controller.deleteBlock(false);
        $(INSTRUCTIONS_TEXT_AREA_SELECTOR)
        .html('<p>'+text2+'</p>');
        var redCircle = {color:'red', shape:'circle'};
        var blueSquare = {color:'blue', shape:'square'};
        var greenCircle = {color:'green', shape:'circle'};
          //depending on numBack, create a list with a hit
          switch(numBack){
            case 1:
            var stimList = [blueSquare, redCircle, redCircle];
            break;
            case 2:
            var stimList = [greenCircle, blueSquare, redCircle, blueSquare];
            break;
            case 3:
            var stimList = [redCircle, blueSquare, greenCircle, redCircle];
            break;
          }
        controller.exampleHit(stimList, true);
      },10000);

      setTimeout(function(){ //lets the user
        $(INSTRUCTIONS_TEXT_AREA_SELECTOR)
        .html('<p>'+text2+' Press enter to continue.</p>');
        var enterHandler = function(event){
          if (event.keyCode==45||event.keyCode==13){
            setTimeout(controller.introPartTwo(game),500);
            $(window).off('keydown', enterHandler)
          }
        }
        $(window).on('keydown', enterHandler);

      }, 24000)



    }else{ //not practice or not long (i.e. they know what's going on)
      var waitTime = 1500;
      $(ALL_INSTRUCTIONS_SELECTOR)
      .toggleClass('show')
      $(INSTRUCTIONS_TEXT_AREA_SELECTOR).html('<p>You will now be scored on your responses.</p>')
      controller.createStartButton(waitTime, isPractice, game)
    }
  }

  this.introPartTwo = function(game){
    var text3 = 'Otherwise, if the block on the screen does not match the block ' + numBack +' before it, press the space bar.';
    $(INSTRUCTIONS_TEXT_AREA_SELECTOR)
    .html('<p>' + text3 + '</p>');
    controller.deleteBlock(false);
    $('.check').empty().remove();

    var redCircle = {color:'red', shape:'circle'};
    var blueSquare = {color:'blue', shape:'square'};
    var greenCircle = {color:'green', shape:'circle'};
      //depending on numBack, create a list with a hit
      switch(numBack){
        case 1:
        var stimList = [blueSquare, redCircle];
        break;
        case 2:
        var stimList = [greenCircle, blueSquare, redCircle];
        break;
        case 3:
        var stimList = [redCircle, blueSquare, greenCircle, blueSquare];
        break;
      }
      controller.exampleHit(stimList, false)

      setTimeout(function(){ //lets the user
        $(INSTRUCTIONS_TEXT_AREA_SELECTOR)
        .html('<p>'+text3+' Press space to continue.</p>');
        var enterHandler = function(event){
          if (event.keyCode==32){
            setTimeout(controller.introPartThree(game),1000);
            $(window).off('keydown', enterHandler)
          }
        }
        $(window).on('keydown', enterHandler);
      }, 12000);
  }

  controller.introPartThree = function(game){
    var text4 = 'During practice, blocks will fade and move to the left, allowing you to see them.'
    var text5 = 'However, during the real game there will only be one block on the screen at a time.'
    var text6 = 'You are scored on the number of correct responses. No response does not add anything to your score.';

    $(INSTRUCTIONS_TEXT_AREA_SELECTOR)
    .html('<p>'+text4+'</p>');
    setTimeout(function(){
      controller.deleteBlock(false);
      $('.check').empty().remove();
      $(INSTRUCTIONS_TEXT_AREA_SELECTOR)
      .html('<p>'+text5)
      setTimeout(controller.showExampleStimuli(), 2000)
    },3000)

    setTimeout(function(){
      controller.deleteBlock(false);
      $(INSTRUCTIONS_TEXT_AREA_SELECTOR)
      .html('<p>'+text6+'</p>');
    }, 13000)
    controller.createStartButton(16000, true, game);
  }

  //flashes stimuli on screen. takes
  this.showExampleStimuli = function (){
    var redCircle = {color:'red', shape:'circle'};
    var blueSquare = {color:'blue', shape:'square'};
    var greenCircle = {color:'green', shape:'circle'};
    var redSquare = {color:'red',shape:'square'};

    var stimList = [redCircle, blueSquare, greenCircle, redSquare];
    for (i = 0; i<stimList.length; i++){
      color = stimList[i]["color"];
      shape = stimList[i]["shape"];
      controller.createBlock({
        color:color,
        shape:shape
      }, INSTRUCTIONS_IMAGE_AREA_SELECTOR);
    }
    $(ALL_STIMULI_SELECTOR)
    .css('left', 325)
    .hide()
    .each(function(index, elem){
      setTimeout(function(){ //puts all shapes out there with breaks in between.
        setTimeout(function(){
          $(elem).show();
        }, 1000*index);
        setTimeout(function(){
          $(elem).hide();
        }, 1000*(index+1));
      }, 1000*index);
    });
  }

  this.exampleHit = function(stimList, isHit){
    //color shape decision - sort of. earlier in the stimlists that are the inputs
    for (var i in stimList){
      controller.exampleCreate(stimList, i);
      if (i<stimList.length-1){
        controller.exampleDelete(i);
      }
    }
    controller.createCheck(isHit, 4000*(stimList.length-1) + 2000);
  }

  this.createStartButton = function(time, isPractice, game){
    setTimeout(function(){
      $(INSTRUCTIONS_TEXT_AREA_SELECTOR).append(
        $(document.createElement('button'))
          .addClass('btn')
          .addClass('btn-danger')
          .addClass('btn-lg')
          .addClass('btn-block')
          .text('Click here to '+(isPractice?'practice':'begin')+'.')
          .click(function(ev,er){
            $(ALL_INSTRUCTIONS_SELECTOR)
              .toggleClass('show')
              .empty();
            $(STIMULI_AREA_SELECTOR).removeClass('hidden');
            setTimeout(function(){
            controller.game.beginRound();
          }, (controller.opts[phase].initialWaitTime));
          })
      );
    }, time);
  }

  ////did this to get over the werid async nature of settimeout
  this.exampleCreate = function(stimList, i){
    setTimeout(function(){
      controller.createBlock(stimList[i], INSTRUCTIONS_IMAGE_AREA_SELECTOR);
    }, 4000*i);
  }
  this.exampleDelete = function(i){
    setTimeout(function(){
      controller.deleteBlock(true);
    }, 4000*i+2000);
  }
  ////

  this.tutorialSpacing = function(){
    var length = $(ALL_STIMULI_SELECTOR).length-1
    var block1 = $(ALL_STIMULI_SELECTOR).get(0);
    var block2 = $(ALL_STIMULI_SELECTOR).get(length);
    var pos1 = $(block1).position().left;
    var pos2 = $(block2).position().left;
    return (pos2-pos1);
  }

  this.getSpacing = function(location){
    var length = $(ALL_STIMULI_SELECTOR).length
    var width = $(location).width();
    return (width/2 - 100*(length)-50);
  }

  this.createCheck = function (isHit, waitTime){
    setTimeout(function(){
      /////// Creating arrow to show that it is a hit
      var arrow = document.createElement('div');
      var pointer = document.createElement('div');
      var lead = document.createElement('div');
      var base = document.createElement('div');
      var arm = document.createElement('div');
      $(arrow).addClass('check');
      //makes them all green
      $(base).addClass('rectangle-check');
      $(pointer).addClass('arrow-up');
      $(lead).addClass('rectangle-check');
      $(arm).addClass('rectangle-check');
      //constants. Set width and heighth of check
      var width = 10;
      var totalOffsetBlock = $(ALL_STIMULI_SELECTOR).get(0);
      var totalOffset = $(totalOffsetBlock).position().left + width;
      var borderBottom = 20;
      var leftOffset = borderBottom/2+width/2;
      //pointer setup
      $(pointer).css('border-left', width + ' solid transparent').css('border-right', width + ' solid transparent');
      $(pointer).css('borderBottom', borderBottom + ' solid green');
      //lead setup (thing just before pointer)
      var leadHeight = 30;
      $(lead).css('margin', '0 '+leftOffset).width(width).height(leadHeight);
      //base setup (bottom)
      var baseWidth = controller.tutorialSpacing()+width;
      $(base).css('margin', '0 '+leftOffset).width(baseWidth).height(width);
      //arm setup (from current block)
      var armHeightMargin = -($(lead).height() + borderBottom + $(base).height());
      var armHeight = $(lead).height() + borderBottom;
      var armWidthMargin = $(base).width()+width/2;
      $(arm).height(armHeight)
      $(arm).width(width)
      $(arm).css('margin', armHeightMargin + ' ' + armWidthMargin)
      //
      $(arrow).append(pointer).append(lead).append(base).append(arm).css('margin', '0 '+totalOffset);
      /////////

      if(!isHit){
        var X = document.createElement('div');
        var XMarginLeft = baseWidth/2 + leftOffset;

        $(X).html('X'.bold()).css('color', 'red').css('font-size', 40)
        var XMarginTop = leadHeight+width/2+borderBottom-$(X).height()-26.67/2-width/2;
        $(X).css('margin', XMarginTop +' '+XMarginLeft)
        $(arrow).append(X);
      }

      $(INSTRUCTIONS_IMAGE_AREA_SELECTOR)
      .append(arrow)
    }, waitTime);
  }
  //////End of Tutorial Code///////

  this.end = function (){
    controller.dispatchEvent(EVENT_END_SEQUENCE, {
      results: controller.results,
      options: opts,
      displayResults: controller.formatResults(controller.results)
    });
  }

  this.formatResults = function(results){
    return {
      'Fraction Correct':results.numCorrect + '/'+ results.numStimuli,
      'Average Correct Response Time':(results.avgCorrectTime === NaN ? 'N/A' : results.avgCorrectTime + ' milliseconds'),
      'Score':controller.score(results.numCorrect)
    }
  }

//may depend on timing
  this.score = function(numCorrect){
    return controller.opts[0].payment * numCorrect;
  }

  this.saveResults = function(){
		var data = {
			session_id: controller.session_id,
			pid: controller.pid,
			task_id: NBACK_TASK_ID,
			numCorrect: controller.results.numCorrect,
			averageCorrectTime: controller.results.avgCorrectTime,
      numMissed:controller.results.numWrong,
      noResponse:controller.results.noResponse,
			deviceInfo: navigator.userAgent,
			raw: JSON.stringify(controller.results)
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
	}

  this.endGame = function(){
    if (phase==opts.length-1){
      this.end();
    }else{
      this.newGame()
    }
  }

  this.addResults = function(data){
    if (phase==1){
      controller.results=data;
    }
  }

  $(window).keydown(function(evt, err){
    if(controller.game){
      if (evt.keyCode==45||evt.keyCode==13){ //currently enter and return (because I don't know this difference and the both seem reasonable)
        controller.game.registerGameInput(true);
      }else if (evt.keyCode == 32) { //currently spacebar
        controller.game.registerGameInput(false);
      }
    }
  })


/*EVENT HANDLERS*/

  this.allHandlers = new Array();

	/*
	 * Dispatch a new event to all the event listeners of a given event type
	 */
	this.dispatchEvent = function(type, details){
		var newEvent = details;

		if (this.allHandlers[type]){
			for (var i in this.allHandlers[type]){
				controller.allHandlers[type][i](newEvent); //was this, changed to controller
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
