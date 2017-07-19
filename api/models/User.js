/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {

  attributes: { 
     name: 'STRING',
     age : 'STRING',
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

    // Hash password
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return cb(err);
      values.password = hash;
      cb();
    });
  }

};

