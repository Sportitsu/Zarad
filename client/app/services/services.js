angular.module('zarad.services',[])

.factory('Auth',function($http){
	var signup=function(data){
		return $http({
			method: 'POST',
			url :'/api/user/signup',
			data: data
		})
		.then(function(resp){
			return resp.data;
		})
	}

	return{
		signup : signup
	}
})