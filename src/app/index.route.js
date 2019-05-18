(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'vm'
            })
            .state('missions', {
                url: '/missions',
                templateUrl: 'app/missions/missions.html',
                controller: 'MissionsController',
                controllerAs: 'vm'
            })
            .state('game', {
                url: '/game/{missionId}',
                templateUrl: 'app/missionDetail/missionDetail.html',
                controller: 'MissionDetailController',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/');
    }

})();
