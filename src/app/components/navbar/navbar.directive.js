(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('navBar', navBar);

    /** @ngInject */
    function navBar() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/navbar/navbar.html',
            scope: {
                creationDate: '='
            },
            controller: NavbarController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function NavbarController($scope, $mdSidenav, $rootScope) {
            var vm = this;
            vm.view = $rootScope.view;
            vm.toggleSidenav = buildToggler('closeEventsDisabled');

            function buildToggler(componentId) {
                return function() {
                    $mdSidenav(componentId).toggle();
                };
            }
        }
    }

})();
