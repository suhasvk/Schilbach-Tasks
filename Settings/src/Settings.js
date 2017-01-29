// Settings.js
// Suhas Vijaykumar, September 2016

// Constants
SETTINGS_MODAL_SELECTOR = "#settingsModal";
SUBMIT_STIMULUS_BUTTON_SELECTOR = "#submitStimulusButton";
TASK_INPUT_SELECTOR = "#taskInput";

VARIABLE_REGION_CLASS_SELECTOR = ".variable";
STIMULUS_CLASS_SELECTOR = ".stimulus"

STIMULUS_FILE_INPUT_BUTTON_SELECTOR = "#fileInput";
STIMULUS_FILE_SUBMIT_BUTTON_SELECTOR = "#createStimulus";
STIMULUS_NAME_ELEM_SELECTOR = "#stimulusName";
STIMULUS_FILENAME_ELEM_SELECTOR = "#fileName";

MECHANICS_TAB_SELECTOR = "#tab-mechanics";
PRACTICE_TAB_SELECTOR = "#tab-practice";
STIMULI_TAB_SELECTOR = "#stimuli-variable-region";

SUBMIT_SETTINGS_BUTTON_SELECTOR = "#chooseSettingsButton";


var task = null;
var populateSettings = function(spec){
	var mechanics_opts = spec["mechanics"];
	var mechanics_fieldset = document.createElement("fieldset");
	populateSettingsHelper("mechanics",mechanics_opts, mechanics_fieldset, MECHANICS_TAB_SELECTOR)

	var practice_opts = spec["practice"];
	var practice_fieldset = document.createElement("fieldset");
	populateSettingsHelper("practice",practice_opts, practice_fieldset, PRACTICE_TAB_SELECTOR)

	if (spec == N_BACK_SETTINGS_META){
		NBackCheckboxSetup();
	}

	var stimuli_opts = spec["stimuli"];
	var stimuli_fieldset = document.createElement("fieldset");
	populateSettingsHelper("practice",stimuli_opts, stimuli_fieldset, STIMULI_TAB_SELECTOR)

	if (spec == N_BACK_SETTINGS_META){
		NBackSetup();
	}

	loadStimuli();

}

var populateSettingsHelper = function(category, opts, fieldset, pane_selector){
	$.each(opts, function(i,v){

		var form_group = document.createElement("div");
		$(form_group).addClass("form-group");

		var label = document.createElement("label");
		$(label)
			.attr("for", 'settings'+i)
			.text(v["display"])
			.appendTo(form_group);

		switch (v["type"]){
			case "stimulus":
				var s = document.createElement("select");
				$(s)
					.addClass('form-control')
					.addClass('stimulus')
					.attr("column", v["column"])
					.attr("id", 'settings'+i)
					.appendTo(form_group);
			break;
			case "stimulus list":
				var d1 = document.createElement('div');
				var d2 = document.createElement('div');
				$(d1)
					.addClass('nbackSelectorGroup')
					.addClass('form-horizontal')
					.attr("column", v["column"])
					.appendTo(form_group);
				switch(v['input']){
					case 'color':
					$(d1).addClass('colorParent')
					break;
					case 'shape':
					$(d1).addClass('stimulusParent')
					break;
				}
				$(d2)
					.addClass('nbackButtonGroup')
					.appendTo(form_group);
				var button = document.createElement("label");
				$(button)
				 	.attr("class", 'nbackSelectorAddButton')
					.attr('type', 'button')
          .addClass('btn btn-default')
					.text('Add ' + v["display"])
					.appendTo(d2);
				var double = (v["req"]?true:colorShapeDependence);
				var div = NBackNewDiv(double, d1);
				$(div).children('.deleteSelect').remove();
				if (v["req"]){
					$(div).addClass('double');
				}
				$(div).appendTo(d1);
			break;
			default:
				var input = document.createElement(v["type"])
				if (v["type"] == "select"){
					$.each(resp.tasks, function(i,val){
						var opt = document.createElement("option");
						opt.text = val.name;
						opt.value = val.id;
						$(input).append(opt);
					});
				}
				$(input)
					.addClass("form-control")
					.attr("column", v["column"])
					.attr("id", 'settings'+i)
					.appendTo(form_group);
			break;
		}
		$(fieldset).append(form_group);
	});
	$(fieldset).addClass('variable');
	$(pane_selector).append(fieldset);
}

