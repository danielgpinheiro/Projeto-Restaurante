app.controller("plansController", function($scope, $http, $timeout, config, $window, $compile, plansOptions) {
    $scope.plansOptions = plansOptions.plans[0];
    
	if(larguraTela >= 998) {
		var plansContainer = document.querySelectorAll("section.plans")[0];
    	var plansList = document.querySelectorAll("ul.plans-list")[0];

		plansContainer.style.height = plansList.offsetHeight + 80 + "px";

		$scope.listShowing = 1;
	}

	$scope.openPlanList = function(id) {
		var planHtml = $("#" +id);
		var popupView = $("#popup-view");

		$("section.popup").addClass("plans");
        $("#popup-view").addClass("plans-list");

		popupBehavior("open");

		$timeout(function() {
			popupView.html($compile(planHtml.html())($scope));
		}, 300);
		
		$timeout(function() {
            popupView.addClass("loaded");
        }, 600);
	};

	$scope.openUrl = function(url) {
		$window.open(url, '_blank');
	};
});
