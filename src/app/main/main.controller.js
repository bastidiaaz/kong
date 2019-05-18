(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($http, $scope, $rootScope) {
      var vm = this;
      vm.level = $rootScope.level;
      vm.src = "app/Domo sin nada@4x.png";
      activate();

      function activate() {
          if (vm.level == 1) {
              vm.src = "app/Domo sin nada@4x.png";
          } else {
              vm.src = "app/domo-3.png";
          }
      }
    }
})();
