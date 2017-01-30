(function() {
	'use strict';

	angular
		.module("app")
		.config(['$stateProvider',
		function($stateProvider) {

			$stateProvider
				.state('pessoas', {
					url: "/",
					templateUrl: "src/modules/pessoa/pessoa.list.html",
					controllerAs: 'vm',
					controller: 'pessoaListController'
				})
				.state('pessoa', {
					url: "/pessoa",
					templateUrl: "src/modules/pessoa/pessoa.html",
					controllerAs: 'vm',
					controller: 'pessoaController'
				})
				.state('pessoa-id', {
					url: "/pessoa/:id",
					templateUrl: "src/modules/pessoa/pessoa.html",
					controllerAs: 'vm',
					controller: 'pessoaController'
				});

		}]);

})();