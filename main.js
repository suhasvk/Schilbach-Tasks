// main.js
// This file runs the node.js server loop

// Constants
// TASK_NAME_HEARTSANDFLOWERS = 'Hearts and Flowers';
// TASK_NAME_CORSI = 'Corsi';
// TASK_NAME_N_BACK = 'N-Back';

// HF_TASK_ID = 1;


var port = process.env.PORT || 8080;

// HF_FORMAT_SETTINGS = function(settings_row, query, response){
// 	var heart_stimulus_path;
// 	var flower_stimulus_path;

// 	HF_TASK_PHASE_HEARTS = 'HeartsPhase';
// 	HF_TASK_PHASE_FLOWERS = 'FlowersPhase';
// 	HF_TASK_PHASE_BOTH = 'BothPhase';

// 	db.get('SELECT PATH FROM STIMULI WHERE ID = $id',{$id:settings_row.STIMULUS_ID_HEART}, function(e3,r3){
// 		if (e3) {
// 			console.log(e3);
// 		} else {
// 			heart_stimulus_path = r3.PATH;
// 			db.get('SELECT PATH FROM STIMULI WHERE ID = $id',{$id:settings_row.STIMULUS_ID_FLOWER}, function(e4,r4){
// 				if(e4){
// 					console.log(e4);
// 				} else {
// 					flower_stimulus_path = r4.PATH;
// 					response.send({
// 						query: query,
// 						settings: [
// 							{	
// 								waitTime: Number(settings_row.WAIT_TIME	),
// 								numberOfConditions:settings_row.PRACTICE_R1_LENGTH,
// 								appearanceTime:Number(settings_row.APPEARANCE_TIME),
// 								isi:{
// 									min:Number(settings_row.PRACTICE_ISI_MIN),
// 									max:Number(settings_row.PRACTICE_ISI_MAX)
// 								},
// 								phase:HF_TASK_PHASE_HEARTS,
// 								stimuli: {
// 									heart: heart_stimulus_path,
// 									flower: flower_stimulus_path
// 								}
// 							},
// 							{
// 								waitTime: Number(settings_row.WAIT_TIME),
// 								appearanceTime:Number(settings_row.APPEARANCE_TIME),
// 								numberOfConditions:settings_row.R1_LENGTH,
// 								isi:{
// 									min:Number(settings_row.ISI_MIN),
// 									max:Number(settings_row.ISI_MAX)
// 								},
// 								phase:HF_TASK_PHASE_HEARTS
// 							},
// 							{
// 								waitTime: Number(settings_row.WAIT_TIME),
// 								numberOfConditions:settings_row.PRACTICE_R2_LENGTH,
// 								appearanceTime:Number(settings_row.APPEARANCE_TIME),
// 								isi:{
// 									min:Number(settings_row.PRACTICE_ISI_MIN),
// 									max:Number(settings_row.PRACTICE_ISI_MAX)
// 								},
// 								phase:HF_TASK_PHASE_FLOWERS
// 							},
// 							{
// 								waitTime: Number(settings_row.WAIT_TIME),
// 								appearanceTime:Number(settings_row.APPEARANCE_TIME),
// 								numberOfConditions:settings_row.R2_LENGTH,
// 								isi:{
// 									min:Number(settings_row.ISI_MIN),
// 									max:Number(settings_row.ISI_MAX)
// 								},
// 								phase:HF_TASK_PHASE_FLOWERS
// 							},
// 							{
// 								waitTime: Number(settings_row.WAIT_TIME),
// 								numberOfConditions:settings_row.PRACTICE_R3_LENGTH,
// 								appearanceTime:Number(settings_row.APPEARANCE_TIME),
// 								isi:{
// 									min:Number(settings_row.PRACTICE_ISI_MIN),
// 									max:Number(settings_row.PRACTICE_ISI_MAX)
// 								},
// 								phase:HF_TASK_PHASE_BOTH
// 							},
// 							{
// 								waitTime: Number(settings_row.WAIT_TIME),
// 								appearanceTime:Number(settings_row.APPEARANCE_TIME),
// 								numberOfConditions:settings_row.R3_LENGTH,
// 								isi:{
// 									min:Number(settings_row.ISI_MIN),
// 									max:Number(settings_row.ISI_MAX)
// 								},
// 								phase:HF_TASK_PHASE_BOTH
// 							}
// 						]
// 					});
// 				}
// 			});	
// 		}		
// 	});
// }

// var express = require('express');
// var sqlite3 = require('sqlite3').verbose();

// var app = express();
// var db = new sqlite3.Database('resources.db');

// app.use(express.static('shared'));
// app.use(express.static('BeginTask'));
// app.use(express.static('HeartsAndFlowers'))
// app.get('/language', function(req,res){
// 	// TODO get translations mapping
// });

