(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .config(config)
        .run(run);

    /** @ngInject */
    function config($logProvider, toastr) {
        // Enable log
        $logProvider.debugEnabled(true);

        // Set options third-party lib
        toastr.options.timeOut = 3000;
        toastr.options.positionClass = 'toast-top-right';
        toastr.options.preventDuplicates = true;
        toastr.options.progressBar = true;
    }

    function run($rootScope) {
        $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams){
            $rootScope.view = toState.name;
            $rootScope.params = toParams;
        });
    }

})
();
