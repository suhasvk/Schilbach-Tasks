// main.js
// This file runs the node.js server loop

// debug

// Constants
TASK_NAME_HEARTSANDFLOWERS = 'Hearts and Flowers';
TASK_NAME_CORSI = 'Corsi';
TASK_NAME_N_BACK = 'N-Back';

HF_TASK_ID = 1;
N_BACK_ID =3;

HF_FORMAT_SETTINGS = function(settings_row, query, response){
	var heart_stimulus_path;
	var flower_stimulus_path;

	HF_TASK_PHASE_HEARTS = 'HeartsPhase';
	HF_TASK_PHASE_FLOWERS = 'FlowersPhase';
	HF_TASK_PHASE_BOTH = 'BothPhase';

	db.get('SELECT PATH FROM STIMULI WHERE ID = $id',{$id:settings_row.STIMULUS_ID_HEART}, function(e3,r3){
		if (e3) {
			console.log(e3);
		} else {
			heart_stimulus_path = r3.PATH;
			db.get('SELECT PATH FROM STIMULI WHERE ID = $id',{$id:settings_row.STIMULUS_ID_FLOWER}, function(e4,r4){
				if(e4){
					console.log(e4);
				} else {
					flower_stimulus_path = r4.PATH;
					response.send({
						query: query,
						settings: [
							{
								waitTime: Number(settings_row.WAIT_TIME	),
								numberOfConditions:settings_row.PRACTICE_R1_LENGTH,
								appearanceTime:Number(settings_row.APPEARANCE_TIME),
								isi:{
									min:Number(settings_row.PRACTICE_ISI_MIN),
									max:Number(settings_row.PRACTICE_ISI_MAX)
								},
								phase:HF_TASK_PHASE_HEARTS,
								stimuli: {
									heart: heart_stimulus_path,
									flower: flower_stimulus_path
								}
							},
							{
								waitTime: Number(settings_row.WAIT_TIME),
								appearanceTime:Number(settings_row.APPEARANCE_TIME),
								numberOfConditions:settings_row.R1_LENGTH,
								isi:{
									min:Number(settings_row.ISI_MIN),
									max:Number(settings_row.ISI_MAX)
								},
								phase:HF_TASK_PHASE_HEARTS
							},
							{
								waitTime: Number(settings_row.WAIT_TIME),
								numberOfConditions:settings_row.PRACTICE_R2_LENGTH,
								appearanceTime:Number(settings_row.APPEARANCE_TIME),
								isi:{
									min:Number(settings_row.PRACTICE_ISI_MIN),
									max:Number(settings_row.PRACTICE_ISI_MAX)
								},
								phase:HF_TASK_PHASE_FLOWERS
							},
							{
								waitTime: Number(settings_row.WAIT_TIME),
								appearanceTime:Number(settings_row.APPEARANCE_TIME),
								numberOfConditions:settings_row.R2_LENGTH,
								isi:{
									min:Number(settings_row.ISI_MIN),
									max:Number(settings_row.ISI_MAX)
								},
								phase:HF_TASK_PHASE_FLOWERS
							},
							{
								waitTime: Number(settings_row.WAIT_TIME),
								numberOfConditions:settings_row.PRACTICE_R3_LENGTH,
								appearanceTime:Number(settings_row.APPEARANCE_TIME),
								isi:{
									min:Number(settings_row.PRACTICE_ISI_MIN),
									max:Number(settings_row.PRACTICE_ISI_MAX)
								},
								phase:HF_TASK_PHASE_BOTH
							},
							{
								waitTime: Number(settings_row.WAIT_TIME),
								appearanceTime:Number(settings_row.APPEARANCE_TIME),
								numberOfConditions:settings_row.R3_LENGTH,
								isi:{
									min:Number(settings_row.ISI_MIN),
									max:Number(settings_row.ISI_MAX)
								},
								phase:HF_TASK_PHASE_BOTH
							}
						]
					});
				}
			});
		}
	});
}

