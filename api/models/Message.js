/**
 * Message.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	 message: {
      type: 'STRING'
    },
    owner: {
      model: 'User'
    },
    comments: {
      collection: 'comment',
      via: 'message'
    }

  },
  
  
//  afterCreate: function(message, cb) {
//    sails.sockets.broadcast('feed', 'new_message', message);
//    cb();
//  }
};

