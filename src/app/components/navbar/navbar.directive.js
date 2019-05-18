(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .directive('navBar', navBar)
        .directive("fileread", [function () {
            return {
                scope: {
                    fileread: "="
                },
                link: function (scope, element, attributes) {
                    element.bind("change", function (changeEvent) {
                        var reader = new FileReader();
                        reader.onload = function (loadEvent) {
                            scope.$apply(function () {
                                scope.fileread = loadEvent.target.result;
                            });
                        }
                        reader.readAsDataURL(changeEvent.target.files[0]);
                    });
                }
            }
        }]);

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

            $scope.global = $rootScope;

            $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                vm.isVisible = $rootScope.view ==  'home' || $rootScope.view == 'game' ? false : true;
                console.log(vm.isVisible);
            });

            vm.toggleSidenav = buildToggler('closeEventsDisabled');

            function buildToggler(componentId) {
                return function() {
                    $mdSidenav(componentId).toggle();
                };
            }
        }
    }

})();
