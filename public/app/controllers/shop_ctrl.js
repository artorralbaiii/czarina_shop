angular.module('shop_ctrl',[])
	.controller('ShopCtrl', function(ShopServ, $scope){

		var vm = this;
		vm.categories = [];
		vm.products = [];
		vm.gdriveBaseUrl = '';
		vm.gdriveMainFolder = '';
		vm.currentCategory = 'All Products';
		vm.searchText = '';

		ShopServ.allCategories().then(function(data){
			vm.categories = data;
		}, function(error){
			console.log('Error fetching the categories.');
			console.log(error);
		});

		ShopServ.allProducts().then(function(data){
			vm.products = data;
		}, function(error){
			console.log('Error fetching the products.');
			console.log(error);
		});

		ShopServ.gdriveConfig().then(function(data){
			vm.gdriveBaseUrl = data.base_url;
			vm.gdriveMainFolder = data.main_folder_id;
		}, function(error){
			console.log('Error fetching the Google Drive Configs.');
			console.log(error);
		});

		vm.reloadProducts = function(category_id, category_name, event){

			if(vm.currentCategory != category_name) {
				
				angular.element($('#accordian .panel .panel-heading a.active')).removeClass('active');
				angular.element($('#'+event.target.id)).addClass('active');
				
				if(category_id) {
					ShopServ.allProducts(category_id).then(function(data){
						vm.products = data;
						vm.currentCategory = category_name;
					}, function(error){
						console.log('Error fetching the products.');
						console.log(error);
					});
				} else { // if(category_id)
					ShopServ.allProducts().then(function(data){
						vm.products = data;
						vm.currentCategory = 'All Products';
					}, function(error){
						console.log('Error fetching the products.');
						console.log(error);
					});
				} // if(category_id)
			} // if(vm.currentCategory != category_name)

		};

		$scope.$on('search', function(event, msg) {
    		vm.searchText = msg;
  		});

	});