// app.post('/register-surveyor', function(req,res){
// 	// TODO add surveyor
// });

// app.get('/validate-rid', function(req,res){
// 	var rid = parseInt(req.query.rid);
// 	var timestamp = req.query.time;
// 	db.get('SELECT * FROM SURVEYOR WHERE ID = $rid', {$rid: rid}, function(err, row){
// 		if (row){
// 			res.send({
// 				bad_rid: false
// 			});
// 		} else {
// 			res.send({
// 				bad_rid: true
// 			});
// 		}
// 	});
// });

// app.get('/settings-presets', function(req,res){
// 	var task = req.query.task;
// 	switch(task){
// 		case TASK_NAME_HEARTSANDFLOWERS:
// 			db.all('SELECT * FROM HEARTS_AND_FLOWERS_SETTINGS', function(err,rows){
// 				res.send({
// 					query: req.query,
// 					presets: rows
// 				});
// 			});
// 			break;
// 	}
// });

// app.get('/create-session', function(req,res){
// 	console.log(req.query.setting_id);
// 	db.get("SELECT TASK_ID FROM ALL_SETTINGS WHERE ID = $setting_id",{$setting_id: req.query.setting_id}, function(err,row){
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			db.run("INSERT INTO SESSION VALUES (NULL,$setting_id,$rid,$task_id,$creation_time)", {
// 				$setting_id: req.query.setting_id,
// 				$rid: req.query.rid,
// 				$task_id: row.TASK_ID,
// 				$creation_time: (new Date()).getTime()
// 			}, function(error){
// 				if (error){
// 					console.log(error);
// 				} else {
// 					res.send({
// 						query: req.query,
// 						session_id: this.lastID
// 					});
// 				}
// 			});
// 		}
// 	});
// })

// app.get('/initialize-session', function(req,res){
// 	var setting_id;
// 	var settings_table_name;
// 	var task_id;
// 	var settings_row;
// 	db.get("SELECT SESSION.SETTING_ID, TASK.SETTINGS_TABLE_NAME, ALL_SETTINGS.TASK_ID FROM SESSION INNER JOIN ALL_SETTINGS ON SESSION.SETTING_ID = ALL_SETTINGS.ID INNER JOIN TASK ON ALL_SETTINGS.TASK_ID = TASK.ID WHERE SESSION.ID = $session_id",{$session_id: req.query.session_id}, function(e,r){
// 		if(e){
// 			console.log(e);
// 		} else {
// 			setting_id = r.SETTING_ID;
// 			settings_table_name = r.SETTINGS_TABLE_NAME;
// 			task_id = r.TASK_ID;
// 			db.get("SELECT * FROM "+settings_table_name+" where ID = $setting_id", {
// 				$setting_id: setting_id
// 			}, function (e2,r2){
// 				if(e2){
// 					console.log(e2);
// 				} else {
// 					settings_row = r2;
// 					switch(task_id){
// 						case HF_TASK_ID:
// 							HF_FORMAT_SETTINGS(settings_row, req.query, res);
// 							break;
// 					}
// 				}
// 			});
// 		}
// 	});
// });

// app.get('/save-results', function(req,res){
// 	var task_id = Number(req.query.task_id);
// 	var data = {
// 		$session_id: req.query.session_id,
// 		$pid: req.query.pid,
// 	}
// 	db.run("INSERT INTO ALL_RESULTS VALUES (NULL, $pid, $session_id)",data,function(e){
// 		if (e) {
// 			console.log(e);
// 		} else {
// 			var result_id = this.lastID;
// 			switch(task_id) {
// 				// This is where we write results to database
// 				case 1:
// 					console.log(req.query);
// 					console.log(result_id)
// 					db.run("INSERT INTO HEARTS_AND_FLOWERS_RESULTS VALUES ($id, $avg_time_1, $avg_time_2, $avg_timet_3, $n_correct_1, $n_correct_2, $n_correct_3, $raw)" , {
// 						$id: result_id,
// 						$avg_time_1: req.query.resultData.avg_time_1,
// 						$avg_time_2: req.query.resultData.avg_time_2,
// 						$avg_time_3: req.query.resultData.avg_time_3,
// 						$n_correct_1: req.query.resultData.n_correct_1,
// 						$n_correct_2: req.query.resultData.n_correct_2,
// 						$n_correct_3: req.query.resultData.n_correct_3,
// 						$raw: req.query.resultData.raw
// 					}, function(ee){
// 						if(ee){
// 							res.send({"success":false});
// 						} else {
// 							res.send({"success":true});
// 						}
// 					});
// 					break;
// 			}
// 		}
// 	});
// });

// app.get('/create-setting', function(req,res){
// 	// TODO create a new setting
// });

app.get('/', function(req, res) {
	res.send('Hello World!');
});

app.listen(port, function() {
	console.log('Listening on port '+port+'.');
});

