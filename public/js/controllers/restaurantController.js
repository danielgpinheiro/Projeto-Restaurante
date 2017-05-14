app.controller("restaurantController", function($scope, $http, $timeout, config, $window) {
	$scope.items = []
	$scope.restaurant = []

	$scope.getAll = function() {
		$http.get('/restaurant_data').success(function(response, status) {
			$scope.items = response.data
		})
	}

	$scope.add = function(data) {
		var restaurant = {
			"name": data.name,
			"timestamp": new Date().getTime()
		}

		$http.post('/restaurant', restaurant).then(function(response, status) {
			$scope.getAll()
			delete $scope.restaurant;
			popupBehavior('close')
		}, function(e) {
			alert('Ocorreu um erro, tente novamente')
			console.log(e)
		});
	}

	$scope.delete = function(id) {
		$http.delete('/restaurant/'+id).success(function(response, status) {
			$scope.getAll()
		})
	}

	$scope.update = function(data) {
		console.log(data)
		var id = data._id
		var restaurant = {
			"name": data.name,
			"timestamp": new Date().getTime()
		}

		$http.put('/restaurant/'+id, restaurant).then(function(response, status) {
			$scope.getAll()
			delete $scope.restaurant;
			popupBehavior('close')
		}, function(e) {
			alert('Ocorreu um erro, tente novamente')
			console.log(e)
		});
	}

	$scope.edit = function(id, name) {
		popupBehavior('open')

		$scope.restaurant._id = id
		$scope.restaurant.name = name
	}

	$scope.cancel = function(e) {
		e.preventDefault()
		delete $scope.restaurant;
		popupBehavior('close')
	}

	$scope.getAll()
})
