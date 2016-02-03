// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', ['$scope', function($scope) {

	$scope.tagline = 'To the moon and back!';

	document.getElementById('btn-login').addEventListener('click', function() {
		lock.show(function(err, profile, token) {
			if (err) {
				console.error("Something went wrong: ", err);
			} else {
				localStorage.setItem('userToken', token);
				localStorage.setItem('userProfile', JSON.stringify(profile));
			}
		});
	});

}]);
