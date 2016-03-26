angular.module('home_ctrl', [])
	.controller('HomeCtrl', function($rootScope){
		var vm = this;
		
		vm.changed = function(){
			$rootScope.$broadcast('search', vm.searchText);
		}

	});