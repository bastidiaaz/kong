(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('MissionsController', MissionsController);

    /** @ngInject */
    function MissionsController($state, $rootScope) {
      var vm = this;
      vm.missions = $rootScope.missions;
      vm.createNewMission = function(type) {
          var newMission = {
              id: vm.missions.length,
              type: type,
              tasks: [
                  {
                      priority: 0,
                      desc: "Saca una foto de un foco de basura, y después una foto de cómo quedó gracias a tu ayuda",
                      done: false
                  },
                  {
                      priority: 1,
                      desc: "",
                      done: false
                  },
                  {
                      priority: 2,
                      desc: "",
                      done: false
                  }
              ]
          };

          $state.go('game', {missionId: newMission.id, type: newMission.type});
          $rootScope.missions.push(newMission);
          setTimeout(function () {
              vm.missions = $rootScope.missions;
          }, 2000);
      }

      activate();

      function activate() {
      }
    }
})();
