(function() {
	'use strict';

	angular
		.module('app', [
				'ngResource',
				'ui.bootstrap',
				'ui.router'
		]);

	angular
		.module("app")
		.config(['$urlRouterProvider', '$httpProvider',
		function($urlRouterProvider, $httpProvider) {

			$urlRouterProvider.otherwise("/");

		}]);
})();