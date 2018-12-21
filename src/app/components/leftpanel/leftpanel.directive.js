(function () {
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
        function LeftPanelController() {
            var vm = this;
            vm.labels = ["Download Sales", "In-Store Sales"];
            vm.data = [300, 500];
            vm.labels1 = ["Download Sales", "In-Store Sales"];
            vm.data1 = [300, 5000];
            vm.labels2 = ["KONG", "HACKAKONG"];
            vm.data2 = [300, 250];
            vm.labels3 = ["Download Sales", "In-Store Sales"];
            vm.data3 = [3000, 500];
            vm.labels4 = ["Download Sales", "In-Store Sales"];
            vm.data4 = [3000, 5000];
            vm.labels5 = ["Download Sales", "HACKAKONG"];
            vm.data5 = [300, 8000];
        }
    }

})();
