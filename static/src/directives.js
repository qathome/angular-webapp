angular.module('qathome')
    .factory('HttpInjector', function($cookies) {
        return {
            request: function(config) {
                if(config.url.indexOf('/api/') !== -1) {

                    if(config.url.indexOf('http://') === -1) {
                        // Aggiungiamo il server alla url solo se non e' gia' stato aggiunto
                        config.url = QATHOME_CLIENT_CONFIG.server + config.url;
                    }
                    if(QATHOME_CLIENT_CONFIG.token) {
                        var token = QATHOME_CLIENT_CONFIG.token;
                        config.headers['Authorization'] = token.token_type + " " + token.access_token;
                    }
                }
                return config;
            }
            //responseError: function(rejection) {
            //    console.log('CAZZO');
            //    var params = $.param({
            //        grant_type: "password",
            //        client_id: QATHOME_CLIENT_CONFIG.client_id,
            //        client_secret: QATHOME_CLIENT_CONFIG.client_secret,
            //        username: QATHOME_CLIENT_CONFIG.username,
            //        password: QATHOME_CLIENT_CONFIG.password
            //    });
            //    var $http = $injector.get('$http');
            //    $http.post(QATHOME_CLIENT_CONFIG.server + '/api/v1/token/', params)
            //        .success(function (data, status) {
            //            QATHOME_CLIENT_CONFIG.token = data;
            //            console.log('BILLO');
            //        });
            //}
        };
    })
    .factory('Identity', function ($http, $rootScope, $cookies, $location) {
        return {
            isLogged: function isLogged() {
                // Possiamo leggere il sessionid da qui, perche' nei settings
                // di Django abbiamo SESSION_COOKIE_HTTPONLY = False
                return $cookies.get('sessionid') != null;
            },
            getMe: function getMe(cb) {
                function getRefreshToken(){
                    var params = {
                        grant_type: "refresh_token",
                        client_id: QATHOME_CLIENT_CONFIG.client_id,
                        client_secret: QATHOME_CLIENT_CONFIG.client_secret,
                        refresh_token: QATHOME_CLIENT_CONFIG.token.refresh_token
                    };
                    $http({
                        method: 'POST',
                        url: QATHOME_CLIENT_CONFIG.server + '/api/v1/token/',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        transformRequest: function (obj) {
                            var str = [];
                            for (var p in obj)
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        data: params
                    })
                    .success(function (data, status) {
                        QATHOME_CLIENT_CONFIG.token = data;
                        $cookies.put('QATHOME_CLIENT_CONFIG_TOKEN', angular.toJson(QATHOME_CLIENT_CONFIG.token));
                        mygetMe();
                    })
                    .error(function (data, status) {
                        getToken();
                    });
                }
                function getToken(){
                    var params = {
                        grant_type: "password",
                        client_id: QATHOME_CLIENT_CONFIG.client_id,
                        client_secret: QATHOME_CLIENT_CONFIG.client_secret,
                        username: QATHOME_CLIENT_CONFIG.username,
                        password: QATHOME_CLIENT_CONFIG.password
                    };
                    $http({
                        method: 'POST',
                        url: QATHOME_CLIENT_CONFIG.server + '/api/v1/token/',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        transformRequest: function (obj) {
                            var str = [];
                            for (var p in obj)
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        data: params
                    })
                    .success(function (data, status) {
                        QATHOME_CLIENT_CONFIG.token = data;
                        //console.log(angular.toJson(QATHOME_CLIENT_CONFIG.token));
                        $cookies.put('QATHOME_CLIENT_CONFIG_TOKEN', angular.toJson(QATHOME_CLIENT_CONFIG.token));
                        mygetMe();
                    });
                }
                function mygetMe(){
                    $http.get('/api/v1/me/')
                        .success(function (data, status) {
                            $rootScope.me = data;

                            if (cb) cb(data);
                        })
                        .error(function (data, status) {
                            console.log('ERRORE');
                            getRefreshToken();
                            $location.path('/accounts/login/');
                        });
                }
                if ($rootScope.me) {
                    if(cb) cb($rootScope.me);
                }
                else {
                    var cookie_token = angular.fromJson($cookies.get('QATHOME_CLIENT_CONFIG_TOKEN'));
                    if(cookie_token){
                        QATHOME_CLIENT_CONFIG.token = cookie_token;
                        mygetMe()
                    }else {
                        getToken();
                    }
                }
            },
            getMeAndFirm: function getMeAndFirm(firmId, cb) {
                this.getMe(function(me){
                    var found = _.find(me.firms, function(firm) {
                        return firm.url_id === firmId;
                    });
                    if(found) {
                        $rootScope.currentFirm = found;
                    }
                    if(cb) cb(me, found);
                });
            }
        };
    })
    .controller('TicketDialogCtrl', function($scope, $uibModalInstance, $http, ticket, firm, desk, adessoServo) {
        $scope.ticket = ticket;

        $scope.cancelTicket = function() {
            var ticketUrl = firm.tickets_url + ticket.id_for_firm + '/';
            $http.patch(ticketUrl, { state: 'D' })
                .success(function(data, status) {
                    console.log(data, status);
                    $uibModalInstance.close({ cancelTicket: true });
                })
                .error(defaultError);
        };

        $scope.callTicket = function() {
            if(!(ticket.id_for_firm)){
                return;
            }
            var params = {
                desk: desk.id_for_firm,
                next: ticket.id_for_firm
            };
            if(adessoServo && adessoServo.id_for_firm) {
                params.current = adessoServo.id_for_firm;
            }
            var callUrl = firm.tickets_url+'next/';

            $scope.loadingProssimo = true;
            $http.get(callUrl, { params: params })
                .success(function(data, status) {
                    $uibModalInstance.close({ callTicket: true, status: status });
                })
                .error(function(data, status) {
                    $scope.loadingProssimo = false;
                    $scope.erroreAdessoServo = true;
                });
        };

        $scope.closeDialog = function() {
            $uibModalInstance.close();
        };
    })
    .directive('barra', function (Identity) {
        return {
            templateUrl: 'static/partials/barra.html',
            link: function ($rootScope, $scope) {
            }
        };
    })
    .directive('pubblicoFullscreen', function($http, $interval) {
        return {
            templateUrl: 'static/partials/pubblico-fullscreen.html',
            scope: {
                params: '='
            },
            link: pubblicoLinkFunction($http, $interval, true)
        };
    })
    .directive('pubblico', function($http, $interval) {
        return {
            templateUrl: 'static/partials/pubblico.html',
            scope: {
                params: '='
            },
            link: pubblicoLinkFunction($http, $interval)
        };
    })
    .directive('emissioneBiglietti', function($http, $rootScope) {
        return {
            templateUrl: 'static/partials/emissione-biglietti.html',
            scope: {
                params: '='
            },
            link: function($scope) {
                $scope.$watch('params', function(params) {
                    if(!params || !params.firmId) return;
                    $http.get('/api/v1/firms/'+params.firmId+'/')
                        .success(function(firm) {
                            $scope.firm = firm;
                            $scope.queues = firm.queues;
                        })
                        .error(defaultError);
                });

                $scope.prendiBiglietto = function(queue) {
                    if(!$scope.firm) return;
                    var firmName = $scope.firm.name;
                    var ticketsUrl = $scope.firm.tickets_url;
                    var params = {
                        type: 'N',
                        queue_choices: queue.letter
                    };
                    queue.loading = true;
                    $http.post(ticketsUrl, params)
                        .success(function(ticket, status) {
                            queue.loading = false;
                            var ticketId = ticket.url_id;
                            var newPath = firmName + '/tickets/' + ticketId;
                            $scope.ultimoTicketAggiunto = ticket;
                            $(".nuovo-biglietto").css("opacity",1.0).stop().clearQueue().animate({opacity: 0.4}, 10000);
                        })
                        .error(function(data, status) {
                            queue.loading = false;
                            defaultError(data, status);
                        });
                }
            }
        };
    });

function pubblicoLinkFunction($http, $interval, fullscreen) {
    return function($scope) {
        $scope.problemaConnessione = false;

        var fetcher = null;
        $scope.rangeRows = _.range(10);

        $scope.$on('$destroy', function () {
            if (fetcher) $interval.cancel(fetcher);
        });

        var ilServerHaRitornato = true;

        function fetchQueues(firmId) {
            if (!firmId) return console.error('Nessun firmId passato a <pubblico>');

            if(!ilServerHaRitornato) return;
            ilServerHaRitornato = false;

            $http.get('/api/v1/firms/' + firmId + '/publicscreen/', {})
                .success(function (data, status) {
                    ilServerHaRitornato = true;
                    $scope.problemaConnessione = false;

                    // La parte in alto
                    $scope.last = data.tickets_last_called;

                    // Per coda (la parte in basso dello schermo pubblico)
                    var letters = _.sortBy(_.keys(data.tickets_waiting));
                    $scope.letters = letters;

                    var lengths = _.values(data.tickets_waiting).map(function (queue) {
                        return queue.results.length;
                    });
                    $scope.longestRange = _.range(Math.min(_.max(lengths), 9));

                    $scope.waiting = data.tickets_waiting;
                })
                .error(function(data, status) {
                    ilServerHaRitornato = true;
                    $scope.problemaConnessione = true;
                    defaultError(data, status);
                });
        }

        $scope.$watch('last', function(newVal, oldVal) {
            if(!newVal) return;
            if(fullscreen){
                var beep = new Audio("/static/assets/beep.mp3");
                beep.play();
            }
        }, true);

        $scope.$watch('params', function (params) {
            if (!params) return;
            if (!params.firmId) {
                return console.error('params.firmId non disponibile.');
            }
            if (fetcher) {
                return console.error("fetcher gia' partito");
            }
            // Fa partire il fetcher quando il parametro firmId e' disponibile
            var firmId = params.firmId;

            fetchQueues(firmId);
            fetcher = $interval(function () {
                fetchQueues(firmId);
            }, 3000);

        }, true);
    }
}
