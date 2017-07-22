'use strict';
(function () {
    var comments = function(){
    return{
        scope:{
            comments: '= data' 
        },
        template: '<ul><li class="" ng-repeat="comment in comments">{{ comment.comment }}</li></ul>',
        link:function(scope,element,attributes){

            }
        }
    }
    
   angular.module('mgr').directive('comments', comments); 
}());