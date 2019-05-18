(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $rootScope, $mdSidenav) {
        $rootScope.toggleSidenav = buildToggler('closeEventsDisabled');
        $rootScope.missions= [];
        $rootScope.level= 1;
        $rootScope.rupias= 4231;

        function buildToggler(componentId) {
            return function() {
                $mdSidenav(componentId).toggle();
            };
        }

        $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams){
            $rootScope.view = toState.name;
            $rootScope.params = toParams;
        });
    }

})();
