// main.js
// This file runs the node.js server loop

var express = require('express');
var app = express();

app.use(express.static('shared'));
app.use(express.static('BeginTask'));
app.use(express.static('HeartsAndFlowers'))
app.get('/language', function(req,res){
	// TODO get translations mapping
});

app.get('/settings-presets', function(req,res){
	// TODO get default settings
});

app.post('/save', function(req,res){
	// TODO save task results
});

app.post('/create-setting', function(req,res){
	// TODO create a new setting
});

app.get('/', function(req, res) {
	res.send('Hello World!');
});

app.listen(3000, function() {
	console.log('Listening on port 3000.')
});

