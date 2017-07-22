'use strict';
(function () {
    var comment = function(){
    return{
        scope:{
            comment: '= data' 
        },
        //template: '<ul><li class="" ng-repeat="comment in comments">{{ comment.comment }}</li></ul>',
        template: '<article class="row"><div class="col-md-2 col-sm-2 col-md-offset-1 col-sm-offset-0 hidden-xs"><figure class="thumbnail"><img class="img-responsive" src="http://www.keita-gaming.com/assets/profile/default-avatar-c5d8ec086224cb6fc4e395f4ba3018c2.jpg" /><figcaption class="text-center">{{comment.owner.username}}</figcaption></figure></div> <div class="col-md-9 col-sm-9"><div class="panel panel-default arrow left"><div class="panel-heading right">Reply</div><div class="panel-body"><header class="text-left"><div class="comment-user"><i class="fa fa-user"></i> {{comment.owner.username}}</div><time class="comment-date" datetime="{{ comment.createdAt }}"><i class="fa fa-clock-o"></i> {{ comment.createdAt }}</time></header><div class="comment-post"><p>{{ comment.comment }}</p></div></div></div></div></article>',
        link:function(scope,element,attributes){

            }
        }
    }
    
   angular.module('mgr').directive('comment', comment); 
}());