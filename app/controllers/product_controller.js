var category_model = require('../models/category_model.js');
var product_model = require('../models/product_model.js');

// Create Product
exports.createProduct = function(req, res) {

	category_model.findOne({'category': req.body.category}, function(err, doc){
		if(err) {
			res.json({
				'success': false,
				'message': err.errmsg
			});
		} else { // if(err) 

			var sub_images = req.body.sub_images.split(',');

			if(doc) {
				new product_model({
					'category_id': doc._id,
					'product_name': req.body.product_name,
					'availability': req.body.availability,
					'price': req.body.price,
					'main_image': req.body.main_image,
					'sub_images': sub_images
				}).save(function(err){
					if(err){
						res.json({
							'success': false,
							'message': err.errmsg
						});
					} else {
						res.json({
							'success': true,
							'message': 'New Product has been added'
						});
					}
				}); // new product_model
			} else { // if(doc)
				var new_category =  new category_model({
					'category': req.body.category
				});

				new_category.save(function(err, doc){
					if(err){
						res.json({
							'success': false,
							'message': err.errmsg
						});
					} else { // if(err)
						console.log('Pass4');
						new product_model({
							'category_id': doc._id,
							'product_name': req.body.product_name,
							'availability': req.body.availability,
							'price': req.body.price,
							'main_image': req.body.main_image,
							'sub_images': sub_images
						}).save(
						function(err){
							if(err){
								res.json({
									'success': false,
									'message': err.errmsg
								});
							} else { // // if(err)
								res.json({
									'success': true,
									'message': 'New Product has been added'
								});
							} // // if(err)
						}); // new product_model
					} // if(err)
				}); // new_category.save
			} // if(doc)
		} // if(err) 
	});
};

// Update Product
exports.updateProduct = function(req, res){
	product_model.findOne({'_id': req.params.id}, function(err, doc){

		if(err) {
			res.json({
				'success': false,
				'message': err.errmsg
			});
			return;
		}

		var sub_images = req.body.sub_images.split(',');

		doc.product_name = req.body.product_name;
		doc.availability = req.body.availability;
		doc.price = req.body.price;
		doc.main_image = req.body.main_image;
		doc.sub_images = sub_images;

		category_model.findOne({'category': req.body.category}, function(err, category){
			if(err){
				res.json({
					'success': false,
					'message': err.errmsg
				})
			} else {
				if(category) {

					doc.category_id = category._id;
					doc.save();

					res.json({
						'success': true,
						'message': 'Product successfully updated.'
					});

				} else { // if(category) 

					var new_category = new category_model({'category': req.body.category});

					new_category.save(function(err, category){
						if(err){
							res.json({
								'success': false,
								'message': err.errmsg
							});
						} else {
							doc.category_id = category._id;
							doc.save();

							res.json({
								'success': true,
								'message': 'Product successfully updated.'
							});	
						}
					}); // new_category.save
				} // if(category)
			} // if(err)
		}); // category_model.findOne
	}); // product_model.findOne
};

// Return Product by Product ID (_id)
exports.getProduct = function(req, res){
	product_model.findOne({'_id': req.params.id}, function(err, doc){
		if(err){
			res.json(err);
		} else {
			res.json(doc);
		}
	});
}

// Return All Products
exports.allProducts = function(req, res){
	product_model.find({}, function(err, docs){
		if(err){
			res.json(err);
		} else {
			res.json(docs);
		}
	});
};

exports.allProductsByCategory = function(req, res){
	product_model.find({'category_id': req.params.id}, function(err, docs){
		if(err){
			res.json(err);
		} else {
			res.json(docs);
		}
	});
};