app.controller("dishesController", function($scope, $http, $timeout, config, $window, $filter) {
	$scope.items = []
	$scope.dishes = []
  $scope.restaurants = []
  $scope.restaurant = null

	$scope.getAll = function() {
		$http.get('/dishes_data').success(function(response, status) {
			$scope.items = response.data
		})
		$http.get('/restaurant_data').success(function(response, status) {
			$scope.restaurants = response.data
		})
	}

  $scope.add = function(data) {
		var dishes = {
			"name": data.name,
      "price": data.price,
			"timestamp": new Date().getTime(),
      "restaurant": { "_id": $scope.restaurant._id }
		}

		$http.post('/dishes', dishes).then(function(response, status) {
			$scope.getAll()
	    $scope.cancel()
			popupBehavior('close')
		}, function(e) {
			alert('Ocorreu um erro, tente novamente')
			console.log(e)
		});
	}

  $scope.update = function(data) {
		var id = data._id
    var dishes = {
			"name": data.name,
      "price": data.price,
			"timestamp": new Date().getTime(),
      "restaurant": { "_id": $scope.restaurant._id }
		}

		$http.put('/dishes/'+id, dishes).then(function(response, status) {
			$scope.getAll()
      $scope.cancel()
			popupBehavior('close')
		}, function(e) {
			alert('Ocorreu um erro, tente novamente')
			console.log(e)
		});
	}

  $scope.delete = function(id) {
		$http.delete('/dishes/'+id).success(function(response, status) {
			$scope.getAll()
		})
	}

  $scope.setRestaurant = function(data) {
    $scope.restaurant = data
  }

  $scope.edit = function(id, name, restaurant_id) {
		popupBehavior('open')

		$scope.dishes._id = id
		$scope.dishes.name = name

		var selected = $filter('filter')($scope.restaurants, { "_id": restaurant_id });
		$scope.selected = selected[0]
	}

  $scope.cancel = function(e) {
		if(e)
			e.preventDefault()

    if($scope.selected) {
      $scope.selected = $scope.selected[0]
    }

		$scope.dishes.name = null;
		$scope.dishes._id = null;
		popupBehavior('close')
	}

	$scope.getAll()
})
