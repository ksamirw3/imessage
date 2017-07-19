/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index: function (req, res) {

//		User.find().populate('messages').exec(function(err, users) {
//
//			return res.json(users);
//
//		});

            UserService.findAllUsers()
            .then(users => {
                sails.log.info('users: ', users);

                return res.json(users);
              })

            .catch(err => {
                
                sails.log.error('result: ', err);
            });

	},

	create: function (req, res) {
	
        if(req.method=="POST")
	{
	  
//	  console.log('user:', req.param("User"));
//	   User.create(req.param("User")).exec(function(err,user){
//	     
//	      
//	      // Error handling
//		if (err) {
//		//  return console.log(err);
//
//		console.log(err);
//		    res.send("Error");
//
//		// The User was created successfully!
//		}else {
//		     
//		  return res.json(user);
//		}
//	     
//	     
//	  });


            UserService.createUser(req.param("User"))
            
            .then(user => {
                sails.log.info('user: ', user);
                return res.json(user);
            })
              
            .catch(err => {
                
                sails.log.error('result: ', err);
            });
	 
	}
       
  },

	
};

