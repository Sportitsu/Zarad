'use strict';
angular.module('zarad.tournament',[])

.controller('TournamentController',function($scope, $window, $location,Tournament){
	$scope.AllTournament={}
	$scope.AddTournament=function(){
		
		var fileBt=$('<input>').attr('type','file');
		fileBt.on('change',()=>{
		var file=fileBt[0].files[0];
		var reader=new FileReader();
		reader.addEventListener('load',()=>{
			var imgData=reader.result.slice(23);
			console.log("sdfds",imgData)
		})
		})
		//fileBt.click();
		//$scope.uploadToIMGUR('e5483dd45cb276b',)
		console.log($scope.tournament);
		Tournament.AddTournament($scope.tournament)
		.then(function(resp){
			$scope.getAllTournament();
			$location.path('/AllTournament');
		})
	}

	$scope.getAllTournament=function(){
		Tournament.getAllTournament()
		.then(function(AllTournament){
			$scope.AllTournament=AllTournament;
		})
	}
	$scope.getAllTournament();

	$scope.SearchAboutTournament=function(){
		$scope.massage=" ";
		Tournament.SearchAboutTournament($scope.tournament.search)
		.then(function(tournament){
 				$scope.tournament.name=tournament.data.name;
 				$scope.tournament.place=tournament.data.place;
 				$scope.tournament.details=tournament.data.details;
 				$scope.tournament.organizer=tournament.data.organizer;
 				$scope.tournament.Date=tournament.data.Date;
 				$scope.tournament.poster=tournament.data.poster;
		}).catch(function(error){
			$scope.massage="Tournament Not Found";
		})
	}
	$scope.EditTournament=function(){
		Tournament.EditTournament($scope.tournament).
		then(function(tournament){
			$scope.Empty();
			console.log(tournament)
		})
	}
	$scope.DeleteTournament=function(){
		Tournament.DeleteTournament({name:$scope.tournament.search})
		.then(function(resp){
			$scope.Empty();
 			$scope.tournament.search=" "
			console.log(resp)
		})
	}
	//To make the input filed empty
 	$scope.Empty=function(){
 		$scope.tournament.name=" ";
 	 	$scope.tournament.place=" ";
 		$scope.tournament.details=" ";
 		$scope.tournament.organizer=" ";
 		$scope.tournament.Date=" ";
 		$scope.tournament.poster=" ";
 	}

 	$scope.uploadToIMGUR = function(client_id, imgData, callback) {

	$.ajax({
		url: 'https://api.imgur.com/3/image',
		headers: {
			'Authorization': 'Client-ID ' + client_id,
			'Accept': 'application/json'
		},
		type: 'POST',
		data: {
			'image': imgData,
			'type': 'base64'
		},
		success: function success(res) {

			if (callback) {
				callback(res.data);
			}
		}
	});
};

})

var fileBt = $('<input>').attr('type','file');
		fileBt.on('change', () => {
			var file = fileBt[0].files[0];
			var reader = new FileReader();
			reader.addEventListener('load', ()=>{
				var imgData = reader.result.slice(23);
				// sending the decoded image to IMGUR to get a link for that image
				uploadToIMGUR(IMGUR_CLIENT_ID, imgData, function(result){
					$scope.user.image = result.link;
					$scope.changedFlag = true;
				});
			})
			// using the reader to decode the image to base64
			reader.readAsDataURL(file);
		})
		fileBt.click();
