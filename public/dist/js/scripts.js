var app=angular.module("app",["ngSanitize","ngRoute"]);app.config(["$interpolateProvider","$httpProvider",function(e,o){o.defaults.useXDomain=!0,delete o.defaults.headers.common["X-Requested-With"]}]);var popupBehavior=function(e){"open"==e&&($("section.popup").css({display:"block"}),setTimeout(function(){$("section.popup").addClass("open"),$("section.popup .inner-content").addClass("open"),$("html, body").addClass("overflowHidden")},10)),"close"==e&&($("html, body").removeClass("overflowHidden"),$("section.popup").removeClass("open"),$("section.popup .inner-content").removeClass("open"),setTimeout(function(){$("html, body").removeClass("overflowHidden"),$("section.popup").css({display:"none"})},300))};$(document).ready(function(){picturefill(),$("#open-popup").click(function(e){e.preventDefault(),popupBehavior("open")}),$("#close-popup").click(function(e){e.preventDefault(),popupBehavior("close")})}),app.value("config",{baseUrl:"http://localhost:8080",regEmail:/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/}),app.value("elasticCosts",{cpu:.05376,ram:.05376,storage:.0012,snapshot:.0012,firewall:.08857,loadBalancer:.11948,vlan:.11008,staticIP:.00927,winServer:.02217,mssqlWeb:.06357,mssqlStandard:.70379}),app.value("plansOptions",{plans:[{elasticLight:[{description:"Plano anual: R$ 570,36 (Economia de R$ 244,44**)",value:"https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_LIGHT_12_MESES"},{description:"Plano semestral: R$ 325,92 (Economia de R$ 81,48**)",value:"https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_LIGHT_6_MESES"},{description:"Plano trimestral: R$ 183,33 (Economia de R$ 20,37**)",value:"https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_LIGHT_3_MES"},{description:"Plano mensal: R$ 67,90",value:"https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_LIGHT_1_MES"}],elasticOneHundred:[{description:"Plano anual: R$ 917,04 (Economia de R$ 161,76**)",value:"https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_100_12_MESES"},{description:"Plano semestral: R$ 485,46 (Economia de R$ 53,94**)",value:"https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_100_6_MESES"},{description:"Plano trimestral: R$ 256,23 (Economia de R$ 13,47**)",value:"https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_100_3_MESES"},{description:"Plano mensal: R$ 89,90",value:"https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_100_1_MES"}],elasticTwoHundred:[{description:"Plano anual: R$ 1.733,04 (Economia de R$ 305,76**)",value:"https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_200_12_MESES"},{description:"Plano semestral: R$ 917,46 (Economia de R$ 101,94**)",value:"https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_200_6_MESES"},{description:"Plano trimestral: R$ 484,23 (Economia de R$ 25,47**)",value:"https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_200_3_MESES"},{description:"Plano mensal: R$ 169,90",value:"https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_200_1_MES"}],elasticFiveHundred:[{description:"Plano anual: R$ 4.079,04 (Economia de R$ 719,76**)",value:"https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_500_12_MESES"},{description:"Plano semestral: R$ 2.159,46 (Economia de R$ 239,94**)",value:"https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_500_6_MESES"},{description:"Plano trimestral: R$ 1.139,73 (Economia de R$ 59,97**)",value:"https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_500_3_MESES"},{description:"Plano mensal: R$ 399,90",value:"https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_500_1_MES"}],elasticThousand:[{description:"Plano anual: R$ 7.649,46 (Economia de R$ 1.349,76**)",value:"https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_1000_12_MESES"},{description:"Plano semestral: R$ 4.049,46 (Economia de R$ 449,94**)",value:"https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_1000_6_MESES"},{description:"Plano trimestral: R$ 2.137,23 (Economia de R$ 112,47**)",value:"https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_1000_3_MESES"},{description:"Plano mensal: R$ 749,90",value:"https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_1000_1_MES"}]}]}),app.config(["$routeProvider",function(e){e.when("/planos",{templateUrl:"/elastic/plans",controller:"plansController"}).when("/simulador",{templateUrl:"/elastic/simulator",controller:"simulatorController"}).when("/beneficios",{templateUrl:"/elastic/benefits"}).when("/duvidas-frequentes",{templateUrl:"/elastic/faq"}).when("/",{templateUrl:"/shared/blank",controller:"homeController"})}]),app.controller("restaurantController",["$scope","$http","$timeout","config","$window",function(e,o,t,a,l){e.items=[],e.restaurant=[],e.getAll=function(){o.get("/restaurant_data").success(function(o,t){e.items=o.data})},e.add=function(t){var a={name:t.name,timestamp:(new Date).getTime()};o.post("/restaurant",a).then(function(o,t){e.getAll(),delete e.restaurant,popupBehavior("close")},function(e){alert("Ocorreu um erro, tente novamente"),console.log(e)})},e["delete"]=function(t){o["delete"]("/restaurant/"+t).success(function(o,t){e.getAll()})},e.update=function(t){console.log(t);var a=t._id,l={name:t.name,timestamp:(new Date).getTime()};o.put("/restaurant/"+a,l).then(function(o,t){e.getAll(),delete e.restaurant,popupBehavior("close")},function(e){alert("Ocorreu um erro, tente novamente"),console.log(e)})},e.edit=function(o,t){popupBehavior("open"),e.restaurant._id=o,e.restaurant.name=t},e.cancel=function(o){o.preventDefault(),delete e.restaurant,popupBehavior("close")},e.getAll()}]);