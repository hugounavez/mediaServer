var express = require('express');
var router = express.Router();
var player = require('play-sound')(opts = {});
const fs = require('fs');

// Global variables
var folderPath = "/home/pi/Music/";
var currentPath = "/home/pi/Music/";
var audio;
var global = this;
var dictionary = {};

router.get('/', function(req, res, next) {

	fs.readdir(currentPath, (err, files) => {

	var first = "<!DOCTYPE html><html><body><h2>An unordered HTML list</h2><ul>";
	var tail = "</ul></body></html>";
	var t = "";
	var counter = 0;
	dictionary = {"files":{}, "folders": {}};


	files.forEach(function(element) {

		var stats = fs.statSync(folderPath.concat(element));
		if (stats.isFile()){
			dictionary["files"][counter] = element;
			t = "<a href=/play/".concat(counter).concat(">").concat(element).concat("</a>");
			
		}else{
			dictionary["folders"][counter] = currentPath.concat(element);
			t = "<a href=/changeFolder/".concat(counter).concat(">").concat(element).concat("</a>");
		}

			counter = counter + 1;
			first = first.concat("<li>").concat(t).concat("</li>");



	});
	       	        res.send(first.concat(tail));

})

});




router.get('/changefolder/:songId', function (req, res) {

	var datos = req.params.songId;
	var modified = dictionary["folders"][datos].split(' ').join(" ");
	console.log("modified", modified);
	currentPath = modified;

	fs.readdir(currentPath, (err, files) => {

	var first = "<!DOCTYPE html><html><body><h2>An unordered HTML list</h2><a href=/stop>Test</a><ul>";
	var tail = "</ul></body></html>";
	var t = "";
	var counter = 0;
	dictionary = {"files":{}, "folders": {}};

	files.forEach(function(element) {
		dictionary["files"][counter] = element;
		//dictionary[counter] = element;
		counter = counter + 1;
		t = "<a href=/play/".concat(counter).concat(">").concat(element).concat("</a>");
		first = first.concat("<li>").concat(t).concat("</li>");
	});

	  res.send(first.concat(tail));
})


});



router.get('/play/:songId', function (req, res) {

	if (this.audio != null){
	 	this.audio.kill()
	}

	var datos = req.params.songId;
	var modified = dictionary["files"][datos].split(' ').join(" ");
	console.log("modified", modified);
	var path = currentPath.concat("/").concat(modified);
	console.log("path ",path);
	this.audio = player.play(path, function(err){

	  if (err != null){
  		if (!err.killed){
			console.log("paRO LA MUSICA");
		}else{
		  	throw err
		}
	}
  

})

fs.readdir(currentPath, (err, files) => {

	var first = "<!DOCTYPE html><html><body><h2>An unordered HTML list</h2><a href=/stop>Test</a><ul>";
	var tail = "</ul></body></html>";
	var t = "";
	var counter = 0;
	dictionary = {"files":{}, "folders": {}};

	files.forEach(function(element) {
		dictionary["files"][counter] = element;
		//dictionary[counter] = element;
		counter = counter + 1;
		t = "<a href=/play/".concat(counter).concat(">").concat(element).concat("</a>");
		first = first.concat("<li>").concat(t).concat("</li>");
	});

	  res.send(first.concat(tail));
})

});

router.get('/stop', function (req, res) {
	this.audio.kill()

	fs.readdir(folderPath, (err, files) => {

	var first = "<!DOCTYPE html><html><body><h2>An unordered HTML list</h2><ul>";
	var tail = "</ul></body></html>";
	var t = "";
	var counter = 0;
	dictionary = {};
	files.forEach(function(element) {
		dictionary[counter] = element;
		counter = counter + 1;
		t = "<a href=/play/".concat(counter).concat(">").concat(element).concat("</a>");		 		
		first = first.concat("<li>").concat(t).concat("</li>");
	});

	  res.send(first.concat(tail));
})

});





router.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
})

module.exports = router;