NBACK_FORMAT_SETTINGS = function(settings_row, query, response){
		response.send({
			query:query,
			settings:[
				//practice settings
				{
					numBack:Number(settings_row.PRACTICE_N_BACK),
					colors:JSON.parse(settings_row.PRACTICE_COLORS),
					shapes:JSON.parse(settings_row.PRACTICE_SHAPES),
					colorShapeDependence:settings_row.COLOR_SHAPE_DEPENDENT,
					numStimuli:Number(settings_row.PRACTICE_LENGTH),
					reqStimuli:JSON.parse(settings_row.PRACTICE_REQUIRED_STIMULI),
					stimSeconds:Number(settings_row.PRACTICE_APPEARANCE_TIME),
					waitSeconds:Number(settings_row.PRACTICE_ISI),
					initialWaitTime:Number(settings_row.PRACTICE_INITIAL_WAIT_TIME)
				},
				//real settings
				{
					numBack:Number(settings_row.N_BACK),
					colors:JSON.parse(settings_row.COLORS),
					shapes:JSON.parse(settings_row.SHAPES),
					colorShapeDependence:settings_row.COLOR_SHAPE_DEPENDENT,
					numStimuli:Number(settings_row.LENGTH),
					reqStimuli:JSON.parse(settings_row.REQUIRED_STIMULI),
					stimSeconds:Number(settings_row.APPEARANCE_TIME),
					waitSeconds:Number(settings_row.ISI),
					initialWaitTime:Number(settings_row.INITIAL_WAIT_TIME)
				}
			]
		});
}


const port = process.env.PORT || 8080;
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const busboyBodyParser = require('busboy-body-parser');
const path = require('path');

var app = express();
var db = new sqlite3.Database('resources.db');

app.use(busboyBodyParser({limit:'5mb'}));

app.listen(port, function() {
	console.log('Listening on port '+port+'.');
});

app.use(express.static('shared'));
app.use(express.static('BeginTask'));
app.use(express.static('HeartsAndFlowers'));
app.use(express.static('NBack'));
app.use(express.static('Settings'));
app.use(express.static('Results'));
app.use(express.static('Register'));

app.get('/language', function(req,res){
	// TODO get translations mapping
});

app.get('/validate-rid', function(req,res){
	var rid = parseInt(req.query.rid);
	var timestamp = req.query.time;
	db.get('SELECT * FROM SURVEYOR WHERE ID = $rid', {$rid: rid}, function(err, row){
		if (row){
			res.send({
				bad_rid: false
			});
		} else {
			res.send({
				bad_rid: true
			});
		}
	});
});

// Given a task id, this returns a list of all settings presets corresponding to that task
// TODO fix to pull task-specific table name from database given task id
app.get('/settings-presets', function(req,res){
	var task = req.query.task;
	switch(task){
		case TASK_NAME_HEARTSANDFLOWERS:
			db.all('SELECT * FROM HEARTS_AND_FLOWERS_SETTINGS', function(err,rows){
				res.send({
					query: req.query,
					presets: rows
				});
			});
			break;
		case TASK_NAME_N_BACK:
			db.all('SELECT * FROM N_BACK_SETTINGS', function(err,rows){
				res.send({
					query:req.query,
					presets:rows
				});
			});
			break;
	}
});

// Given a task id and setting id, this returns information about the specified setting
// TODO fix to pull task-specific table name from database given task id
app.get('/view-setting', function(req,res){
	var task = req.query.task;
	var setting_id = req.query.setting_id;
	console.log(req.query);
	switch(task){
		case TASK_NAME_HEARTSANDFLOWERS:
			db.get('SELECT * FROM HEARTS_AND_FLOWERS_SETTINGS WHERE ID = $id',{$id: setting_id}, function(err,setting){
				console.log(setting);
				res.send(setting);
			});
			break;
		case TASK_NAME_N_BACK:
			db.get("SELECT * FROM N_BACK_SETTINGS WHERE ID=$id", {$id:setting_id},function(err,setting){
				console.log(setting);
				res.send(setting);
			});
		break;
	}
});

app.post('/create-session', function(req,res){
	console.log(req.body);
	db.get("SELECT TASK_ID FROM ALL_SETTINGS WHERE ID = $setting_id",{$setting_id: req.body.setting_id}, function(err,row){
		if (err) {
			console.log(err);
		} else {
			db.run("INSERT INTO SESSION VALUES (NULL,$setting_id,$rid,$task_id,$creation_time)", {
				$setting_id: req.body.setting_id,
				$rid: req.body.rid,
				$task_id: req.body.task_id,
				$creation_time: (new Date()).getTime()
			}, function(error){
				if (error){
					console.log(error);
					res.send({
						success: false,
						error: error
					});
				} else {
					res.send({
						request: req.body,
						session_id: this.lastID,
						success: true
					});
				}
			});
		}
	});
})

// This serves a list of all available tasks (names, IDs).
app.get('/tasks-list', function(req,res){
	db.all("SELECT ID, NAME FROM TASK", function(err,rows){
		res.send({
			query: req.query,
			tasks: rows
		});
	});
});

