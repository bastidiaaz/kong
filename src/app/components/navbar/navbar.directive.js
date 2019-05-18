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
        function NavbarController() {
            console.log('asdasdas');
        }
    }

})();
