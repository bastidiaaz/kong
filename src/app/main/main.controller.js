(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController() {
      var map = L.map('mapa1').setView([51.505, -0.09], 13);
    }
})();
