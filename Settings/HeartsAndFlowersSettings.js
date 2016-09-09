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