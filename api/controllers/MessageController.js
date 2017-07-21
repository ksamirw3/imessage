/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index: function (req, res) {

		Message.find().populate('comments').populate('owner').sort('createdAt DESC').exec(function(err, messages) {

			

			async.each(messages, function (message, callback) {
				

				async.each(message.comments, function (comment, callback) {
					// console.log('comment: ', comment);


					var populateTasks = {
                        user: function (cb) {
                            User.findOne({ select: ['name'], id: comment.owner })
                                .exec(function (err, result) {

                                    // console.log('owner: ', result);
                                    cb(err, result);
                            });
                            }
	                }

	                async.parallel(populateTasks, function (err, resultSet) {
	                    if (err) { return next(err); }

	                    comment.owner = resultSet.user;

	                    callback();
	                });

				}, function (err) {
                if (err) { return next(err); }

                	callback();
            	});	


			}, function (err) {// final callback
                if (err) { return next(err); }

                return res.json(messages);
            });

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
                    
                    Message.findOne(message.id).populate('comments').populate('owner').exec(function(err,message){
                        
                        sails.sockets.broadcast('feed', 'new_message', message);
                        
                        return res.json(message);	
                    });
		     
		  
		}
	     
	     
	  });
	 
	}
	else
	{
	  
	  // bad request
	}
 
       
  },
  
    subscribe: function(req, res) {
        if( ! req.isSocket) {
          return res.badRequest();
        }

        sails.sockets.join(req.socket, 'feed');

        return res.ok();
      }
	
};


