/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index: function (req, res) {

		User.find().populate('messages').exec(function(err, users) {

			return res.json(users);

		});

	},

	create: function (req, res) {
	
        if(req.method=="POST")
	{
	  
	  console.log('user:', req.param("User"));
	   
	   User.create(req.param("User")).exec(function(err,user){
	     
	      
	      // Error handling
		if (err) {
		//  return console.log(err);

		console.log(err);
		    res.send("Error");

		// The User was created successfully!
		}else {
		     
		  return res.json(user);
		}
	     
	     
	  });
	 
	}
	else
	{
	  
	  // bad request
	}
 
       
  },

	
};

