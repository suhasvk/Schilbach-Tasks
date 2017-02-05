

NBACK_TASK_ID = 3;

//JQuery Selectors
ALL_STIMULI_SELECTOR = '.stimulus';
GAME_AREA_SELECTOR = '#gameArea';
GAME_START_BUTTON_SELECTOR = "#gameStartButton";
BEGIN_TASK_MODAL_SELECTOR = "#beginTaskModal";
END_TASK_MODAL_SELECTOR = "#endTaskModal";
PID_INPUT_GROUP_SELECTOR = "#pidGroup";
PID_INPUT_SELECTOR = "#pidInput";
INSTRUCTIONS_BG_SELECTOR = "#instructions-bg";
INSTRUCTIONS_TEXT_AREA_SELECTOR = "#instructions-txt";
INSTRUCTIONS_IMAGE_AREA_SELECTOR = "#instructions-img";
ALL_INSTRUCTIONS_SELECTOR = ".instructions";
PID_CONFIRMATION_GROUP_SELECTOR = "#pidConfirmationGroup";
PID_CONFIRMATION_INPUT_SELECTOR = "#pidConfirmationInput";
SUBMIT_RESULTS_BUTTON_SELECTOR = "#submitResultsButton";
PID_CONFIRMATION_OVERRIDE_CHECKBOX_SELECTOR = "#pidConfirmOverride";
STIMULI_AREA_SELECTOR = '#stimuliArea';
RESULTS_AREA_SELECTOR = '#resultsArea'

//Event names
EVENT_TASK_START = 'start';
EVENT_TASK_END = 'end';
EVENT_TASK_INPUT = 'input';
EVENT_BEGIN_SEQUENCE = 'beginSequence';
EVENT_END_SEQUENCE = 'endSequence';
EVENT_CREATE_STIM = 'createStim';
EVENT_DELETE_STIM = 'deleteStim';


//required stim (reqstim) has to be an array of objects with color and shape keys
CreateStimuliList = function (colors, shapes, numStim, reqStim, colorShapeDependence){
  var conditionList = [];
  if (reqStim.length==1&&reqStim[0]['shape']=='null'){
    reqStim = [];
  }
  if (colorShapeDependence) {
    var numList = RandomPositionList(numStim, colors/*needs to change*/, reqStim.length); //might have to do this seprately
    var colorList = PopulateStimuli(colors, numList);
    var shapeList = PopulateStimuli(shapes, numList);//same numList to ensure color and shape pairs stay together
  }else{
    var numList1 = RandomPositionList(numStim, colors, reqStim.length);
    var numList2 = RandomPositionList(numStim, shapes, reqStim.length);
    var colorList = PopulateStimuli(colors, numList1);
    var shapeList = PopulateStimuli(shapes, numList2);//different numLists to ensure random assortment of shapes and colors among stimuli
  }
  conditionList = ColorShapeObject(colorList, shapeList, reqStim);//ensures reqStim is also put randomly into the mix and makes color and shape pairs
  return conditionList;
}

//Creates a random list of numbers based on possible attributes, leaves room for required stimuli
var RandomPositionList = function (numStim, attrList, reqStimLength){
  numList = [];
  for (var i = 0; i<numStim-reqStimLength+1; i++){
    numList.push(Math.floor(attrList.length*Math.random()))
  }
  return numList;
}

//Using a list of probably random numbers, this puts stimuli characteristics in a list
var PopulateStimuli = function (attrList, numList){
  randomList =[];
  for (var i =0; i<numList.length; i++){
    randomList.push(attrList[numList[i]]);
  }
  return randomList;
}

//pairs colors and shapes into objects and adds required stimuli list into random spot
var ColorShapeObject = function(colorList, shapeList, reqStim){
  if (colorList.length!=shapeList.length){
    console.log("ColorList and ShapeList were not the same length!!!");
    return null;
  }
  rand = Math.floor((colorList.length)*Math.random())
  returnList = []
  reqIn = false;
  for (i=0; i<colorList.length; i++){
    if (i == rand){
      for (j=0; j<reqStim.length; j++){
        returnList.push(reqStim[j]);
      }
    }else{
      var obj = {
      'color': colorList[i],
      'shape': shapeList[i],
      }
      returnList.push(obj);
    }
  }
  return returnList;
}

//gives list of times when block is n-back from same block
HitList = function (colorList, numBack){
  var hit_list = [];
  for (var j =0; j<colorList.length; j++){
    hit_list.push(false);
  }
  //finds when colors are numBack apart
  for (var i=0; i<(colorList.length-numBack); i++){
    if (colorList[i].color==colorList[i+numBack].color){
      hit_list [i+numBack]=true;
    }
  }
  return hit_list;
}

RandomNoHitList = function (colorList, shapeList, numBack, colorShapeDependence){
  var good = false;
  var length=numBack+2;
  var stimList= [];
  while (!good){
    good =true;
    stimList = CreateStimuliList(colorList, shapeList, length, [], colorShapeDependence);
    if (stimList[1]['color']==stimList[1+numBack]['color']){
      good = false;
    }
  }
  return stimList;
}
