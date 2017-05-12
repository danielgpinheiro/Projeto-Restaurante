app.controller("questionsController", function($scope, $http, $timeout, config, $window) {
	$scope.regEmail = config.regEmail;

	$scope.send = function(question) {
		$scope.sending = true;
		$scope.submitted = true;

		$http.post("/contacts/send", question).success(function(data, status) {
			$scope.sending = false;
			//$scope.submitted = false;
			$scope.questionForm.$setPristine();
			delete $scope.question;
			$scope.statusClass = "success";
			
			$timeout(function() {
                $scope.message = "";
                popupBehavior('close');
            }, 2000);
		}).error(function(data, status) {
			$scope.sending = false;
			$scope.message = "Ocorreu um erro ao enviar, tente novamente";
			$scope.statusClass = "failed";
		});
	};
});