// This serves a list of all stimulus images
app.get('/stimuli-list', function(req,res){
	db.all("SELECT * FROM STIMULI", function(err,rows){
		res.send({
			query: req.query,
			tasks: rows
		});
	});
});


app.get('/initialize-session', function(req,res){
	var setting_id;
	var settings_table_name;
	var task_id;
	var settings_row;
	/*
	db.get("SELECT SESSION.SETTING_ID, TASK.SETTINGS_TABLE_NAME, ALL_SETTINGS.TASK_ID FROM SESSION INNER JOIN ALL_SETTINGS ON SESSION.SETTING_ID = ALL_SETTINGS.ID INNER JOIN TASK ON ALL_SETTINGS.TASK_ID = TASK.ID WHERE SESSION.ID = $session_id",{$session_id: req.query.session_id}, function(e,r){
		if(e){
			console.log(e);
		} else {
			setting_id = r.SETTING_ID;
			settings_table_name = r.SETTINGS_TABLE_NAME;
			task_id = r.TASK_ID;*/
			db.get("SELECT SETTING_ID, TASK_ID FROM SESSION WHERE ID=$session_id",{$session_id: req.query.session_id},function(e,r){
				if (e){
					console.log(e);
				}else{
					setting_id=r.SETTING_ID;
					task_id=r.TASK_ID;
					db.get("SELECT SETTINGS_TABLE_NAME FROM TASK WHERE ID = $task_id",{$task_id: task_id}, function(e2,r2){
						if (e2){
							console.log(e2);
						}else{
							settings_table_name = r2.SETTINGS_TABLE_NAME;
							db.get("SELECT * FROM "+settings_table_name+" where ID = $setting_id", {
								$setting_id: setting_id
							}, function (e3,r3){
								if(e2){
									console.log(e3);
								} else {
									settings_row = r3;
									switch(task_id){
										case HF_TASK_ID:
											HF_FORMAT_SETTINGS(settings_row, req.query, res);
											break;
										case N_BACK_ID:
											NBACK_FORMAT_SETTINGS(settings_row, req.query,res);
											break;
									}
								}
							});
						}
					});
				}
			});
	//});
});

app.post('/save-results', function(req,res){
	var task_id = Number(req.body.task_id);
	var data = {
		$session_id: req.body.session_id,
		$pid: req.body.pid,
		$time: req.body.time
	}
	console.log(req.body);
	db.run("INSERT INTO ALL_RESULTS VALUES (NULL, $pid, $session_id, datetime($time,'unixepoch'))",data,function(e){
		if (e) {
			console.log(e);
		} else {
			var result_id = this.lastID;
			switch(task_id) {
				// This is where we write results to database
				case 1:
					console.log('pow');
					db.run("INSERT INTO HEARTS_AND_FLOWERS_RESULTS VALUES ($id, $avg_time_1, $avg_time_2, $avg_time_3, $n_correct_1, $n_correct_2, $n_correct_3, $raw, $deviceInfo)" , {
						$id: result_id,
						$avg_time_1: req.body.avg_time_1,
						$avg_time_2: req.body.avg_time_2,
						$avg_time_3: req.body.avg_time_3,
						$n_correct_1: req.body.n_correct_1,
						$n_correct_2: req.body.n_correct_2,
						$n_correct_3: req.body.n_correct_3,
						$raw: req.body.raw,
						$deviceInfo: req.body.deviceInfo
					}, function(ee){
						if(ee){
							console.log(ee);
							res.send({"success":false});
						} else {

							res.send({"success":true});
						}
					});
					break;
					case 3:
						db.run("INSERT INTO N_BACK_RESULTS VALUES($id, $avgCorrectTime, $numMissed, $noResponse, $numCorrect,$rawResults, $deviceType)", {
							$id: result_id,
							$avgCorrectTime:req.body.averageCorrectTime,
							$numMissed:req.body.numMissed,
							$numCorrect:req.body.numCorrect,
							$noResponse:req.body.noResponse,
							$deviceType:req.body.deviceInfo,
							$rawResults:req.body.raw
						}, function(eee){
							if(eee){
								console.log(eee);
								res.send({"success":false});
							} else {
								res.send({"success":true});
							}
						});
					break;
			}
		}
	});
});

app.post('/register-surveyor', function(req,res){
	db.run("INSERT INTO SURVEYOR VALUES (NULL, $name)",{$name: req.body.surveyor_name}, function(err){
		if(err){
			console.log(err);
			res.send({
				success:false
			});
		} else {
			res.send({
				success:true,
				RID:this.lastID,
				name:req.body.surveyor_name
			})
		}
	});
});

