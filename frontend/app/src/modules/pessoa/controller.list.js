(function() {
    'use strict';

	angular
		.module("app")
		.controller('pessoaListController', pessoaListController);

	pessoaListController.$inject = ['pessoaService'];

	function pessoaListController(pessoaService) {

		var vm = this;

		all();

	 	function all() {
		  pessoaService.Pessoa
		  .query({}).$promise.then(function(data){
		  	vm.datas = data;
		  }).catch(function(error){
        vm.error = error; 
		  });
	 	};

		function remove(id){
			pessoaService.Pessoa
			.delete({id: id}).$promise.then(function(data){
				all();
			}).catch(function(error){
				vm.error = error;
			});
		};		 

		vm.delete = function (id) {
			if (confirm('Confirmar exclusão do registro?')) {
        remove(id);
			}
		};

		vm.drawing = function (id) {
			pessoaService.Sorteio
		  .sorteio().$promise.then(function(data){
		  	all();
		  }).catch(function(error){
        vm.error = error; 
		  });
		};
	}

})();