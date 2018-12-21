(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($http) {
      var vm = this;
      var map = new L.Map('mapa1');

      activate();

      function activate() {
        // create the tile layer with correct attribution
        var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
        var osm = new L.TileLayer(osmUrl, {minZoom: 10, maxZoom: 15, attribution: osmAttrib});

        // start the map in South-East England
        map.setView(new L.LatLng(-38.73587485347638, -72.58898735046388),13);
        map.addLayer(osm);

        generateRandomData();
        // setGeoJSONLayer();
      }

      function generateRandomData() {
        $http.get('app/main/datos.json').success(function(response){
          //Generar valores para cada JSON obj
          vm.datos = response.datos;
          angular.forEach(vm.datos, function(dato) {
            dato.nombre = "Sensor " + dato.id;
            dato.valor = _.random(0, 170);

            if (dato.valor == 0) {
              dato.valorICAP = 0;
            }
            if (dato.valor > 0 && dato.valor <= 50) {
              dato.valorICAP = dato.valor * 100 / 50;
            }
            if (dato.valor > 50) {
              dato.valorICAP = dato.valor * 500 / 170
            }
          });

          //Crear array con datos para heatmap
          vm.heatStats = [];
          angular.forEach(vm.datos, function(dato) {
            var obj = [dato.latlng[0], dato.latlng[1], dato.valorICAP];
            vm.heatStats.push(obj);
          });

          var heat = L.heatLayer(vm.heatStats, {
            radius: 70,
            maxZoom: 13,
            max: 500,
            blur: 15
          }).addTo(map);
        });
      }


      // function setGeoJSONLayer() {
      //   var states = [
      //     {
      //       "type": "Feature",
      //       "properties": {},
      //       "geometry": {
      //         "type": "Polygon",
      //         "coordinates": [
      //           [
      //             [
      //               -72.66752243041992,
      //               -38.710428842148914
      //             ],
      //             [
      //               -72.63713836669922,
      //               -38.724492231683676
      //             ],
      //             [
      //               -72.65190124511719,
      //               -38.735740950821786
      //             ],
      //             [
      //               -72.6522445678711,
      //               -38.752209093775825
      //             ],
      //             [
      //               -72.6606559753418,
      //               -38.754351012062315
      //             ],
      //             [
      //               -72.65962600708008,
      //               -38.758634655815186
      //             ],
      //             [
      //               -72.62615203857422,
      //               -38.76157951175738
      //             ],
      //             [
      //               -72.60469436645508,
      //               -38.753146190934686
      //             ],
      //             [
      //               -72.60005950927734,
      //               -38.74765730401542
      //             ],
      //             [
      //               -72.59387969970703,
      //               -38.74698789869034
      //             ],
      //             [
      //               -72.58941650390625,
      //               -38.749665482332496
      //             ],
      //             [
      //               -72.5782585144043,
      //               -38.74685401687217
      //             ],
      //             [
      //               -72.5592041015625,
      //               -38.7348036252108
      //             ],
      //             [
      //               -72.54632949829102,
      //               -38.71163438396565
      //             ],
      //             [
      //               -72.53070831298828,
      //               -38.702525342335896
      //             ],
      //             [
      //               -72.54770278930664,
      //               -38.69622870885281
      //             ],
      //             [
      //               -72.56589889526367,
      //               -38.7120362267202
      //             ],
      //             [
      //               -72.58409500122069,
      //               -38.703998942455826
      //             ],
      //             [
      //               -72.59834289550781,
      //               -38.707213964583055
      //             ],
      //             [
      //               -72.6028060913086,
      //               -38.72288512722238
      //             ],
      //             [
      //               -72.62048721313477,
      //               -38.708017697527296
      //             ],
      //             [
      //               -72.62409210205078,
      //               -38.70493667217571
      //             ],
      //             [
      //               -72.62872695922852,
      //               -38.70989303926041
      //             ],
      //             [
      //               -72.63559341430664,
      //               -38.707481876568366
      //             ],
      //             [
      //               -72.6500129699707,
      //               -38.706946051593846
      //             ],
      //             [
      //               -72.66597747802733,
      //               -38.7054725122086
      //             ],
      //             [
      //               -72.66752243041992,
      //               -38.710428842148914
      //             ]
      //           ]
      //         ]
      //       }
      //     }
      //   ];
      //
      //   L.geoJSON(states, {}).addTo(map);
      // }
    }
})();