// This route handles requests for results
// A valid request consists of a task ID (task_id), and:
// 		before_time: the latest time a result could have been created
// 		after_time: the earliest time a result could have been created
// It returns a list of results satisfying
app.get('/view-results', function(req,res){

	var task_id = req.query.task_id;
	var after_time = req.query.after_time;
	var before_time = req.query.before_time;

	console.log(after_time);
	console.log(before_time);


	// First we get the name of the table containing this task's detailed resutlts, by looking in TASK
	db.get('SELECT RESULTS_TABLE_NAME FROM TASK WHERE ID = $task_id',{$task_id: task_id}, function(e,row){
		if(e){
			console.log(e)
		} else {
			var table = row.RESULTS_TABLE_NAME;
			console.log("SELECT T.NAME, ST.NAME, datetime(ALL_RESULTS.FINISH_TIME), S.ID, S.RID, ALL_RESULTS.PID, DETAILED.RAW_RESULTS\n"
			+ " FROM ALL_RESULTS\n"
			+ "	JOIN "+table+" AS DETAILED\n"
			+ "			ON ALL_RESULTS.ID = DETAILED.ID\n"
			+ "		JOIN SESSION AS S\n"
			+ "			ON ALL_RESULTS.SESSION_ID = S.ID\n"
			+ "		JOIN TASK AS T\n"
			+ "			ON S.TASK_ID = T.ID\n"
			+ "		JOIN ALL_SETTINGS AS ST\n"
			+ "			ON S.SETTING_ID = ST.ID\n"
			+ " WHERE ALL_RESULTS.FINISH_TIME > datetime("+parseInt(after_time/1000)+",'unixepoch') \n"
			+ " AND ALL_RESULTS.FINISH_TIME < datetime("+parseInt(before_time/1000)+", 'unixepoch');\n");

			db.all(
			"SELECT T.NAME AS TASK, ST.NAME AS SETTING, ST.ID AS SETTING_ID, datetime(ALL_RESULTS.FINISH_TIME) AS FINISH_TIME, S.ID AS SESSION_ID, S.RID, ALL_RESULTS.PID, ALL_RESULTS.ID AS RESULT_ID, DETAILED.RAW_RESULTS"
			+ " FROM ALL_RESULTS"
			+ "	JOIN "+ table +" AS DETAILED\n"
			+ "			ON ALL_RESULTS.ID = DETAILED.ID\n"
			+ "		JOIN SESSION AS S\n"
			+ "			ON ALL_RESULTS.SESSION_ID = S.ID\n"
			+ "		JOIN TASK AS T\n"
			+ "			ON S.TASK_ID = T.ID\n"
			+ "		JOIN ALL_SETTINGS AS ST\n"
			+ "			ON S.SETTING_ID = ST.ID\n"
			+ " WHERE ALL_RESULTS.FINISH_TIME > datetime("+parseInt(after_time/1000)+",'unixepoch')\n"
			+ " AND ALL_RESULTS.FINISH_TIME < datetime("+parseInt(before_time/1000)+", 'unixepoch');",

			function(err,rows){
				if(err){
					console.log(err);
				} else {
					console.log(rows);
					res.send(rows);
				}
			});
		}
	});
});

app.post('/new-stimulus', function(req,res){
	var name = req.body["stimulus-name"];
	var file = req.files["stimulus-file"];
	var file_save_name = file.name.split('.').slice(0,-1).join('') //this is the original file name (minus extension)
							+ (new Date).getTime() //this is an integer corresponding to the date and time, to avoid naming conflicts
							+ '.' + file.name.split('.').slice(-1); //this is the original file extension


	// TODO FILE VALIDATION


	// Write file to server and insert into database:
	var rel_path = path.join('img', file_save_name);
	var file_path = path.join(__dirname, 'shared', rel_path);
	fs.writeFile(file_path, file.data, function (err) {
		if (err){
			console.log(err);
			res.send({
				success: false,
				errorType: "file-write",
				error: err
			});
		} else {
			db.run("INSERT INTO STIMULI VALUES (NULL, $path, $name)",{
				$path: rel_path,
				$name: name
			}, function(er){
				if (er) {
					console.log(er);
					fs.unlink(file_path);
					res.send({
						success: false,
						errorType: "db-insert",
						error: er
					});
				} else {
					res.send({
						success: true
					});
				}
			});
		}
	});
});

