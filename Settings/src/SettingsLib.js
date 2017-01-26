// HeartsAndFlowersSettings.js
HEARTS_AND_FLOWERS_SETTINGS_META = {
	"mechanics":[
		{
			"display":"Stimulus appearance time [ms]",
			"column":"APPEARANCE_TIME",
			"type":"input",
			"validation":"integer"
		},
		{
			"display":"Minimum interstimulus interval (ISI) [ms]",
			"column":"ISI_MIN",
			"type":"input",
			"validation":"integer"
		},
		{
			"display":"Maximum ISI [ms]",
			"column":"ISI_MAX",
			"type":"input",
			"validation":"integer"
		},
		{
			"display":"Hearts round length [stimuli]",
			"column":"R1_LENGTH",
			"type":"input",
			"validation":"integer"
		},
		{
			"display":"Flowers round length [stimuli]",
			"column":"R2_LENGTH",
			"type":"input",
			"validation":"integer"
		},
		{
			"display":"Final round length [stimuli]",
			"column":"R3_LENGTH",
			"type":"input",
			"validation":"integer"
		}
	],

	"practice":[
		{
			"display":"Minimum interstimulus interval (ISI) [ms]",
			"column":"PRACTICE_ISI_MIN",
			"type":"input",
			"validation":"integer"
		},
		{
			"display":"Maximum ISI [ms]",
			"column":"PRACTICE_ISI_MAX",
			"type":"input",
			"validation":"integer"
		},
		{
			"display":"Hearts round length [stimuli]",
			"column":"PRACTICE_R1_LENGTH",
			"type":"input",
			"validation":"integer"
		},
		{
			"display":"Flowers round length [stimuli]",
			"column":"PRACTICE_R2_LENGTH",
			"type":"input",
			"validation":"integer"
		},
		{
			"display":"Final round length [stimuli]",
			"column":"PRACTICE_R3_LENGTH",
			"type":"input",
			"validation":"integer"
		}
	],

	"stimuli":[{
		"display": "Heart stimulus",
		"column": "STIMULUS_ID_HEART",
		"type":"stimulus"
		},
		{
		"display": "Flower stimulus",
		"column": "STIMULUS_ID_FLOWER",
		"type":"stimulus"
	}]
}

N_BACK_SETTINGS_META = {
	"mechanics":[
		{
			"display":"Stimulus appearance time [ms]",
			"column":"APPEARANCE_TIME",
			"type":"input",
			"validation":"integer"
		},
		{
			"display":"Number of rounds",
			"column":"LENGTH",
			"type":"input",
			"validation":"integer"
		},
		{
			"display":"N-Back",
			"column":"N_BACK",
			"type":"input",
			"validation":"integer"
		},
		{
			"display":"Initial Wait Time [ms]",
			"column":"INITIAL_WAIT_TIME",
			"type":"input",
			"validation":"integer"
		},
		{
			"display":"Interstimulus Interval Time (ISI) [ms]",
			"column":"ISI",
			"type":"input",
			"validation":"integer"
		},
	],

	"practice":[
		{
			"display":"Stimulus appearance time [ms]",
			"column":"PRACTICE_APPEARANCE_TIME",
			"type":"input",
			"validation":"integer"
		},
		{
			"display":"Number of rounds",
			"column":"PRACTICE_LENGTH",
			"type":"input",
			"validation":"integer"
		},
		{
			"display":"N-Back",
			"column":"PRACTICE_N_BACK",
			"type":"input",
			"validation":"integer"
		},
		{
			"display":"Initial Wait Time [ms]",
			"column":"PRACTICE_INITIAL_WAIT_TIME",
			"type":"input",
			"validation":"integer"
		},
		{
			"display":"Interstimulus Interval Time (ISI) [ms]",
			"column":"PRACTICE_ISI",
			"type":"input",
			"validation":"integer"
		},
	],

	"stimuli":[
		{
			"display": "Practice colors",
			"column": "PRACTICE_COLORS",
			"type":"stimulus list",
			"input":'color'
		},
		{
			"display": "Practice shapes",
			"column": "PRACTICE_SHAPES",
			"type":"stimulus list",
			'input':'shape'
		},
		{
			"display":"Practice Required Stimuli",
			"column": "PRACTICE_REQUIRED_STIMULI",
			"type":"stimulus list",
			"req":true
		},
		{
			"display": "Colors",
			"column": "COLORS",
			"type":"stimulus list",
			'input':'color'
		},
		{
			"display": "Shapes",
			"column": "SHAPES",
			"type":"stimulus list",
			'input':'shape'
		},
		{
			"display":"Required Stimuli",
			"column": "REQUIRED_STIMULI",
			"type":"stimulus list",
			"req":true
		}
	],
	"colorShapeDependentStimuli":[
		{
			"display":"Practice Stimuli",
			"column": "PRACTICE_STIMULI",
			"type":"stimulus list"
		},
		{
			"display":"Practice Required Stimuli",
			"column": "PRACTICE_REQUIRED_STIMULI",
			"type":"stimulus list",
			"req":true
		},
		{
			"display":"Stimuli",
			"column": "STIMULI",
			"type":"stimulus list"
		},
		{
			"display":"Required Stimuli",
			"column": "REQUIRED_STIMULI",
			"type":"stimulus list",
			"req":true
		}
	]
}
