angular.module('shop_serv', [])
	.factory('ShopServ', function($http, $q){

		var shopFactory = {};

		shopFactory.allCategories = function(){
			return $http.get('/api/categories')
				.then(function(response){
					if (response.data instanceof Array) {
						return response.data;
					} else {
						return $q.reject(response.data);
					}
				}, function(response){
					return $q.reject(response.data);
				});
		};

		shopFactory.allProducts = function(id) {
			var urlRequest = '/api/products';

			if(id){
				urlRequest += '/' + id;
			}

			return $http.get(urlRequest)
				.then(function(response){
					if (response.data instanceof Array) {
						return response.data;
					} else {
						return $q.reject(response.data);
					}
				}, function(response){
					return $q.reject(response.data);
				});
		};

		shopFactory.gdriveConfig = function(){
			return $http.get('/api/gdrive')
				.then(function(response){
					if(typeof response.data === 'object') {
						return response.data;
					} else {
						return $q.reject(response.data);
					}
				}, function(response){
					return $q.reject(response.data);
				});
		}

		return shopFactory;

	});