(function() {
    'use strict';

	angular
		.module("app")
		.controller('pessoaController', pessoaController);

	pessoaController.$inject = ['$scope', '$state', 'pessoaService', 'config'];

	function pessoaController($scope, $state, pessoaService, config) {
	  var vm = this;

	  vm.pessoa = null;

		init();

	  function init(){
			if($state.params.id) {
				get($state.params.id);
			}
	  };

	  function get(id) {
			pessoaService.Pessoa.show({id: id}).$promise.then(function(data){
				vm.pessoa = data;
			}).catch(function(error){
				vm.error = error;
			});
	  };

	  function insert(pessoa) {
			pessoaService.Pessoa.insert(pessoa).$promise.then(function(data){
				$state.go('pessoa');
				vm.pessoa = null;
			}).catch(function(error){
				vm.error = error;
			});
	  };

	  function update(pessoa) {
			var id = pessoa._id;
			delete pessoa._id;
			delete pessoa.__v;
			delete pessoa.amigo;
			
			pessoaService.Pessoa.update({id: id}, pessoa).$promise.then(function(data){
				$state.go('pessoas');
			}).catch(function(error){
				vm.error = error;
			});
	  };

    vm.save = function (pessoa) {
	    if (!pessoa) {
		  	$state.go('pessoa');
		 		return;
			}

			if (!pessoa._id)
				insert(pessoa);
			else
				update(pessoa);
	  };  
	}

})();