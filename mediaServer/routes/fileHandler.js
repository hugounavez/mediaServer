// This module handles file 
const fs = require('fs');

module.exports = {
  sayHelloInEnglish: function() {
    return "HELLO";
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
   usingItNow : function(callback) {
  	callback("si"); // I dont want to throw an error, so I pass null for the error argument
  }
};


	