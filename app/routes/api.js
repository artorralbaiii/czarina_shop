module.exports = function(app, express){
	var api = express.Router();
	var user_controller = require('../controllers/user_controller.js');

	api.post('/authenticate', user_controller.authenticate);
	api.post('/register', user_controller.registerUser);

	return api;
}