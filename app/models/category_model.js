var mongoose = require('mongoose');
var schema = mongoose.Schema;

var CategorySchema = new schema({
	'category': {type: String, required: true}
});

module.exports = mongoose.model('Category', CategorySchema);