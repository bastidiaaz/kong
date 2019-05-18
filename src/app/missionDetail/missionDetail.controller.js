(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('MissionDetailController', MissionDetailController);

    /** @ngInject */
    function MissionDetailController($http, $scope, $rootScope, $mdDialog, $state, $filter) {
      var vm = this;
      vm.currentMission;

      activate();

      function activate() {
          angular.forEach($rootScope.missions, function(mission) {
              console.log(mission);
              if (mission.id == $state.params.missionId) {
                  vm.currentMission = mission;
              }
          });

          console.log(vm.currentMission);
      }

      vm.showAlert = function(ev, task) {
          $mdDialog.show({
              locals: {task: task},
              controller: DialogController,
              templateUrl: 'app/missionDetail/dialog1.tmpl.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:false,
          })
          .then(function(answer) {
              if (answer) {
                  angular.forEach(vm.currentMission.tasks, function(taskitem) {
                     if (taskitem.priority == task.priority) {
                         taskitem.done = true;
                     }
                  });

                  if (vm.currentMission.tasks[0].done == true && vm.currentMission.tasks[1].done == true && vm.currentMission.tasks[2].done == true) {
                      $rootScope.level = 99;
                      $rootScope.rupias = 99999;
                  }
              }

              console.log(vm.currentMission);
          }, function() {

          });
      }

      function DialogController($scope, $mdDialog, task) {
          $scope.task = task;
          $scope.uploadme;
          $scope.uploadme2;
          $scope.submit = function() {
            $scope.answer(true);
          };

          $scope.hide = function() {
              $mdDialog.hide();
          };

          $scope.cancel = function() {
              $mdDialog.cancel();
          };

          $scope.answer = function(answer) {
              $mdDialog.hide(answer);
          };
      }
    }
})();
