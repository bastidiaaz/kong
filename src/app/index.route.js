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
                templateUrl: 'app/missionDetail/missionDetail.html',
                controller: 'MainController',
                controllerAs: 'vm'
            })
            .state('missions.detail', {
                url: '/{missionId}',
                templateUrl: 'app/missionDetail/missionDetail.html',
                controller: 'MissionDetailController',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/');
    }

})();
