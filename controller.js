function carrosController(carroFactory, pessoaFactory, SweetAlert, toastr){
	var vm = this;

	vm.pessoas = [];
	vm.carros = [];

	vm.carro = {};
	vm.carro.ano = new Date().getFullYear();
  vm.mindate = new Date().getFullYear() - 30;
  vm.maxdate = new Date().getFullYear() + 1;
	vm.isSaving = false;


  vm.loadCarro = function(carro){
  	vm.carro = carro;
  }
	
	vm.getPessoas = function(){
		var token = vm.token;
		pessoaFactory.getPessoas(token)
		.then(function (pessoas) {
      vm.pessoas = pessoas.data.data;
    }).catch(function(error){
    	SweetAlert.swal("Tolken inválido")
    });
	}

	vm.saveCarro = function(carro){
		vm.isSaving = true;
		if(carro.id){
			carroFactory.updateCarro(carro)
			.then(function(result){
				toastr.success('O carro ' + result.data.modelo + ' foi atualizado!', 'Sucesso!');
	      clearForm();
			})
			.catch(function(error){
				toastr.error('Erro ao atualizar o carrro!', 'Erro!');
				vm.isSaving = false;
				console.log(error);
			})
		} else{
			carroFactory.createCarro(carro)
			.then(function (carro) {
	        vm.carros.push(carro.data);
					toastr.success('O carro ' + carro.data.modelo + ' foi inserido!', 'Sucesso!');
	        clearForm();
	    })
	    .catch(function(error){
				toastr.error('Erro ao salvar o carrro!', 'Erro!');
				vm.isSaving = false;
	    	console.log(error)
	    });
		}
	}

	var getCarros = function(){
		carroFactory.getCarros()
		.then(function (carros) {
        vm.carros = carros.data;
    })
    .catch(function(error){
			toastr.error('Erro!', 'Erro ao recuperar os carros do banco de dados!');
    	console.log(error)
    });
	}

	vm.deleteCarro = function(carro){

		SweetAlert.swal({
		  title: "Tem certeza?",
		  text: "Não será possível recuperar esse item!",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Delete!",
		  closeOnConfirm: true
		},
		function(isConfirm){
			if (isConfirm) {
			 carroFactory.deleteCarro(carro).then(function (response) {
	        vm.carros.splice(vm.carros.findIndex(x => x.id === carro.id), 1);
					toastr.success('O carro ' + carro.modelo + ' foi excluido!', 'Sucesso!');
		      clearForm();
	     })
	     .catch(function(error){
					toastr.error('Erro ao excluir um carro!', 'Erro!');
	     		console.log(error)
	     });
	  	}
		});
	}

	var clearForm = function(){
    vm.carro = {};
		vm.carro.ano = new Date().getFullYear();
		vm.mainForm.$setPristine();
		vm.isSaving = false;
	}

  vm.clearForm = clearForm;

	getCarros();

};

angular
	.module('app')
	.controller("carrosController", carrosController);