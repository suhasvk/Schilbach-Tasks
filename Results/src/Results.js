// Results.js

const BEFORE_DATE_TIME_PICKER_ID_SELECTOR = '#beforePicker';
const AFTER_DATE_TIME_PICKER_ID_SELECTOR = '#afterPicker';
const TASK_SELECTOR_ID_SELECTOR = '#taskSelector';
const RESULTS_HEADER_ROW_ID_SELECTOR = "#resultsHeaderRow";
const VIEW_RESULTS_BUTTON_ID_SELECTOR = "#viewResultsButton";
const RESULTS_TABLE_ID_SELECTOR = "#resultsTable";
const INFO_MODAL_TITLE_ID_SELECTOR = "#infoTitle";
const INFO_AREA_ID_SELECTOR = "#infoArea";
const INFO_MODAL_ID_SELECTOR = "#infoModal";
const CLOSE_INFO_MODAL_BUTTON_ID_SELECTOR = "#closeInfo";


// TODO Replace these to use database IDs
const TASK_NAME_HEARTSANDFLOWERS = 'Hearts and Flowers';
const TASK_NAME_CORSI = 'Corsi';
const TASK_NAME_N_BACK = 'N-Back';


const FORMAT_AND_DISPLAY_RESULTS_HF = function(results, id) {
	var displayResults = {
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
	};
	for (category in displayResults) {
		var block = document.createElement('p');
		$(block).append('<strong>'+category+'</strong>')
		for (item in displayResults[category]) {
			var line = item+': '+displayResults[category][item];
			block.appendChild(document.createElement('br'));
			block.appendChild(document.createTextNode(line));
		}
		$(INFO_AREA_ID_SELECTOR).append(block);
	}
	$(INFO_MODAL_TITLE_ID_SELECTOR).text("Result "+id);
	$(CLOSE_INFO_MODAL_BUTTON_ID_SELECTOR).click(function(ev,er){
		$(INFO_MODAL_TITLE_ID_SELECTOR).empty();
		$(INFO_AREA_ID_SELECTOR).empty();
	});
	$(INFO_MODAL_ID_SELECTOR).modal('show');

};

const FORMAT_AND_DISPLAY_SETTINGS_HF = function(setting_id) {
	console.log('we in here!')
	// This gets the settings info for hearts and flowers settings
	var setting_data = {
		task: TASK_NAME_HEARTSANDFLOWERS,
		setting_id:setting_id
	};

	$.get('/view-setting', setting_data, function(data){
		console.log(data);
		var displaySettings = {
			'Time Settings':{
				'Minimum ISI': data.ISI_MIN,
				'Maximum ISI': data.ISI_MAX,
				'Appearance Time': data.APPEARANCE_TIME
			},
			'Round Lengths':{
				'Hearts Only': data.R1_LENGTH,
				'Flowers Only': data.R2_LENGTH,
				'Both': data.R3_LENGTH
			}
		};
		for (category in displaySettings) {
			var block = document.createElement('p');
			$(block).append('<strong>'+category+'</strong>')
			for (item in displaySettings[category]) {
				var line = item+': '+displaySettings[category][item];
				block.appendChild(document.createElement('br'));
				block.appendChild(document.createTextNode(line));
			}
			$(INFO_AREA_ID_SELECTOR).append(block);
		}
		$(INFO_MODAL_TITLE_ID_SELECTOR).text("Setting "+setting_id);
		$(CLOSE_INFO_MODAL_BUTTON_ID_SELECTOR).click(function(ev,er){
			$(INFO_MODAL_TITLE_ID_SELECTOR).empty();
			$(INFO_AREA_ID_SELECTOR).empty();
		});
		$(INFO_MODAL_ID_SELECTOR).modal('show');
		});
};

const FORMAT_AND_DISPLAY_RESULTS_NBACK = function(results, id){
	console.log(results);
	var displayResults = {
		"Fraction Correct":results.numCorrect+'/'+results.numStimuli,
		"Average Correct Response Time":(results.avgCorrectTime),
	}
	for (category in displayResults) {
		var block = document.createElement('p');
		$(block).append('<strong>'+category+'</strong>')
		var text =": "+displayResults[category];
		$(block).append(text);
		$(INFO_AREA_ID_SELECTOR).append(block);
	}
	$(CLOSE_INFO_MODAL_BUTTON_ID_SELECTOR).click(function(ev,er){
		$(INFO_MODAL_TITLE_ID_SELECTOR).empty();
		$(INFO_AREA_ID_SELECTOR).empty();
	});
	$(INFO_MODAL_ID_SELECTOR).modal('show');
}
const FORMAT_AND_DISPLAY_SETTINGS_NBACK = function(setting_id) {
	console.log('we in here')
	// This gets the settings info for hearts and flowers settings
	var setting_data = {
		task: TASK_NAME_N_BACK,
		setting_id:setting_id
	};

	$.get('/view-setting', setting_data, function(data){
		console.log(data);
		var displaySettings = {};
		displaySettings['Settings']={
				'ISI': data.ISI,
				'Appearance Time': data.APPEARANCE_TIME,
				'N': data.N_BACK,
				'Round Length':data.LENGTH,
				'Initial Wait Time':data.INITIAL_WAIT_TIME
		};
		if (data.COLOR_SHAPE_DEPENDENT){
			var stimList = '';
			var colors = JSON.parse(data.COLORS);
			var shapes = JSON.parse(data.SHAPES);
			for (i=0;i<colors.length;i++){
				var stim = ((i!=0)?', ':'')+colors [i]+ ' '+shapes[i];
				stimList.push(stim);
			}
			displaySettings['Stimuli']=stimList
	}else{
		displaySettings['Stimuli']=
		{
			'Colors': JSON.parse(data.COLORS),
			'Shapes': JSON.parse(data.SHAPES),
		};
	};
		for (category in displaySettings) {
			var block = document.createElement('p');
			$(block).append('<strong>'+category+'</strong>')
			if (data.COLOR_SHAPE_DEPENDENT && category == "Stimuli"){
				var line = displaySettings[category];
			}else{
				for (item in displaySettings[category]) {
					var line = item+': '+displaySettings[category][item];
					block.appendChild(document.createElement('br'));
					block.appendChild(document.createTextNode(line));
				}
			}
			$(INFO_AREA_ID_SELECTOR).append(block);
		}
		$(INFO_MODAL_TITLE_ID_SELECTOR).text("Setting "+setting_id);
		$(CLOSE_INFO_MODAL_BUTTON_ID_SELECTOR).click(function(ev,er){
			$(INFO_MODAL_TITLE_ID_SELECTOR).empty();
			$(INFO_AREA_ID_SELECTOR).empty();
		});
		$(INFO_MODAL_ID_SELECTOR).modal('show');
		});
};

