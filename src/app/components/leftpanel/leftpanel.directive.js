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
        function LeftPanelController($scope, $rootScope) {
            var vm = this;
            vm.colours = ['#FFCCBC', '#FF5722', '#717984', '#F1C40F'];
            vm.selectedData;
            vm.maxICAP = 500;
            vm.mp25 = [vm.maxICAP, 0];
            vm.mp10 = [vm.maxICAP, 0];
            vm.data1 = [300, 5000];
            vm.labels2 = ["KONG", "HACKAKONG"];
            vm.data2 = [300, 250];
            vm.labels3 = ["Download Sales", "In-Store Sales"];
            vm.data3 = [3000, 500];
            vm.labels4 = ["Download Sales", "In-Store Sales"];
            vm.data4 = [3000, 5000];
            vm.labels5 = ["Download Sales", "HACKAKONG"];
            vm.data5 = [300, 8000];

            activate();

            function activate() {
              $rootScope.$on('mapClicked', function(event, dato) {
                vm.selectedData = dato;
                vm.mp25[1] = vm.selectedData.mp25ICAP;
                vm.mp25[0] = vm.maxICAP - vm.selectedData.mp25ICAP;
                vm.mp10[1] = vm.selectedData.mp10ICAP;
                vm.mp10[0] = vm.maxICAP - vm.selectedData.mp10ICAP;
                $scope.$apply();
              });
            }
        }
    }

})();
