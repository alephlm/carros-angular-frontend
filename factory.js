function carroFactory($http, API_URL) {

	var url = API_URL + 'carro';

	return {
		getCarros : function() {
			return $http.get(url);
		},
		getCarro : function(id) {
			return $http.get(url + id);
		},
		createCarro : function(carro) {
			return $http.post(url, carro);
		},
		updateCarro : function(carro) {
			return $http.put(url + "/" + carro.id, carro);
		},
		deleteCarro : function(carro) {
			return $http.post(url+"/delete", carro);
		}
	}
};

function pessoaFactory($http, API_URL_PIPEDRIVE) {

	return {
		getPessoas : function(token) {
			return $http.get(API_URL_PIPEDRIVE + "persons?start=0&api_token=" + token);
		}
	}
};

angular
  .module('app')
  .factory('carroFactory', carroFactory)
  .factory('pessoaFactory', pessoaFactory);