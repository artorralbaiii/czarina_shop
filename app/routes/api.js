module.exports = function(app, express){
	var api = express.Router();
	var user_controller = require('../controllers/user_controller.js');
	var product_controller = require('../controllers/product_controller.js');
	var gdrive = require('../../gdrive_config.js');

	//USER
	api.post('/authenticate', user_controller.authenticate);
	api.post('/register', user_controller.registerUser);

	//PRODUCTS
	api.post('/product', product_controller.createProduct);
	api.post('/product/:id', product_controller.updateProduct);
	api.get('/product/:id', product_controller.getProduct);
	api.get('/products', product_controller.allProducts);

	// MISC
	api.get('/gdrive', function(req, res){
		res.json(gdrive);
	});

	return api;
}