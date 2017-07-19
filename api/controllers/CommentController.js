/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) {

		Comment.find().exec(function(err, comments) {

			return res.json(comments);

		});

	},

	create: function (req, res) {
	
        if(req.method=="POST")
	{
	   
	   Comment.create(req.param("Comment")).exec(function(err,comment){
	     
	      
	      // Error handling
		if (err) {
		//  return console.log(err);

		console.log(err);
		    res.send("Error");

		}else {
		     
		  return res.json(comment);
		}
	     
	     
	  });
	 
	}
	else
	{
	  
	  // bad request
	}
	},
};

