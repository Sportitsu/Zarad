angular.module('zarad.services',[])

.factory('Auth',function($http){
	var siginin=function(data){
		return $http({
			method: 'POST',
			url : '',
			data: data
		})
		.then(function(resp){
			return resp.data;
		})
	}

	return{
		siginin: siginin
	}
})