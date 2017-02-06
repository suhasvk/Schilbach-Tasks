// ResultsLib.js

/*
CREATE TABLE HEARTS_AND_FLOWERS_RESULTS (
ID INTEGER REFERENCES ALL_RESULTS(ID),
R1_AVG_TIME FLOAT,
R2_AVG_TIME FLOAT,
R3_AVG_TIME FLOAT,
R1_NUM_CORRECT INT,
R2_NUM_CORRECT INT,
R3_NUM_CORRECT INT,
RAW_RESULTS TEXT,
DEVICE_TYPE TEXT);
*/


const RESULTS_META = [
	{
		"name":"Task",
		"format":"text",
		"column":"TASK"
	},
	{
		"name":"Setting",
		"format":"text",
		"column":"SETTING"
	},
	{
		"name":"Date/Time (UTC)",
		"format":"datetime",
		"column":"FINISH_TIME"
	},
	{
		"name":"Session #",
		"format":"integer",
		"column":"SESSION_ID"
	},
	{
		"name":"R.I.D.",
		"format":"integer",
		"column":"RID"
	},
	{
		"name":"P.I.D.",
		"format":"integer",
		"column":"PID"
	},
	{
		"name":"Result #",
		"format":"integer",
		"column":"RESULT_ID"
	},
	{
		'name':"Download",
		'format':'image',
		'column':"DOWNLOAD"
	}
]

// function RESULTS_META(task_id){
// 	switch(task_id){
// 		case 1:
// 			return HEARTS_AND_FLOWERS_RESULTS_META;
// 			break;
// 	}
// }
