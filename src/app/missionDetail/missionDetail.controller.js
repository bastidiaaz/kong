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

          }, function() {

          });
      }

      function DialogController($scope, $mdDialog, task) {
          $scope.task = task;
          console.log($scope.task);
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
