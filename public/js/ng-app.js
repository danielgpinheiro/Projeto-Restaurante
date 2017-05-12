var app = angular.module("app", [
    "ngSanitize",
    "ngRoute",
]);

app.config(function($interpolateProvider){
	//Enable cross domain calls
    $interpolateProvider.startSymbol('<#').endSymbol('#>');
});