var loadStimuli = function(){
	$.get('/stimuli-list', function(resp){
		$(STIMULUS_CLASS_SELECTOR).empty();
		$.each(resp.tasks, function(i,val){
			var opt = document.createElement("option");
			opt.text = val.NAME;
			opt.value = val.ID;
			$(opt)
				.attr("path",val.PATH)
				.appendTo(STIMULUS_CLASS_SELECTOR);
		});
	});
	if (task=='NBack'){
		$('.shapes').each(function(i,v){
			if ($(this).children().length<1){
				var shapeList =['None','Circle', 'Square', 'Triangle'];
				for (var i in shapeList){
					var opt = document.createElement("option");
					opt.text = shapeList[i];
					if (shapeList[i]!='None'){
						opt.value = shapeList[i].toLowerCase();
					}else{
						opt.value=null;
					}
					$(this).append(opt);
				}
			}
		});
		var colorList = ['None','Red', 'Blue', 'Green', 'Yellow', 'Black', 'Brown', 'Purple', 'Orange'];
		$('.colors').each(function(i,v){
			if ($(this).children().length<1){
				for (var i in colorList) {
					var opt = document.createElement("option");
					opt.text = colorList[i];
					if (colorList[i]!='None'){
						opt.value = colorList[i].toLowerCase();
					}else{
						opt.value=null;
					}
					$(this).append(opt);
				}
			}
		});
	}
}

var submit = function(){
	var data = new FormData();
	$('input, select').each(function(i,v){
		if ($(this).attr('column')){
			var column = $(this).attr('column');
			var val = $(this).val();
			data.append(column,val);
		}
	});

	//formats the NBack specific settings for the db
	if (task=='NBack'){
		data.append('COLOR_SHAPE_DEPENDENT', Number(colorShapeDependence));
		$('div').each(function(i,v){
			if ($(this).attr('column')){
				switch($(this).attr('column')){
					//puts stimuli and practice stimuli into colors and shapes categories
					//to reduce databse size and to make it easier to draw data from,
					//but only if colorShapeDependence is checked
					case 'STIMULI':
					var colors = [];
					var shapes = [];
					$(this).children('.selector').each(function(i,v){
						var color =$(this).children('.colors.nbackStimulus').val();
						var shape =$(this).children('.stimulus.nbackStimulus').val();
						colors.push(color);
						shapes.push(shape);
					});
					var stringColors = JSON.stringify(colors);
					var stringShapes = JSON.stringify(shapes);
					data.append('COLORS', stringColors);
					data.append('SHAPES', stringShapes);
					break;
					//
					case 'PRACTICE_STIMULI':
					var colors = [];
					var shapes = [];
					$(this).children('.selector').each(function(i,v){
						var color =$(this).children('.colors.nbackStimulus').val();
						var shape =$(this).children('.stimulus.nbackStimulus').val();
						colors.push(color);
						shapes.push(shape);
					});
					var stringColors = JSON.stringify(colors);
					var stringShapes = JSON.stringify(shapes);
					data.append('PRACTICE_COLORS', stringColors);
					data.append('PRACTICE_SHAPES', stringShapes);
					break;
					//does normal formatting for NBack settings for db
					default:
					var column = $(this).attr('column')
					var val =[];
					$(this).children('.selector').each(function(i,v){
						var stim;
						if ($(this).children('.nbackStimulus').length>1){
							var color =$(this).children('.colors.nbackStimulus').val();
							var shape =$(this).children('.shapes.nbackStimulus').val();
							stim = {color:color,shape:shape};
						}else{
							stim = $(this).children('.nbackStimulus').val();
						}
						val.push(stim);
					});
					var stringVal = JSON.stringify(val);
					data.append(column,stringVal);
					break;
				}
			}
		});
	}
	console.log(data.get('TASK_ID'));

	$.ajax({
	    type: "POST",
	    url: "/create-setting",
	    data: data,
	    processData: false,
	    contentType: false,
	    success: function(response) {
	    	console.log(response);
	    	window.location.reload(true);
	    },
	    error: function(errResponse) {
	        console.log(errResponse);
	    }
	});
}

// var isInvalid = function(elem) {
// 	if ($(elem).attr("column")){
// 		return $(elem).val() === "";
// 	} else {
// 		return false;
// 	}
// }

///////////NBACK Specfic functions/////////////
var NBackSetup = function(){
	$('.nbackSelectorAddButton').click(function(ev, er){
		var parentDiv = $(this).parent().parent().children(".nbackSelectorGroup");
		var bool = ($(parentDiv).has('.double').length!=0)?true:colorShapeDependence;
		var div = NBackNewDiv(bool, parentDiv);
		$(parentDiv).append(div);
		loadStimuli();
	});
}

