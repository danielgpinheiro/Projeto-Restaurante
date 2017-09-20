app.controller("homeController", function($scope, $http, $timeout, config, $window) {
	$scope.items = []
	$scope.user = []
	$scope.query = []

	$scope.get = function(data) {
		$http.get('/user', data.id).success(function(response, status) {
			$scope.items = response.data
		})
	}

	$scope.add = function(data) {
		var user = {
			"name": data.name,
			"email": data.email,
			"pass": data.pass
		}

		$http.post('/user', user).then(function(response, status) {
			$scope.cancel()
		}, function(e) {
			alert('Ocorreu um erro, tente novamente')
			console.log(e)
		});
	}

	$scope.login = function(data) {
		var user = {
			"email": data.email,
			"pass": data.pass
		}

		$http.post('/login', user).success(function(response, status) {
			// $scope.items = response.data
			console.log(response)
		})
	}

	$scope.cancel = function(e) {
		if(e)
			e.preventDefault()

		$scope.user.name = null
		$scope.user.email = null
		$scope.user.pass = null
		$scope.user._id = null
		popupBehavior('close')
	}
})
