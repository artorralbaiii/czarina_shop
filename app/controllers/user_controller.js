var user_model = require('../models/user_model.js');

//User to authenticate user login.
exports.authenticate = function(req, res){
	user_model.findOne({'username': req.body.username})
		.select('password')
		.exec(function(err, user){
			if(err) {
				res.json({
					'success': false,
					'message': err
				});
			} else { //If
				var user_authenticated = user.comparePassword(req.body.password);

				if (user_authenticated) {
					req.session.regenerate(function(){
						req.session.user = user;
						res.json({
							'success': true,
							'message': 'Login Successful'
						});
					}); // req.session
				} else { // If user_authenticated
					res.json({
						'success': false,
						'message': 'Invalid password.'
					})
				} // If user_authenticated

			} // if err
		}); // findOne
}; // authenticate


// Use to create/register new user.
exports.registerUser = function(req, res){
	var new_user = new user_model({
		'name': req.body.name,
		'username': req.body.username,
		'password': req.body.password
	});

	new_user.save(function(err){
		if(err){
			res.json({
				'success': false,
				'message': err
			});
		} else { // If
			res.json({
				'success': true,
				'message': 'New user is added.'
			});
		} // If
	}); // new_user.save
}; // registerUser