var NBackCheckboxSetup = function (){
	var isDependentBox = document.createElement('input');
	$(isDependentBox)
		.attr('type', 'checkbox')
		.attr('checked', colorShapeDependence)
		.css('position', 'relative')
		.css('margin-left', '10px')
		.change(function(){
			colorShapeDependence = this.checked;
			$(STIMULI_TAB_SELECTOR).empty();
			NBackCheckboxSetup();
			var stimuli_opts = (colorShapeDependence?N_BACK_SETTINGS_META['colorShapeDependentStimuli']:N_BACK_SETTINGS_META["stimuli"]);
			var stimuli_fieldset = document.createElement("fieldset");
			populateSettingsHelper("practice",stimuli_opts, stimuli_fieldset, STIMULI_TAB_SELECTOR);
			NBackSetup();
			loadStimuli();
		});
	var boxLabel = document.createElement('label');
	$(boxLabel)
		.text('Check if color and shape go together')
		.append(isDependentBox)
		.css('padding-left', 0)
		.css('font-weight', 700)
	var boxDiv = document.createElement('div');
	$(boxDiv)
		.addClass('checkbox')
		.append(boxLabel)
	$(STIMULI_TAB_SELECTOR)
		.append(boxDiv);
}

var NBackAddSelect = function(div, isDependent, selectClass){
	var select = document.createElement('select');
	$(select)
		.addClass(selectClass)
		.addClass('nbackStimulus')
		.addClass('form-control');

	if (isDependent){
		$(select)
			.css('width', '50%')
			.css('display', 'inline-block')
	}
	$(div).append(select);
}

var NBackNewDiv = function(isDependent, parent){
		var cancel = document.createElement('button');
		$(cancel)
			.css('left', 0)
			.css('position', 'absolute')
			.css('border', 'none')
			.css('padding', '6px 8px')
			.css('margin-left', '4px')
			.css('color', 'red')
			.addClass('btn btn-default')
			.text('X')
			.addClass('deleteSelect')
			.click(function(ev, er){
				$(this).parent().remove();
			});
		var isColor = $(parent).hasClass('colorParent');
		var selectClass = isColor?'colors':'shapes';
		var div = document.createElement('div');
		$(div)
			.addClass('selector')
			.append(cancel);
		NBackAddSelect(div, isDependent, selectClass);
		if(isDependent){
			NBackAddSelect(div, isDependent, 'colors');//the second of the double inputs
		}
		return div;
}
////////////////

var tasklist = ['Hearts and Flowers', 'Corsi', 'NBack'];

$(document).ready(function(){
	$(SETTINGS_MODAL_SELECTOR).modal('show');

	// Placeholder option--necessary because settings selection is only triggered by change
	$(TASK_INPUT_SELECTOR).append(document.createElement("option"));

	for (var i in tasklist){
		var opt = document.createElement("option");
		opt.value= Number(i)+1;
		opt.text = tasklist[i];
		$(TASK_INPUT_SELECTOR).append(opt);
	}


	$(STIMULUS_FILE_INPUT_BUTTON_SELECTOR).change(function(){
		$("form[action='/new-stimulus']")
			.removeClass('has-success')
			.removeClass('has-danger');
		if (($(STIMULUS_FILE_INPUT_BUTTON_SELECTOR).val()).length > 0) {
			$(STIMULUS_FILENAME_ELEM_SELECTOR)
				.text($(STIMULUS_FILE_INPUT_BUTTON_SELECTOR)[0].files[0].name);
			$(STIMULUS_FILE_SUBMIT_BUTTON_SELECTOR)
				.removeClass('disabled');
		} else {
			$(STIMULUS_FILENAME_ELEM_SELECTOR).text('No file selected.');
		}
	});

	$(TASK_INPUT_SELECTOR).change(function(ev,er){
		var task_id = Number($(this).val());
		task = tasklist[task_id-1];
		$(VARIABLE_REGION_CLASS_SELECTOR).empty()
		switch(task_id){
			case 1:
				populateSettings(HEARTS_AND_FLOWERS_SETTINGS_META);
        		break;
			case 2:
				break;
			case 3:
				colorShapeDependence = false;
				populateSettings(N_BACK_SETTINGS_META);
				break;
		}
	});

	$(SUBMIT_SETTINGS_BUTTON_SELECTOR).click(function(ev,er){
		submit();
		// location.reload();
	});

	$("form[action='/new-stimulus']").submit(function(ev,er){
		ev.preventDefault();
		var form = this;

		var data = new FormData();
		data.append('stimulus-file',$(STIMULUS_FILE_INPUT_BUTTON_SELECTOR).get(0).files[0]);
		data.append('stimulus-name',$(STIMULUS_NAME_ELEM_SELECTOR).val());

		$.ajax({
		    type: "POST",
		    url: "/new-stimulus",
		    data: data,
		    processData: false,
		    contentType: false,
		    success: function(response) {
		    	console.log(response);
		        if (response.success) {
		        	$(form)
		        		.addClass('has-success');
    				$(STIMULUS_FILE_SUBMIT_BUTTON_SELECTOR)
						.addClass('disabled');
	        		loadStimuli();
		        } else {
		        	$(form)
		        		.addClass('has-error');
		        }
		    },
		    error: function(errResponse) {
		        console.log(errResponse);
		    }
		});
	});
});
