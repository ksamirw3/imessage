/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {

  attributes: { 
     username: {
      type: 'STRING',
      unique: true,
      required: true
    },    
     email : {
      type: 'STRING',
    },
     password: {
      type: 'STRING',
      minLength: 6,
      required: true
    },

    messages: {
      collection: 'message',
      via: 'owner'
    }
  },

   beforeCreate: function (values, cb) {
       
       User.findOneByUsername(values.username).exec(function(err, user) {
        if (user)
            return cb({ValidationError: {username: [{rule: 'taken'}]}});
    
       // Hash password
        bcrypt.hash(values.password, 10, function(err, hash) {
          if(err) return cb(err);
          values.password = hash;
          cb();
        });
        
    });

  }

};

