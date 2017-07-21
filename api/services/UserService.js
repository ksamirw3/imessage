/**
 * UserService
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    findAllUsers: function () {
        return User.find();
    },
    
    createUser: function (user) {
       return User.create(user);
    },
    
    auth: function (user) {
       return User.findOne({username:user['username']});
    },

};

