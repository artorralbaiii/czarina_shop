var mongoose = require('mongoose');
var schema = mongoose.Schema;

var ProductSchema = new schema({
	'category_id': {type: schema.Types.ObjectId, fef: 'Category', required: true},
	'product_name': {type: String, required: true, index: { unique: true }},
	'availability': String,
	'price': Number,
	'main_image': String,
	'sub_images': Array 
});

module.exports = mongoose.model('Product', ProductSchema);