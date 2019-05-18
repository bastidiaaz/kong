(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($http, $scope, $rootScope) {
      var vm = this;

      activate();

      function activate() {
      }

      function generateRandomData() {
        $http.get('app/main/datos.json').success(function(response){
          //Generar para cada JSON obj
          vm.datos = response.datos;
          angular.forEach(vm.datos, function(dato) {
            dato.nombre = "Sensor " + dato.id;
            dato.mp25 = _.random(0, 170);
            if (dato.mp25 === 0) {
              dato.mp25ICAP = 0;
            }
            if (dato.mp25 > 0 && dato.mp25 <= 50) {
              dato.mp25ICAP = dato.mp25 * 100 / 50;
            }
            if (dato.mp25 > 50) {
              dato.mp25ICAP = dato.mp25 * 500 / 170;
            }

            dato.mp10 = _.random(0, 330);
            if (dato.mp10 === 0) {
              dato.mp10ICAP = 0;
            }
            if (dato.mp10 > 0 && dato.mp10 <= 150) {
              dato.mp10ICAP = dato.mp10 * 100 / 150;
            }
            if (dato.mp10 > 150) {
              dato.mp10ICAP = dato.mp10 * 500 / 330;
            }

            dato.kong = (dato.mp25ICAP + dato.mp10ICAP) / 2;
          });
        });
      }
    }
})();
