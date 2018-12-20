(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('leftPanel', leftPanel);

    /** @ngInject */
    function leftPanel() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/leftpanel/leftpanel.html',
            scope: {
                creationDate: '='
            },
            controller: LeftPanelController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function LeftPanelController() {}
    }

})();
