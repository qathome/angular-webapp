angular.module('qathome')
    .controller('SettingsCtrl', function($scope, $http, $routeParams, $timeout, Identity) {
        $scope.page = 'settings';
        var firmId = $routeParams.firmId;

        function setupCheckboxes(firm) {
            var emissioneAttivaOnlineEl = $("[name='emissioneAttivaOnline']");
            var emissioneAttivaTotemEl = $("[name='emissioneAttivaTotem']");
            var prenotazioniEl = $("[name='emissioneAttivaPrenotazioni']");

            emissioneAttivaOnlineEl.bootstrapSwitch({
                onText: 'Attivata',
                offText: 'Disattivata',
                onSwitchChange: function (event, state) {
                    apriChiudiFirm('open_now_online', state);
                }
            });
            emissioneAttivaTotemEl.bootstrapSwitch({
                onText: 'Attivata',
                offText: 'Disattivata',
                onSwitchChange: function (event, state) {
                    apriChiudiFirm('open_now_printer', state);
                }
            });
            prenotazioniEl.bootstrapSwitch({
                onText: 'Attivata',
                offText: 'Disattivata',
                onSwitchChange: function (event, state) {
                    apriChiudiFirm('enable_book', state);
                }
            });

            $scope.$watch('emissioneAttivaOnline', function (val) {
                if (val == null) return;
                emissioneAttivaOnlineEl.bootstrapSwitch('state', val)
            });

            $scope.$watch('emissioneAttivaTotem', function (val) {
                if (val == null) return;
                emissioneAttivaTotemEl.bootstrapSwitch('state', val)
            });

            $scope.$watch('emissioneAttivaPrenotazioni', function (val) {
                if (val == null) return;
                prenotazioniEl.bootstrapSwitch('state', val)
            });

            function apriChiudiFirm(name, state) {
                var params = {};
                params[name] = state;
                $http.patch(firm.url, params)
                    .success(function (res, status) {
                        $scope.fetchFirmStatus();
                    })
                    .error(defaultError);
            }
        }

        Identity.getMeAndFirm(firmId, function (me, firm) {

            // Senza il timeout non compaiono gli slide-button
            $timeout(function() {
                setupCheckboxes(firm);
            });

            $scope.fetchFirmStatus = function() {
                $http.get(firm.url)
                    .success(function (data, status) {
                        firm = data;
                        $scope.firm = data;
                        $scope.firmAttiva = (firm.state === 'O');
                        $scope.queues = firm.queues;
                        $scope.desks = firm.desks;

                        $scope.emissioneAttivaOnline = firm.open_now_online;
                        $scope.emissioneAttivaTotem = firm.open_now_printer;
                        $scope.emissioneAttivaPrenotazioni = firm.enable_book;

                        $scope.$broadcast('fetchFirmStatus', firm);
                    });
            };

            $scope.aggiungiTotem = function() {
                var params = {};
                $http.post(firm.publicpcs_url, params)
                    .success(function(res, status) {
                        if($scope.nuovoTotem) {
                            $scope.firm.publicpcs.push($scope.nuovoTotem);
                        }
                        $scope.nuovoTotem = res;
                    })
                    .error(defaultError);
            };

            $scope.salvaAttivita = function() {
                var params = {
                    name: firm.name,
                    description: firm.description,
                    url_name: firm.url_name
                };
                $http.patch(firm.url, params)
                    .success(function(res, status) {
                        console.log(res)
                        $scope.attivitaError = {};
                        $scope.attivitaFatto = true;
                    })
                    .error(function(res, status) {
                        $scope.attivitaError = res;
                        $scope.attivitaFatto = false;
                    });
            };

            $scope.saveQueue = function(queue) {
                var params = {
                    letter: queue.letter,
                    name: queue.name,
                    description: queue.description
                };
                $http.patch(queue.url, params)
                    .success(function(res, status) {
                        console.log(res);
                        queue._fatto = true;
                        queue._error = {};
                    })
                    .error(function(res) {
                        queue._error = res;
                        queue._fatto = false;
                    });
            };

            $scope.addQueue = function(queue) {
                var params = {
                    letter: queue.letter,
                    name: queue.name,
                    description: queue.description,
                    reset_now: false
                };
                $http.post(firm.queues_url, params)
                    .success(function(res, status) {
                        console.log(res);
                        queue._fatto = true;
                        queue._error = {};
                        resetObject(queue);
                        $scope.fetchFirmStatus();
                    })
                    .error(function(res) {
                        queue._error = res;
                        queue._fatto = false;
                    });
            };

            $scope.removeQueue = function(queue) {
                if(confirm("Sei sicuro di voler cancellare la coda " + queue.name + " ?")) {
                    $http.delete(queue.url)
                        .success(function() {
                            $scope.fetchFirmStatus();
                        });
                }
            };

            $scope.saveDesk = function(desk) {

                var patch = {
                    name: desk.name,
                    description: desk.description,
                    queue_choices: desk.queue ? desk.queue.letter : null
                };
                console.log(desk, patch)

                $http.patch(desk.url, patch)
                    .success(function(res) {
                        console.log(res);
                        desk._fatto = true;
                        desk._error = {};
                    })
                    .error(function(res) {
                        desk._error = res;
                        desk._fatto = false;
                    });
            };

            $scope.addDesk = function(desk) {
                var params = {
                    name: desk.name,
                    description: desk.description,
                    queue_choices: desk.queue ? desk.queue.letter : null
                };
                $http.post(firm.desks_url, params)
                    .success(function(res) {
                        desk._fatto = true;
                        desk._error = {};

                        resetObject(desk);
                        $scope.fetchFirmStatus();
                    })
                    .error(function(res) {
                        desk._error = res;
                        desk._fatto = false;
                    });
            };


            $scope.removeDesk = function(desk) {
                if(confirm("Sei sicuro di voler cancellare lo sportello " + desk.name + " ?")) {
                    $http.delete(desk.url)
                        .success(function() {
                            $scope.fetchFirmStatus();
                        });
                }
            };

            function resetObject(obj) {
                for(var k in obj) {
                    delete obj[k];
                }
            }

            //$scope.$watch('sportelliAttivi', function(val) {
            //    if(val == null) return;
            //    sportelliAttiviEl.bootstrapSwitch('state', val)
            //});
            //
            //$http.get('/api/v1/firms/')
            //    .success(function (data, status) {
            //        var firm = data.results[0];
            //        $scope.firm = firm;
            //        firmId = firm.url_id;
            //        $scope.sportelliAttivi = (firm.state === 'O');
            //    })

            $scope.fetchFirmStatus();
        });
    })

    .directive('calendariEmissioneOnline', function($http) {
        return {
            templateUrl: '/static/partials/settings/queues-calendar-table.html',
            scope: {

            },
            link: function ($scope) {
                var params = {
                    nomeEmissione: 'Emissione Online',
                    keyName: 'open_now_online',
                    queueKeyName: 'use_calendar_now_online',
                    weeklycalendarEnabler: 'O'                  // O = online
                };
                queuesCalendarTable(params, $scope, $http);
            }
        };
    })
    .directive('calendariTotem', function($http) {
        return {
            templateUrl: '/static/partials/settings/queues-calendar-table.html',
            scope: {

            },
            link: function ($scope) {
                var params = {
                    nomeEmissione: 'Emissione da Totem',
                    keyName: 'open_now_printer',
                    queueKeyName: 'use_calendar_now_printer',
                    weeklycalendarEnabler: 'P'                  // P = printer
                };
                queuesCalendarTable(params, $scope, $http);
            }
        };
    })
