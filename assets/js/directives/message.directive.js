'use strict';
(function () {
    var message = function(){
    return{
        scope:{
            message: '=data' 
        },
//        template: '<div> {{ message.message }} <comments data="message.comments"> <comments> </div>',
        template: '<article class="row"><div class="col-md-2 col-sm-2 hidden-xs"><figure class="thumbnail"><img class="img-responsive" src="http://www.keita-gaming.com/assets/profile/default-avatar-c5d8ec086224cb6fc4e395f4ba3018c2.jpg" /><figcaption class="text-center">{{message.owner.username}}</figcaption></figure></div><div class="col-md-10 col-sm-10"><div class="panel panel-default arrow left"><div class="panel-body"><header class="text-left"><div class="comment-user"><i class="fa fa-user"></i> {{message.owner.username}}</div><time class="comment-date" datetime="16-12-2014 01:05"><i class="fa fa-clock-o"></i> {{message.createdAt}} </time></header><div class="comment-post"><p>{{ message.message }}</p><p class="text-right"><textarea class="form-control msg_box"></textarea><a href="#" class="btn btn-default btn-sm"><i class="fa fa-reply"></i> reply</a></p></div></div></div></article> <div ng-repeat="comment in message.comments">  <comment data="comment"></comment> </div>',
        link:function(scope,element,attributes){

            }
        }
    }
    
   app.directive('message', message); 
}());
