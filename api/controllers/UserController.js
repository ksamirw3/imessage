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

        if (req.method == "POST")
        {
            UserService.createUser(req.param("User"))

                    .then(user => {
                        sails.log.info('user: ', user);
                        return res.json(user);
                    })

                    .catch(err => {

                        sails.log.error('result: ', err);
                        res.json({msg:'username already taken'}, 400);
                    });

        }

    },

    login: function (req, res) {
        
        if (req.method == "POST")
        {
            
            UserService.auth(req.param("User"))

                    .then(user => {
                        
                        if(user){
                            sails.log.info('user: ', user);
                            return res.json(user);
                        }else{
                            sails.log.info('invalid user: ');
                            res.json({msg:'Invalid Username'}, 400);
                        }
                    })

                    .catch(err => {

                        sails.log.error('result: ', err);
                        res.serverError('UNHANDLED_ERROR');
                    });

        }
    }


};

