(function() {
	'use strict';

	angular
		.module("app")
		.factory('pessoaService', pessoaService);

	pessoaService.$inject = ['$resource', 'config'];

	function pessoaService($resource, config) {

		return {

			Pessoa: $resource(config.baseUrl + '/pessoa/:id', {}, {
				show: { method: 'GET', params: {id: '@id'}},
				query: { method: 'GET' , isArray: true},
				update: { method: 'PUT', params: {id: '@id'} },
				delete: { method: 'DELETE', params: {id: '@id'} },
				insert: { method: 'POST' }
			}),
			Sorteio: $resource(config.baseUrl + '/sorteio', {}, {
				sorteio: { method: 'POST' }
			})
			
		}

	};

})();