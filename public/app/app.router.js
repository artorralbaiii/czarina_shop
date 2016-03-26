angular.module('appRoutes', ['ngRoute'])
	.config(function($routeProvider, $locationProvider){

		$routeProvider
			.when('/', {
				templateUrl: 'app/views/pages/shop.html',
				controller: 'ShopCtrl',
				controllerAs: 'shop'
			});

		$locationProvider.html5Mode({
	            enabled: true,
	            requireBase: false
	    });
	});