app.controller("simulatorController", function($scope, $http, $timeout, config, $window, elasticCosts) {
    var defaultValues = function() {
        return {
            cpu: 1,
            ram: 0.5,
            storage: 15,
            snapshot: 0,
            staticIP: 0,
            firewall: 0,
            loadBalancer: 0,
            vlan: 0,
            staticIP: 0,
            winServer: 0,
            mssqlWeb: 0,
            mssqlStandard: 0
        }
    };

    var defaultSliderOptions = function() { return { showSelectionBar: true, interval: 2000, stepsArray: [] } };
    var alreadyScrolling = false;

    $scope.regEmail = config.regEmail;
    $scope.servers = [defaultValues()];
    $scope.elasticCosts = elasticCosts;
    $scope.stats = {
        calculated: false,
        elasticHour: 0,
        elasticExtra: 0,
        elasticMonth: 0,
        elasticPlanValue: 0,
        elasticPlanName: '',
        colorButton: ''
    };

    var initConfigs = function() {
        $scope.sliderOptions = { cpu: defaultSliderOptions(), ram: defaultSliderOptions(), storage: defaultSliderOptions(), snapshot: defaultSliderOptions(), staticIP: defaultSliderOptions() };

        //cpu
        for(i = 1; i <= 32; i++) { $scope.sliderOptions.cpu.stepsArray.push(i); }

        //ram
        $scope.sliderOptions.ram.stepsArray.push(0.5);
        for(i = 1; i <= 128; i++) { $scope.sliderOptions.ram.stepsArray.push(i); }

        //storage
        $scope.sliderOptions.storage.stepsArray.push(15);
        for(i = 2; i <= 500; i++) { $scope.sliderOptions.storage.stepsArray.push(i*10); }

        // //snapshot
        // for(i = 0; i <= 500; i++) { $scope.sliderOptions.snapshot.stepsArray.push(i*10); }

        //staticIP
        for(i = 0; i <= 20; i++) { $scope.sliderOptions.staticIP.stepsArray.push(i); }
    };

    var lincenseBehavior = function(index, key, oldValue) {
        if($scope.servers[index][key] && !oldValue[index][key]) {
            switch(key) {
                case "winServer":
                    $scope.servers[index].mssqlWeb = false;
                    $scope.servers[index].mssqlStandard = false;
                    break

                case "mssqlWeb":
                    $scope.servers[index].winServer = false;
                    $scope.servers[index].mssqlStandard = false;
                    break

                case "mssqlStandard":
                    $scope.servers[index].winServer = false;
                    $scope.servers[index].mssqlWeb = false;
                    break
            }
        }
    }

    var calculate = function(newValue, oldValue) {
        if($scope.daysInUse != null && $scope.hoursInDay != null) {
            var elasticHour = 0;

            $scope.servers.forEach(function(server, index) {
                for(var key in server) {
                    if(elasticCosts[key] && server[key]) {
                        if (key == 'winServer' || key == 'mssqlWeb' || key == 'mssqlStandard') {
                            lincenseBehavior(index, key, oldValue);
                            elasticHour += server[key] * (elasticCosts[key] * server['cpu']);
                        }
                        else if (key == 'snapshot')
                            elasticHour += server[key] * (elasticCosts[key] * server['storage']);
                        else
                            elasticHour += elasticCosts[key] * server[key];
                    }
                }
            });

            $scope.stats.elasticHour = elasticHour;
            $scope.stats.elasticMonth = $scope.stats.elasticHour * $scope.daysInUse * $scope.hoursInDay;
            $scope.elasticTotal = $scope.stats.elasticMonth + $scope.stats.elasticExtra;

            if($scope.stats.elasticMonth < 100) {
                $scope.stats.elasticPlanName = 'Elastic Light';
                $scope.stats.elasticPlanValue = 75;
                $scope.linkToBuy = "https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_LIGHT_1_MES";
            }

            else if($scope.stats.elasticMonth >= 100 && $scope.stats.elasticMonth <= 189) {
                $scope.stats.elasticPlanName = 'Elastic 100';
                $scope.stats.elasticPlanValue = 100;
                $scope.linkToBuy = "https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_100_1_MES"
            }

            else if($scope.stats.elasticMonth >= 189 && $scope.stats.elasticMonth <= 471) {
                $scope.stats.elasticPlanName = 'Elastic 200';
                $scope.stats.elasticPlanValue = 200;
                $scope.linkToBuy = "https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_200_1_MES"
            }

            else if($scope.stats.elasticMonth >= 471 && $scope.stats.elasticMonth <= 938) {
                $scope.stats.elasticPlanName = 'Elastic 500';
                $scope.stats.elasticPlanValue = 500;
                $scope.linkToBuy = "https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_500_1_MES"
            }

            else if($scope.stats.elasticMonth > 938) {
                $scope.stats.elasticPlanName = 'Elastic 1000';
                $scope.stats.elasticPlanValue = 1000;
                $scope.linkToBuy = "https://loja.cloudalgartelecom.com.br/index.php?redirect=ELASTIC_1000_1_MES"
            }

            var diff = $scope.stats.elasticMonth - $scope.stats.elasticPlanValue;

            if(diff <= 0)
                $scope.stats.elasticExtra = 0;
            else
                $scope.stats.elasticExtra = numberFormat(diff, 0, ',', '.');

            $scope.stats.elasticHour = numberFormat($scope.stats.elasticHour, 3, ',', '.');
            $scope.stats.elasticMonth = numberFormat($scope.stats.elasticMonth, 0, ',', '.');

            if(!$(".footer-collapse").hasClass("active") && larguraTela >= 998) {
                $(".footer-collapse").trigger("click");
            }

            if(!alreadyScrolling) {
                alreadyScrolling = true;
                var offset = $("section.simulator form.times").offset();

                TweenMax.to(window, 0.5, { scrollTo:{y:offset.top, x:0 } });
            }

            $scope.stats.calculated = true;
            $scope.$broadcast('rzSliderForceRender');

            var simulator = { servidores: $scope.servers, diasEmUso: $scope.daysInUse, horasPorDia: $scope.hoursInDay, elasticHora: $scope.stats.elasticHour, elasticMes: $scope.stats.elasticMonth, elasticPlano: $scope.stats.elasticPlanName, elasticValor: $scope.stats.elasticPlanValue, elasticExtra: $scope.stats.elasticExtra }
            localStorage.setItem('simulator', JSON.stringify(simulator));

            if($scope.elasticTotal < 1000) {
                $scope.stats.colorButton = 'contract';
            }

            else if($scope.elasticTotal > 1000) {
                $scope.stats.colorButton = 'consulting';
            }
        }

        else {
            $scope.stats.calculated = false;
            alreadyScrolling = false;

            localStorage.setItem('simulator', null);
        }
    };

    $scope.addServer = function() {
        var offset = $("ul.servers").offset();

        if(larguraTela >= 998) {
            TweenMax.to(window, 0.5, { scrollTo:{y:offset.top - 65, x:0 } });

            $scope.servers.push(defaultValues());
            $scope.pluginsInit();
        }

        if(larguraTela <= 997) {
            TweenMax.to(window, 0.5, { scrollTo:{y:offset.top - 90, x:0 } });

            $timeout(function () {
                $scope.servers.push(defaultValues());
                $scope.pluginsInit();
            }, 510);
        }
    };

    $scope.removeServer = function(id) {
        if (window.confirm("Tem certeza que deseja remover esse servidor?")) {
            $scope.servers.splice(id, 1);
        }
    };

    $scope.pluginsInit = function() {
        $timeout(function () {
            tooltip();
        }, 10);
    };

    $scope.buy = function() {
        if($scope.stats.elasticExtra != 0) {
            popupBehavior("open", ".simulator-popup");
        }
        else {
            $window.open($scope.linkToBuy);
        }
    };

    $scope.$watch('servers', calculate, true);
    $scope.$watch('daysInUse', calculate, true);
    $scope.$watch('hoursInDay', calculate, true);

    $scope.pluginsInit();
    initConfigs();

    $("#footer").addClass("hidden");
});
