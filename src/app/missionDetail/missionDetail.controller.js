(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('MissionDetailController', MissionDetailController);

    /** @ngInject */
    function MissionDetailController($http, $scope, $rootScope) {
      var vm = this;

      activate();

      function activate() {
          console.log('asdfasd');
      }
    }
})();
