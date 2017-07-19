/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index: function (req, res) {

		Message.find().populate('comments').exec(function(err, messages) {

			return res.json(messages);

		});

	},

	create: function (req, res) {
	
        if(req.method=="POST")
	{
	   
	   Message.create(req.param("Message")).exec(function(err,message){
	     
	      
	      // Error handling
		if (err) {
		//  return console.log(err);

		console.log(err);
		    res.send("Error");

		// The User was created successfully!
		}else {
		     
		  return res.json(message);
		}
	     
	     
	  });
	 
	}
	else
	{
	  
	  // bad request
	}
 
       
  },

	
};


