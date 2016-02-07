"use strict";

function defaultError(data, status) {
    console.error('default error', data, status);
}

function getIdFromUrl(url) {
    var spl = url.split('/');
    return spl[spl.length-2];
}

angular.module('qathome')
    .config(function($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when('/app/logged', {
                templateUrl: 'static/partials/desks.html',
                controller: 'LoggedCtrl',
                reloadOnSearch: false
            })
            .when('/app/firmregister', {
                templateUrl: 'static/partials/firmregister.html',
                controller: 'FirmRegisterCtrl',
                reloadOnSearch: false
            })
            .when('/app/firms/:firmId/help', {
                templateUrl: 'static/partials/help.html',
                controller: 'HelpCtrl',
                reloadOnSearch: false
            })
            .when('/app/pay', {
                templateUrl: 'static/partials/pay.html',
                controller: 'PayCtrl',
                reloadOnSearch: false
            })
            .when('/app/firms/:firmId', {
                templateUrl: 'static/partials/desks.html',
                controller: 'DesksCtrl',
                reloadOnSearch: false
            })
            .when('/app/firms/:firmId/desks/:deskId', {
                templateUrl: 'static/partials/servi.html',
                controller: 'ServiCtrl',
                reloadOnSearch: false
            })
            .when('/app/firms/:firmId/tickets', {
                templateUrl: 'static/partials/pagina-emissione-biglietti.html',
                controller: 'PaginaEmissioneBigliettiCtrl',
                reloadOnSearch: false
            })
            .when('/app/firms/:firmId/settings', {
                templateUrl: 'static/partials/settings/settings.html',
                controller: 'SettingsCtrl',
                reloadOnSearch: false
            })

            // ########## PAGINE PUBBLICHE ##########

            .when('/app/search', {
                templateUrl: 'static/partials/search.html',
                controller: 'SearchCtrl',
                reloadOnSearch: false
            })
            .when('/:firm', {
                templateUrl: 'static/partials/stampa.html',
                controller: 'StampaCtrl',
                reloadOnSearch: false
            })
            .when('/app/firm/:firm', {
                templateUrl: 'static/partials/stampa.html',
                controller: 'StampaCtrl',
                reloadOnSearch: false
            })
            .when('/app/firm/:firm/public', {
                templateUrl: 'static/partials/pagina-pubblico.html',
                controller: 'PaginaPubblicaNonLoggatoCtrl',
                reloadOnSearch: false
            })
            .when('/app/firm/:firm/tickets/:ticketId', {
                templateUrl: 'static/partials/ticket.html',
                controller: 'TicketCtrl',
                reloadOnSearch: false
            })
            .when('/app/firm/:firm/scegliorario', {
                templateUrl: 'static/partials/scegli-orario.html',
                controller: 'StampaCtrl',
                reloadOnSearch: false
            })
            .otherwise({
                redirectTo: "/app/logged"
            });

        $locationProvider.html5Mode(true);

        // Diciamo di usare il cookie "csrftoken", Angular ne usa un altro di default
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

        //Setta il token in ogni richiesta fatta con $http
        $httpProvider.interceptors.push('HttpInjector');
    })
    .controller('TranslationCtrl', function($scope, $translate) {
        $scope.changeLanguage = function (key) {
            $translate.use(key);
        };
    })
    .controller('StampaCtrl', function($scope, $http, $routeParams, $location, $window, $rootScope, $timeout, $cookies) {
        var firmName = $routeParams.firm;

        var ticketId = $cookies.get('ticket-'+firmName);
        if(ticketId){
            var newPath = '/app/firm/' + firmName + '/tickets/' + ticketId;
            $location.path(newPath);
        }

        function niceDelta(t) {
            if(t/60 < 2) {
                return 'un minuto';
            }
            else {
                return Math.round(t/60) + ' minuti';
            }
        }

        $http.get('/api/v1/firms/search/'+firmName)
            .success(function(res, status) {
                var firm = res;
                $scope.firm = firm;
                $scope.tabellaPubblicaParams = { firmId: firm.url_id };
                firm.queues.forEach(function(queue) {
                    queue.stimaInMinuti = niceDelta(queue.time_estimated_waiting);
                    if(queue.ticket_pricing) {
                        queue.ticketPricing = JSON.parse(queue.ticket_pricing);
                    }
                });
                $scope.queues = firm.queues;

            })
            .error(function(res, status) {
                $scope.nonTrovato = firmName;
            });

        function scrollaSu() {
            $(document).scrollTop(0);
        }

        $scope.clickOnQueue = function(queue) {
            if (!$scope.firm) return;
            var firmName = $scope.firm.url_name;
            var ticketsUrl = $scope.firm.tickets_url;
            var params = {
                type: 'N',
                queue_choices: queue.letter
            };
            //console.log(ticketsUrl, params)
            queue.loading = true;
            $http.post(ticketsUrl, params)
                .success(function (ticket, status) {
                    queue.loading = false;
                    var ticketId = ticket.url_id;
                    var newPath = '/app/firm/' + firmName + '/tickets/' + ticketId;
                    $rootScope.lastTicket = ticket;
                    $location.path(newPath);
                    // $window.ga('send', 'pageview', { page: $location.url() });
                    $cookies.put('ticket-'+firmName, ticketId, { path: '/' });
                })
                .error(function (data, status) {
                    queue.loading = false;
                    scrollaSu();
                    if (status === 429) {
                        $scope.troppiBiglietti = true;
                    }
                    if (status === 406 && data.detail == "Too many tickets in this day.") {
                        $scope.troppiBigliettiOggi = true;
                    }
                    if (status === 406 && data.detail == "Cannot take ticket with closed firm.") {
                        $scope.OrarioSbagliato = true;
                    }
                    if (status === 406 && data.detail == "Anonymous tickets are not allowed.") {
                        $scope.NoAnonimi = true;
                    }
                    if (status === 406 && data.detail == "Cannot take ticket with closed queue.") {
                        $scope.OrarioSbagliato = true;
                    }
                    else {
                        defaultError(data, status);
                    }
                });
        }
        $scope.clickOnQueueScelta = function(queue) {
            if(!$scope.firm) return;
            var firmName = $scope.firm.url_name;
            var newPath = '/app/firm/'+firmName+'/scegliorario';
            $location.path(newPath);
            // $window.ga('send', 'pageview', { page: $location.url() });
        }
    })
    .controller('TicketCtrl', function($scope, $routeParams, $http, $interval, $timeout, $cookies, $sce) {
        var firmName = $routeParams.firm;
        $scope.Math = Math;
        var ticketId = $routeParams.ticketId;

        var fetcher;
        $scope.$on('$destroy', function() {
            if(fetcher) $interval.cancel(fetcher);
        });

        function prettyTime(t) {
            var sec_num = parseInt(t, 10); // don't forget the second param
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            var time    = (hours > 0 ? (hours + ' ore e ') : '') + minutes + ' minuti';
            return time;
        }

        function fetchTicket() {
            $http.get('/api/v1/tickets/'+ticketId+'/')
                .success(function(ticket, status) {
                    $scope.ticket = ticket;
                    $scope.countDown = prettyTime(ticket.time_estimated_waiting);
                    $scope.ticketLink = window.location.href;
                    $scope.newsHtml = $sce.trustAsHtml(ticket.news);
                    $scope.advertisingHtml = $sce.trustAsHtml(ticket.advertising);

                    var firmId = getIdFromUrl(ticket.firm.url);
                    $scope.pubblicoParams = { firmId: firmId };
                    if($scope.ticket.state == 'E') {
                        $cookies.remove('ticket-' + firmName, { path: '/' });
                    }
                })
                .error(defaultError);
        }

        function scrollaGiu() {
            $timeout(function () {
                document.body.scrollTop = $(document).height() - $(window).height();
            }, 200);
        }

        $scope.mostraEScrolla = function() {
            $scope.mostraBottone = !$scope.mostraBottone;
            scrollaGiu();
        };

        $scope.annullaTicket = function() {
            $http.patch('/api/v1/tickets/'+ticketId+'/', { state: 'D'})
                .success(function(ticket, status) {
                    $scope.ticket = ticket;
                    console.log(firmName);
                    $cookies.remove('ticket-'+firmName,{ path: '/' });
                })
                .error(defaultError);
        };

        fetchTicket();
        fetcher = $interval(fetchTicket, 5000);
    })
    .controller('DesksCtrl', function($scope, $http, $routeParams, $location, $window, $rootScope, Identity) {
        $scope.page = 'sportelli';
        var firmId = $routeParams.firmId;

        function getDesks(firm) {
            $http.get(firm.desks_url)
                .success(function (res, status) {
                    var desks = res.results;
                    if(desks.length === 1) {
                        $scope.apriSportello(desks[0]);
                    }
                    $scope.desks = desks;
                })
                .error(defaultError);
        }

        $scope.apriSportello = function(desk) {
            var deskId = desk.id_for_firm;
            $location.path('/app/firms/'+firmId+'/desks/'+deskId);
            // $window.ga('send', 'pageview', { page: $location.url() });
        };

        Identity.getMeAndFirm(firmId, function(me, firm) {
            if(me.firms.length === 0) {
                $location.path('/app/firmregister');
            }
            if(firm) {
                localStorage.setItem(me.username+'-lastUsedFirm', firmId);
                getDesks(firm);
            }
            else {
                console.log(me, firm, firmId);
                alert("Firm non trovato");
            }
        });
    })
    .controller('ServiCtrl', function($scope, $http, $routeParams, $interval, $window, $location, Identity, $uibModal) {
        $scope.location = $location.host();

        var firmId = $routeParams.firmId;
        var deskId = $routeParams.deskId;

        Identity.getMeAndFirm(firmId, function(me, firm) {
            $scope.firm = firm;
            $scope.queues = firm.queues;

            var fetcher;
            $scope.$on('$destroy', function () {
                if (fetcher) $interval.cancel(fetcher);
            });

            function aproSportello(firmId, deskId) {
                var params = {
                    state: 'O'
                };
                $http.patch('/api/v1/firms/' + firmId + '/desks/' + deskId + '/', params)
                    .success(function (data, status) {
                        if (status === 200) {
                            var deskId = deskId;
                        }
                    })
                    .error(defaultError);
            }

            $scope.firmId = firmId;
            $scope.emissioneParams = { firmId: firmId };

            aproSportello(firmId, deskId);

            function fetchTickets(desk) {
                $http.get('/api/v1/firms/' + firmId + '/desks/' + desk.id_for_firm + '/view/')
                    .success(function (data, status) {
                        $scope.altri = data.total_tickets_waiting - data.next_tickets_waiting.length;
                        $scope.tickets = data.next_tickets_waiting;
                        if ($scope.adessoServo == null && !$scope.codaVuota) {
                            $scope.adessoServo = data.ticket_in_service;
                        }
                        /*if (data.count === 0) {
                         //console.error('Non hai tickets')
                         $scope.tickets = [];
                         $scope.ticketsCount = 0;
                         return;
                         }
                         var tickets = data.results;
                         $scope.ticketsCount = data.count;

                         if(data.count > tickets.length) {
                         $scope.altri = data.count - tickets.length;
                         }
                         else {
                         $scope.altri = 0;
                         }

                         $scope.tickets = tickets;*/
                    })
                    .error(defaultError);
            }

            $http.get('/api/v1/firms/' + firmId + '/desks/' + deskId + '/')
                .success(function (desk, status) {
                    $scope.desk = desk;
                    fetchTickets(desk);
                    fetcher = $interval(function () {
                        fetchTickets(desk);
                    }, 5000);
                })
                .error(defaultError);

            $scope.serviProssimo = function () {
                var id_for_firm = null;
                if ($scope.adessoServo) {
                    id_for_firm = $scope.adessoServo.id_for_firm;
                }

                var url = '/api/v1/firms/' + firmId + '/tickets/next/';
                var params = {
                    desk: deskId
                };
                if (id_for_firm) {
                    params.current = id_for_firm;
                }
                $scope.loadingProssimo = true;
                $http.get(url, { params: params })
                    .success(function (ticket, status) {
                        $scope.numeriAzzerati = false
                        $scope.erroreAdessoServo = false;
                        $scope.loadingProssimo = false;
                        if (status === 204) {
                            $scope.codaVuota = true;
                            $scope.adessoServo = null;
                        }
                        else {
                            $scope.codaVuota = false;
                            $scope.adessoServo = ticket;
                            $(".servibiglietto").css("opacity", 1.0).stop().clearQueue().animate({opacity: 0.4}, 20000);
                            fetchTickets($scope.desk);
                        }
                    })
                    .error(function (data, status) {
                        $scope.loadingProssimo = false;
                        $scope.erroreAdessoServo = true;
                    });
            };

            $scope.chiudiDesk = function () {
                var params = {
                    state: 'C'
                };
                $http.patch('/api/v1/firms/' + firmId + '/desks/' + deskId + '/', params)
                    .success(function (data, status) {
                        console.log(data, status);
                        // TODO: questo sicuramente e' sbagliato
                        $location.path('/firms/' + firmId);
                        // $window.ga('send', 'pageview', { page: $location.url() });
                    })
                    .error(defaultError)
            };

            $scope.openTicketDialog = function (ticket) {
                var modalInstance = $uibModal.open({
                    templateUrl: '/static/partials/ticket-dialog.html',
                    controller: 'TicketDialogCtrl',
                    resolve: {
                        ticket: function () {
                            return ticket;
                        },
                        firm: function () {
                            return firm;
                        },
                        desk:function(){
                            return $scope.desk;
                        },
                        adessoServo: function(){
                            return $scope.adessoServo;
                        }
                    }
                });

                modalInstance.result.then(
                    function (result) {
                        if(!result) return;

                        if(result.cancelTicket) {
                            fetchTickets($scope.desk);
                        }
                        if(result.callTicket) {
                            $scope.numeriAzzerati = false;
                            $scope.erroreAdessoServo = false;
                            $scope.loadingProssimo = false;
                            if(result.status === 204) {
                                $scope.codaVuota = true;
                                $scope.adessoServo = null;
                            }
                            else {
                                $scope.codaVuota = false;
                                $scope.adessoServo = ticket;
                                $(".servibiglietto").css("opacity",1.0).stop().clearQueue().animate({opacity: 0.4}, 20000);
                                fetchTickets($scope.desk);
                            }
                        }
                     },
                    function () {
                        console.log('Modal dismissed');
                    }
                );
            };

            $scope.resetcounter = function () {
                var params = {
                    reset_now: true
                };
                var queueUrl = $scope.desk.queue.url
                $http.patch(queueUrl, params)
                    .success(function (data, status) {
                        console.log(data, status);
                        if (status === 200) {
                            $scope.numeriAzzerati = true;
                        }
                    })
                    .error(defaultError)
            };

            function scrollaGiu() {
                $(document).scrollTop($(document).height() - $(window).height());
            }

            $scope.autoscrollMostra = function () {
                $scope.mostraBottone = !$scope.mostraBottone;
                scrollaGiu();
            }

        });
    })
    .controller('HelpCtrl', function($scope, $rootScope, $http, $routeParams, $interval, $window, $timeout, $location, Identity) {
        $scope.location = $location.host();
        var firmId = $routeParams.firmId;
        $scope.firmId = firmId;
        $scope.emissioneParams = { firmId: firmId };


        Identity.getMeAndFirm(firmId, function(me, firm) {
            $scope.firm = firm;
            $scope.queues = firm.queues;
        });
    })
    .controller('PaginaPubblicaCtrl', function($scope, $rootScope) {
        $scope.page = 'pubblico';

        $scope.firm = $rootScope.firm;
        var firmId = $rootScope.firm.url_id;
        $scope.params = { firmId: firmId };
    })
    .controller('PaginaPubblicaNonLoggatoCtrl', function($scope, $rootScope, $http, $location, $routeParams) {
        $scope.location = $location.host();
        var firmName = $routeParams.firm;
        $http.get('/api/v1/firms/search/'+firmName)
            .success(function(res, status) {
                var firm = res;
                $scope.firm = firm;
                $scope.params = { firmId: firm.url_id };
            })
            .error(function(){
                console.error(firmName + ' non trovato');
                $scope.nonTrovato = firmName;
            });
        $('header').hide();
    })
    .controller('PaginaEmissioneBigliettiCtrl', function($scope, $routeParams, Identity) {
        $scope.page = 'biglietti';
        var firmId = $routeParams.firmId;

        Identity.getMeAndFirm(firmId, function(me, firm) {
            $scope.emissioneParams = { firmId: firm.url_id };
        });
    })
    .controller('OrariCtrl', function($scope, $rootScope, $http) {
        var firmId = $rootScope.firm.url_id;

        var names = ['Lunedi', 'Martedi', 'Mercoledi', 'Giovedi', 'Venerdi', 'Sabato', 'Domenica'];
        $scope.days = names.map(function(name) {
            return {
                name: name
            };
        });

        $scope.copiaNegliAltri = function() {
            var days = $scope.days;
            for(var i=1; i<days.length; i++) {
                days[i].time_start = days[0].time_start;
                days[i].time_stop = days[0].time_stop;
            }
        };

        $scope.submit = function() {
            var url = '/api/v1/firms/'+firmId+'/calendars/';
            var params = {

            }
            $http.post(url, params)
                .success(function(data, status) {
                    console.log(status, data);
                })
                .error(defaultError);
        };
    })
    .controller('FirmRegisterCtrl', function($scope, $http, $routeParams, $location, Identity) {
        $scope.firstTime = $routeParams.first_time;

        var createdFirm = null;

        Identity.getMe();

        $scope.submit = function(){
            if(!$scope.attivita || !$scope.descrizione) {
                return alert('Assicurati di aver introdotto tutti i campi.');
            }
            if(!$scope.terms) {
                return alert('Devi accettare i "Termini e Condizioni" per andare avanti.')
            }

            var params = {
                "name": $scope.attivita,
                "description": $scope.descrizione,
                //"algorithm": "G",
                //"algorithm_params": "{\"maxday_nonowner_tickets\": 200, \"eta\": 2.0, \"book_in_a_day\": 10}",
                "timezone": "Europe/Rome"
            };
            $http.post('/api/v1/firms/', params)
                .success(function(firm, status) {
                    createdFirm = firm;
                    // Messaggio di conferma
                    $('#success-modal').modal({backdrop: 'static', keyboard: false});
                })
                .error(function(data){
                    $scope.nonUnico = true;
                });
        };

        $scope.goToFirmHelp = function() {
            // Dobbiamo usare window.location qui,
            // Perche' senno /app/firms non refresha davvero il /api/v1/me
            window.location.href = '/app/firms/'+createdFirm.url_id+'/help';
        };
    })
    .controller('SearchCtrl', function($scope, $http, $location, Identity) {
        $scope.isLogged = Identity.isLogged();

        $scope.search = function() {
            $scope.error = null;
            var key = $scope.inputKey;
            $http.get('/api/v1/firms/fullsearch/', { params: { q: key } })
                .success(function(data, status) {
                    $scope.results = data.results;
                    if(data.results.length === 0) {
                        $scope.error = "Nessun servizio '"+key+"' trovato.";
                    }
                    //$location.path('/app/firm/'+firm.url_name);
                })
                .error(function(data, status){
                    $scope.error = data.detail;
                    defaultError(data, status);
                });
        };

        $scope.$watch('inputKey', function(newVal, oldVal) {
            if(!newVal || newVal === oldVal) return;
            $scope.notFound = false;
        });
    })
    .controller('LoggedCtrl', function($location, Identity) {
        // Qui c'e' tutta la logica di redirect quando ti logghi.

        Identity.getMe(function(user) {
            if (user.userprofile.type === 'C') {
                if(user.userprofile.registered_from_firm) {

                }
                else {
                    $location.path('/app/search');
                }
            }

            if (user.userprofile.type === 'M') {
                // E' un Manager
                if (user.firms.length === 0) {
                    // Questo manager non ha mai creato una firm, quindi si logga per la prima volta.
                    // Lo mandiamo a creare un firm.
                    $location.path('/app/firmregister');
                    return;

                }
                else {
                    // if(data.userprofile.pricing === 'Basic' || data.userprofile.pricing === 'Pro') { pagamento }

                    // Se ha gia' creato una firm ed ha pagato
                    // Lo mandiamo all'ultimo firm che ha usato

                    var userlastUsedFirm = localStorage.getItem(user.username+'-lastUsedFirm');
                    if(userlastUsedFirm) {
                        $location.path('/app/firms/'+userlastUsedFirm);
                    }
                    else {
                        // Lo mandiamo al primo firm
                        $location.path('/app/firms/'+user.firms[0].url_id);
                    }
                }
            }

            if(!user.userprofile.type) {
                // e' un vecchio utente che non ha Type. Facciamo finta che sia M.
                $location.path('/app/firms');
            }
        });
    })