app.post('/create-setting', function(req,res){
	console.log(req.body);
	var setting_name = req.body.NAME;
	var task_id = Number(req.body.TASK_ID);
	db.run("INSERT INTO ALL_SETTINGS VALUES (NULL, $name, $id)", {
		$id: task_id,
		$name: setting_name
	}, function(error) {
		if (error) {
			// TODO
		} else {
			var setting_id = this.lastID;
			switch(task_id) {
				case 1:
					db.run("INSERT INTO HEARTS_AND_FLOWERS_SETTINGS VALUES ($ID,$PRACTICE_ISI_MIN,$PRACTICE_ISI_MAX,$APPEARANCE_TIME,$ISI_MIN,$ISI_MAX,$PRACTICE_R1_LENGTH,$PRACTICE_R2_LENGTH,$PRACTICE_R3_LENGTH,$R1_LENGTH,$R2_LENGTH,$R3_LENGTH,$STIMULUS_ID_HEART,$STIMULUS_ID_FLOWER,$NAME, 1000)",
					{
						$ID: req.body.ID,
						$PRACTICE_ISI_MIN: req.body.PRACTICE_ISI_MIN,
						$PRACTICE_ISI_MAX: req.body.PRACTICE_ISI_MAX,
						$APPEARANCE_TIME: req.body.APPEARANCE_TIME,
						$ISI_MIN: req.body.ISI_MIN,
						$ISI_MAX: req.body.ISI_MAX,
						$PRACTICE_R1_LENGTH: req.body.PRACTICE_R1_LENGTH,
						$PRACTICE_R2_LENGTH: req.body.PRACTICE_R2_LENGTH,
						$PRACTICE_R3_LENGTH: req.body.PRACTICE_R3_LENGTH,
						$R1_LENGTH: req.body.R1_LENGTH,
						$R2_LENGTH: req.body.R2_LENGTH,
						$R3_LENGTH: req.body.R3_LENGTH,
						$STIMULUS_ID_HEART: req.body.STIMULUS_ID_HEART,
						$STIMULUS_ID_FLOWER: req.body.STIMULUS_ID_FLOWER,
						$NAME: req.body.NAME
					}, function(err){
						if(err) {
							console.log(err);
							res.send({
								success: false,
								errorType: 'db-insert',
								error: err
							});
						} else {
							res.send({
								success: true
							});
						}
					})
					break;
				case 3:
					db.run("INSERT INTO N_BACK_SETTINGS VALUES ($ID,$PRACTICE_ISI,$PRACTICE_INITIAL_WAIT_TIME,$PRACTICE_APPEARANCE_TIME,$PRACTICE_LENGTH,$PRACTICE_COLORS,$PRACTICE_SHAPES,$PRACTICE_REQUIRED_STIMULI,$ISI,$INITIAL_WAIT_TIME,$APPEARANCE_TIME,$LENGTH,$COLORS,$SHAPES,$REQUIRED_STIMULI,$NAME,$N_BACK,$PRACTICE_N_BACK,$COLOR_SHAPE_DEPENDENT)",
					{
						$ID: req.body.ID,
						$PRACTICE_ISI:req.body.PRACTICE_ISI,
						$PRACTICE_INITIAL_WAIT_TIME: req.body.PRACTICE_INITIAL_WAIT_TIME,
						$PRACTICE_APPEARANCE_TIME:req.body.PRACTICE_APPEARANCE_TIME,
						$PRACTICE_LENGTH:req.body.PRACTICE_LENGTH,
						$PRACTICE_COLORS:req.body.PRACTICE_COLORS,
						$PRACTICE_SHAPES:req.body.PRACTICE_SHAPES,
						$PRACTICE_REQUIRED_STIMULI:req.body.PRACTICE_REQUIRED_STIMULI,
						$ISI:req.body.ISI,
						$INITIAL_WAIT_TIME:req.body.INITIAL_WAIT_TIME,
						$APPEARANCE_TIME: req.body.APPEARANCE_TIME,
						$LENGTH: req.body.LENGTH,
						$COLORS:req.body.COLORS,
						$SHAPES:req.body.SHAPES,
						$REQUIRED_STIMULI:req.body.REQUIRED_STIMULI,
						$NAME: req.body.NAME,
						$N_BACK:req.body.N_BACK,
						$PRACTICE_N_BACK:req.body.PRACTICE_N_BACK,
						$COLOR_SHAPE_DEPENDENT:req.body.COLOR_SHAPE_DEPENDENT
					}, function(err){
						if(err) {
							console.log(err);
							res.send({
								success: false,
								errorType: 'db-insert',
								error: err
							});
						} else {
							res.send({
								success: true
							});
						}
					})
					break;
			}
		}
	})
});

app.get('/', function(req, res) {
	res.send('Hello World!');
});
