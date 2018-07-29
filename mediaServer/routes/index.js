var express = require('express');
var router = express.Router();
var player = require('play-sound')(opts = {});
var fileHandler = require("./fileHandler.js");
const fs = require('fs');

// Global variables
var folderPath = "/home/pi/Music/";
var currentPath = "/home/pi/Music/";
var audio;
var global = this;
var dictionary = {};

router.get('/', function(req, res, next) {

	fileHandler.readPath(currentPath, function(data){
		dictionary = data;
		res.send(data);
	});


});




router.get('/changefolder/:newFolder', function (req, res) {

	var datos = req.params.newFolder;
	var modified = dictionary["folders"][datos];
	this.currentPath = modified.concat("/");
	fileHandler.readPath(this.currentPath, function(data){
		dictionary = data;
		res.send(data);
	});


});

router.get('/upFolder', function(req,res){
		fileHandler.upPath(this.folderPath, currentPath, function(newPath){
			this.currentPath = newPath;
			fileHandler.readPath(this.currentPath, function(data){
				dictionary = data;
				res.send(data);
			});
		});
	}); 


router.get('/play/:songId', function (req, res) {

	if (this.audio != null){
	 	this.audio.kill()
	}

	var datos = req.params.songId;
	res.send(dictionary["files"][datos]);
	var modified = dictionary["files"][datos].split(' ').join(" ");
	console.log("modified", modified);
	var path = this.currentPath.concat(modified);
	console.log("path ",path);


	this.audio = player.play(path, function(err){

	  if (err != null){
  		if (!err.killed){
			console.log("paRO LA MUSICA");
		}else{
		  	throw err
		}
	}else{
		console.log("termino la cancion");
		}
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


module.exports = router;
