const mongoose = require('mongoose');

// Define the schema for a Product
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    isFeatured: {
        type: Boolean,
        default: true // Ensure this field exists and has a default value
    }
});

        
        // Create the model from the schema
        const Product = mongoose.model('Product', productSchema);
        
        module.exports = Product;