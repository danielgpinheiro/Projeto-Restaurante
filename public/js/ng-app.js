var app = angular.module("app", [
    "ngSanitize",
    "ngRoute",
]);

app.config(function($interpolateProvider, $httpProvider){
	//Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
