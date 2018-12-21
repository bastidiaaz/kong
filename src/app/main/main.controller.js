(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($http, $scope, $rootScope) {
      var vm = this;
      var map = new L.Map('mapa1');
      vm.checkboxList = {
        mp25: false,
        mp10: false
      };

      activate();

      function activate() {
        // create the tile layer with correct attribution
        var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
        var osm = new L.TileLayer(osmUrl, {minZoom: 13, maxZoom: 13, attribution: osmAttrib});

        map.setView(new L.LatLng(-38.73587485347638, -72.58898735046388),13);
        map.addLayer(osm);

        generateRandomData();
        // setGeoJSONLayer();
      }

      vm.checkboxChange = function(tipo) {
        if (tipo == 'mp25') {
          if (!vm.checkboxList[tipo]) {
            map.removeLayer(vm.heatMp25);
          } else {
            map.addLayer(vm.heatMp25);
          }
        }

        if (tipo == 'mp10') {
          if (!vm.checkboxList[tipo]) {
            map.removeLayer(vm.heatMp10);
          } else {
            map.addLayer(vm.heatMp10);
          }
        }
      }

      function generateRandomData() {
        $http.get('app/main/datos.json').success(function(response){
          //Generar para cada JSON obj
          vm.datos = response.datos;
          angular.forEach(vm.datos, function(dato) {
            dato.nombre = "Sensor " + dato.id;
            dato.mp25 = _.random(0, 170);
            if (dato.mp25 == 0) {
              dato.mp25ICAP = 0;
            }
            if (dato.mp25 > 0 && dato.mp25 <= 50) {
              dato.mp25ICAP = dato.mp25 * 100 / 50;
            }
            if (dato.mp25 > 50) {
              dato.mp25ICAP = dato.mp25 * 500 / 170
            }

            dato.mp10 = _.random(0, 330);
            if (dato.mp10 == 0) {
              dato.mp10ICAP = 0;
            }
            if (dato.mp10 > 0 && dato.mp10 <= 150) {
              dato.mp10ICAP = dato.mp10 * 100 / 150;
            }
            if (dato.mp10 > 150) {
              dato.mp10ICAP = dato.mp10 * 500 / 330
            }

            dato.kong = (dato.mp25ICAP + dato.mp10ICAP) / 2;
          });

          //Crear array con datos para heatmap
          vm.heatStatsMp25 = [];
          angular.forEach(_.orderBy(vm.datos, 'mp25ICAP'), function(dato) {
            L.circle([dato.latlng[0], dato.latlng[1]], {dato: dato, radius: 1000, opacity: 0, fillOpacity: 0}).addTo(map).on('click', function(e){
              var lat = e.latlng.lat;
              var lon = e.latlng.lng;

              //Clear existing marker,
              if (vm.theMarker != undefined) {
                map.removeLayer(vm.theMarker);
              };

              //Add a marker to show where you clicked.
              vm.theMarker = L.marker([lat,lon]).addTo(map);
              console.log(dato.kong);
              $rootScope.$emit('mapClicked', dato);
            });

            var obj = [dato.latlng[0], dato.latlng[1], dato.mp25ICAP];
            vm.heatStatsMp25.push(obj);
          });

          vm.heatMp25 = L.heatLayer(vm.heatStatsMp25, {
            radius: 70,
            maxZoom: 13,
            max: 500,
            blur: 15
          });

          //Crear array con datos para heatmap
          vm.heatStatsMp10 = [];
          angular.forEach(_.orderBy(vm.datos, 'mp10ICAP'), function(dato) {
            var obj = [dato.latlng[0], dato.latlng[1], dato.mp10ICAP];
            vm.heatStatsMp10.push(obj);
          });

          vm.heatMp10 = L.heatLayer(vm.heatStatsMp10, {
            radius: 70,
            maxZoom: 13,
            max: 500,
            blur: 15
          });

          console.log(vm.datos);
          console.log(vm.heatStatsMp25);
          console.log(vm.heatStatsMp10);
        });
      }
    }
})();
