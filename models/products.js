const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: {type: String, required: false},
    description: {type: String, required: false},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true}
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;



//////// SCHEMA FORMAT TO BE USED ///////
// name: String,
//   description: String,
//   img: String,
//   price: Number,
//   quantity: Number