$(document).ready(function(){

    $(AFTER_DATE_TIME_PICKER_ID_SELECTOR).datetimepicker();
    $(BEFORE_DATE_TIME_PICKER_ID_SELECTOR).datetimepicker();
	$('#selectionModal').modal('show');

	$.get('/tasks-list', {}, function(resp){
		$.each(resp.tasks, function(i, val){
			var opt = document.createElement("option");
			opt.text = val.NAME;
			opt.value = val.ID;
			$(TASK_SELECTOR_ID_SELECTOR).append(opt);
		});
	});

	$(VIEW_RESULTS_BUTTON_ID_SELECTOR).click(function(evt,err){

		var raw_before_time = (new Date($(BEFORE_DATE_TIME_PICKER_ID_SELECTOR).data('DateTimePicker').date())).getTime();
		var raw_after_time = (new Date($(AFTER_DATE_TIME_PICKER_ID_SELECTOR).data('DateTimePicker').date())).getTime();

		// If the input for before_time is blank, pass through value corresponding to the present time
		var before_time =
			($(BEFORE_DATE_TIME_PICKER_ID_SELECTOR).children('input').val() === "") ?
				(new Date()).getTime() :
				raw_before_time;

		// If the input for before_time is blank, pass through value corresponding to beginning of (computer) time
		var after_time =
			($(AFTER_DATE_TIME_PICKER_ID_SELECTOR).children('input').val() === "") ?
				(new Date(0)).getTime() :
				raw_after_time;

		var input_data = {
			"task_id": $(TASK_SELECTOR_ID_SELECTOR).val(),
			"before_time": before_time,
			"after_time": after_time
		}

		// Assign global variable task_id, which determines formatting of settings/results
		task_id = Number(input_data["task_id"]);

		$('#selectionModal').modal('hide');

		$.get('/view-results',input_data,function(data){


			// Make a column header each column specified in the RESULTS_META list
			$.each(RESULTS_META, function(i, val){
				var col_header = document.createElement("th");
				$(col_header).text(val["name"]);
				$(RESULTS_HEADER_ROW_ID_SELECTOR).append(col_header);
			});

			// Make a row and fill in values for each result in the server's response
			$.each(data, function(i, result){
				var row = document.createElement("tr")
				$.each(RESULTS_META, function(ii, field){
					if (field["column"]=="RESULT_ID") {

						// create link to display results summary
						var cell = document.createElement("td");
						var text = document.createElement("a");
						$(text).text(result[field["column"]]);
						$(cell).append(text);
						$(row).append(cell);
						$(text).click(function(ev,er){
							switch(task_id){
								// Call special function that formats and displays the results for hearts and flowers
								case 1:
									FORMAT_AND_DISPLAY_RESULTS_HF(JSON.parse(result["RAW_RESULTS"]), result["RESULT_ID"]);
									break;
								case 3:
								console.log('here!');
								console.log(result);
									FORMAT_AND_DISPLAY_RESULTS_NBACK(JSON.parse(result.RAW_RESULTS),result['RESULT_ID']);
									break;
							}
						});
					}

					else if (field["column"]=="SETTING") {
						// create link to display settings summary
						var cell = document.createElement("td");
						var text = document.createElement("a");
						$(text).text(result[field["column"]]);
						$(cell).append(text);
						$(row).append(cell);
						$(text).click(function(ev,er){
							switch(task_id){
								case 1:
									console.log('did!')
									console.log(result["SETTING_ID"]);
									FORMAT_AND_DISPLAY_SETTINGS_HF(result["SETTING_ID"]);
									break;
								case 3:
									console.log('here?');
									FORMAT_AND_DISPLAY_SETTINGS_NBACK(result["SETTING_ID"])
									break;
							}
						})
					} else {
						var cell = document.createElement("td");
						$(cell).text(result[field["column"]]);
						$(row).append(cell);
					}
				});
				$(row).attr('id',"result"+result["RESULT_ID"]);
				$(RESULTS_TABLE_ID_SELECTOR).append(row);
			});
		});
	});
});
