(function() {
	angular
	.module('app', ['oitozero.ngSweetAlert', 'ngAnimate', 'toastr', 'ui.select', 'ngSanitize'])
	.constant('API_URL', 'http://localhost:9000/')
	.constant('API_URL_PIPEDRIVE', 'https://api.pipedrive.com/v1/')
	.config(function(toastrConfig) {
	  angular.extend(toastrConfig, {
	    positionClass: 'toast-bottom-right',
	  });
	})
	.run();
})();
