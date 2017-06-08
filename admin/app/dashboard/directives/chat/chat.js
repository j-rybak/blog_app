'use strict';


angular.module('admin.dashboard')
	.directive('chat',function(){
		return {
        templateUrl:'/admin_app/app/dashboard/directives/chat/chat.html',
        restrict: 'E',
        replace: true,
    	}
	});