//    .directive('prenotazioni', function($http) {
//        return {
//            templateUrl: '/static/partials/settings/queues-calendar-table.html',
//            scope: {
//
//            },
//            link: function ($scope) {
//                var params = {
//                    nomeEmissione: 'Prenotazione',
//                    keyName: 'enable_book',
//                    queueKeyName: 'usa_calendar_enable_book',
//                    weeklycalendarEnabler: '
//                };
//                queuesCalendarTable(params, $scope, $http);
//            }
//        };
//    })

function queuesCalendarTable(params, $scope, $http) {

    $scope.nomeEmissione = params.nomeEmissione;

    $scope.fetchFirmStatus = function() {
        $scope.$parent.fetchFirmStatus();
    };

    $scope.$on('fetchFirmStatus', function(event, firm) {
        $scope.emissioneAttiva = firm[params.keyName];
        $scope.queues = firm.queues;
        console.log('emissioneAttiva', params.keyName, $scope.emissioneAttiva)
    });

    $scope.isQueueOpen = function(queue) {
        return queue[params.keyName];
    };

    $scope.openQueue = function(queue, open){
        var patch = {};

        patch[params.keyName] = open; //open_now_online

        console.log(patch);
        queue._loading = true;
        $http.patch(queue.url, patch)
            .success(function(res, status) {
                queue._loading = false;
                $scope.fetchFirmStatus();
            })
            .error(defaultError);
    };

    $scope.usaCalendarioAutomatico = function(queue) {
        var patch = {};
        patch[params.queueKeyName] = !queue[params.queueKeyName]; // ex: use_calendar_now_online
        console.log(patch);
        $http.patch(queue.url, patch)
            .success(function(res, status) {
                $scope.fetchFirmStatus();
            })
            .error(defaultError);
    };

    $scope.getUsaCalendario = function(queue) {
        return queue[params.queueKeyName]; // ex: use_calendar_now_online
    }

    var daysNames = ['Lunedi', 'Martedi', 'Mercoledi', 'Giovedi', 'Venerdi', 'Sabato', 'Domenica'];
    $scope.days = daysNames.map(function(name, i){
        return {
            name: name,
            value: i
        };
    });

    $scope.getCalendarForQueue = function(queueToFind) {
        return $scope.$parent.firm.weeklycalendars.filter(function(weeklycalendar) {
            return _.find(weeklycalendar.queues, function(queue){

                // Va bene il suo enabler, ma anche l'enabler 'A' che vuol dire che vale per tutti, All
                var enablerFilter = (weeklycalendar.enabler === params.weeklycalendarEnabler) || (weeklycalendar.enabler === 'A');

                //console.log(queue, params.weeklycalendarEnabler)

                return (queue.letter === queueToFind.letter) && enablerFilter;
            });
        });
    };

    $scope.getDayName = function(weeklycalendar) {
        return daysNames[weeklycalendar.weekday];
    };

    // Converte lo standard iso "1970-01-01T11:12:00.000Z" in Gastone-Time "11:12:00"
    function toGastoneTime(time) {
        return ("0" + time.getHours()).slice(-2)   + ":" +
            ("0" + time.getMinutes()).slice(-2) + ":" +
            ("0" + time.getSeconds()).slice(-2);
    }

    $scope.aggiungiGiorno = function(queue) {
        var patch = {
            weekday: queue._nuovo.weekday,
            time_start: toGastoneTime(queue._nuovo.time_start),
            time_stop: toGastoneTime(queue._nuovo.time_stop),
            queues_list: [queue.letter],
            enabler: params.weeklycalendarEnabler
        };
        $http.post($scope.$parent.firm.weeklycalendars_url, patch)
            .success(function(res, status) {
                console.log(res);
                $scope.fetchFirmStatus();
                queue._nuovo = {};
            })
            .error(defaultError);
    };

    $scope.rimuoviGiorno = function(weeklycalendar) {
        $http.delete(weeklycalendar.url)
            .success(function(res, status) {
                $scope.fetchFirmStatus();
            })
            .error(defaultError);
    };
}
