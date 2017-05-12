app.config(function ($routeProvider) {
    $routeProvider
    .when("/planos", {
        templateUrl: "/elastic/plans",
        controller: "plansController"
    })
    .when("/simulador", {
        templateUrl: "/elastic/simulator",
        controller: "simulatorController"
    })
    .when("/beneficios", {
        templateUrl: "/elastic/benefits"
    })
    .when("/duvidas-frequentes", {
        templateUrl: "/elastic/faq"
    })
    .when("/", {
        templateUrl: "/shared/blank",
        controller: "homeController"
    });
});
