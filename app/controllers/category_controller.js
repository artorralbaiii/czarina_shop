var category_model = require('../models/category_model.js');

exports.allCategories = function(req, res){
	category_model.find({}, function(err, docs){
		if(err){
			res.json({
				'success': false,
				'message': err.errmsg
			})
		} else {
			res.json(docs);
		}
	});
};