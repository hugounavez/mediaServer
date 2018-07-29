// This module handles file 
const fs = require('fs');

module.exports = {
  example: function() {
    return "Hello";
  },

   readPath: function(path, callback){

	var counter = 0;
	dictionary = {"files":{}, "folders": {}};

	fs.readdir(path, (err, files) => {
		if (err) throw err;
		
		files.forEach(function(element){
			// Check if it is a file or directory
			var stats = fs.statSync(path.concat(element));
			
			if (stats.isFile()){
				dictionary["files"][counter] = element;	
			}else{
				dictionary["folders"][counter] = path.concat(element);
			}
			counter = counter + 1;
		}); // end forEach
		
		callback(dictionary);
	});
   },
	upPath: function(maximumPath, pathToBeChanged, callback){
	// This method receive a path to be cut, and also a path to assure 
	// the path isn't going to be outsite of the original folder. 
		if (maximumPath == pathToBeChanged){
			// The path is not changed
			callback(pathToBeChanged)
		}else{
			callback(pathToBeChanged.split('/').slice(0, -1).join('/').concat("/"));
		}
	
	}
};


	