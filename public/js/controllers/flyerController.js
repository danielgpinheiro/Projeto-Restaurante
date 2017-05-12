app.controller("flyerController", function($scope, $http, $timeout, config, $window, plansOptions) {
    $scope.regEmail = config.regEmail;

    var GetURLParameter = function(sParam) {
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++) {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == sParam) {
                    return sParameterName[1];
                }
            }
        };

    $scope.utm = {
        source: GetURLParameter('utm_source'),
        medium: GetURLParameter('utm_medium'),
        campaign: GetURLParameter('utm_campaign')
    };

    $scope.send = function(newsletter) {
        $scope.sending = true;

        var completeCallback = function(data, status, headers, config) {
            if (data.status == 200 && data.statusText == "load")
                successCallback(data, status, headers, config);
            else
                errorCallback(data, status, headers, config);
        };

        var successCallback = function(data, status, headers, config) {
            $scope.sending = false;
            $scope.newsletterForm.$setPristine();
            delete $scope.newsletter;
            $scope.message = "Enviado com sucesso!";
            $scope.statusClass = "success";
            $timeout(function() {
                $scope.message = "";
            }, 6000);
            $scope.$apply();
        };

        var failureCallback = function(data, status, headers, config) {
            $scope.sending = false;
            $scope.message = "Ocorreu um erro ao enviar, tente novamente.";
            $scope.statusClass = "failed";
            $timeout(function() {
                $scope.message = "";
            }, 6000);
            $scope.$apply();
        };

        var data = {
            name: "",
            email: newsletter.email,
            elqFormName: "LandingPageCorporativo",
            elqSiteId: "1656554376",
            elqCustomerGUID: newsletter.guid,
            elqCookieWrite: 0,
            utm_source: $scope.utm.source,
            utm_medium: $scope.utm.medium,
            utm_campaign: $scope.utm.campaign
        };

        $.ajax({
            url: "https://s1656554376.t.eloqua.com/e/f2",
            type: "POST",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            data: data,
            dataType: "jsonp",
            complete: completeCallback,
            failure: failureCallback
        });
    };
});
