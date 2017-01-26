//NOTE: You should eventually have two practices, one that's long the other that is just a refresher
NBackTask = function(ID, opts){
  var numBack = opts["numBack"];
  /*needed for stimulusList*/
  var colors = opts.colors;
  var shapes = opts.shapes; // List of all possible colors
  var numStimuli = opts.numStimuli; //stores length of task/how many stimuli
  var reqStimuli = opts.reqStimuli; //required stimuli stored as array of stimuli objects
  var notSeparate = opts.colorShapeDependence; //do color and shape of stimuli go together?
  ///
  stimulusList = CreateStimuliList(colors, shapes, numStimuli, reqStimuli, notSeparate);
  hitList = HitList(stimulusList, numBack);
  var stimSeconds = opts.stimSeconds; //how long stimulus is on screen / appearance time
  var waitSeconds = opts.waitSeconds; //how long until next stimulus appears / ISI
  var task =this;
  this.isPressed = false; //not sure if this will work. does using "this" in this context work? or should it be var? or what?
  results = [];
  index = -1;
  this.inputHit = null;
  this.inputTime = null;
  this.stimTime = null;

  this.registerGameInput=function(thinksHit){
    if (task.isPressed){
      if(task.inputHit!=thinksHit){
        task.inputHit = thinksHit;
        task.inputTime = performance.now();
      }
    }else{
      task.isPressed = true;
      task.inputHit = thinksHit;
      task.inputTime = performance.now();
    }
  }

  this.createBlock = function (stimulus){
    task.dispatchEvent(EVENT_CREATE_STIM,stimulus);
    task.stimTime = performance.now();
  };

  this.removeBlock = function (){
    task.dispatchEvent(EVENT_DELETE_STIM);
  };

  //tells whether the input recieved aligns with what is correct
  this.isCorrect = function (index){
    return((task.inputHit==hitList[index])?true:false);
  }

  this.beginRound = function(){
    index+=1;
    stimulus = stimulusList[index];
    task.resetInput();
    task.createBlock (stimulus);
    setTimeout (function(){
      task.endRound();
    }, stimSeconds); //should be able to wait and still handle input
  }

  this.endRound = function (){
    task.removeBlock();
    task.recordRound(index)
    task.resetInput();
    if (index >=(numStimuli-1)){
      task.endGame();
    }else{
      setTimeout(function(){
        task.beginRound();
      }, waitSeconds);
    };
  }

  this.recordRound = function (index){ //Might have to change this based on outputs wanted
    results.push({
      "Round":index+1,
      "Stimulus": stimulusList[index],
      "Pressed": task.isPressed,
      "ThinksHit": task.inputHit,
      "Hit": hitList[index], //because hitList is 1's and 0's
      "ResponseTime": task.responseTime(),
      "Correct": task.isCorrect(index)
    });
  }

  this.endGame = function (){
    task.dispatchEvent(EVENT_TASK_END, results);
  }

  this.resetInput = function(){
    task.inputHit=null;
    task.isPressed =false;
    task.stimTime = null;
    task.inputTime = null;
  }

  this.responseTime = function(){
    if (task.stimTime == null){
      console.log("Invalid stimTime. Something is very wrong");
    }
    if (task.inputTime == null){
      return null;
    }
    time = task.inputTime-task.stimTime; //IN MILLISECONDS (spelled with one or two ll's?)
    return time;
  }

  this.tallyResults = function(pResults){
    var noResponse = 0;
    var numWrong = 0;
    var numCorrectYes =0;
    var numCorrectNo =0;
    var numWrongYes =0;
    var numWrongNo = 0;
    var numCorrect =0;
    var totalResponseTime =0;
    var totalCorrectResponseTime = 0;
    var totalWrongResponseTime = 0;

    //tallies up data from the rounds
    for (i = 0;i<pResults.length; i++){
      var round = pResults[i];
      (round.ResponseTime?totalResponseTime += round.ResponseTime:null); //should execute only if responsetime is a number(not null)
      if (round.Correct){
        totalCorrectResponseTime += round.ResponseTime;
        if (round.ThinksHit == true){
          numCorrectYes++;
        }else{
          numCorrectNo++;
        }
      }else{
        if (round.Pressed){
          totalWrongResponseTime += round.ResponseTime;
          if (round.ThinksHit ==true){
            numWrongYes++;
          }else{
            numWrongNo ++;
          }
        }else{
          noResponse++;
        }
      }
    }

    numCorrect = numCorrectYes + numCorrectNo;
    numWrong = numWrongNo + numWrongYes;
    totalResponses = pResults.length - noResponse;
    avgResponseTime = totalResponseTime/totalResponses;
    correctAvgResponseTime = (numCorrect!=0?totalCorrectResponseTime/numCorrect:null);
    wrongAvgResponseTime = (numWrong!=0?totalWrongResponseTime/numWrong:null);
    numStimuli = noResponse + numWrong + numCorrect;

    return {
      numStimuli:numStimuli,
      numCorrectNo:numCorrectNo,
      numWrong:numWrong,
      numCorrectYes:numCorrectYes,
      numWrongYes:numWrongYes, //means "I thought yes but it was no"
      numCorrect:numCorrect,
      numWrongNo:numWrongNo,
      noResponse:noResponse,
      avgResponseTime: avgResponseTime,
      avgCorrectTime:correctAvgResponseTime,
      avgWrongTime:wrongAvgResponseTime
    }
  }

  this.resultsSummary = function(){
    return task.tallyResults(results);
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
  this.addEventListener(EVENT_CREATE_STIM,function(){});
  this.addEventListener(EVENT_TASK_END,function(){});
    this.addEventListener(EVENT_DELETE_STIM,function(){});
}
