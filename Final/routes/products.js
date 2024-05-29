const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/')  // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

router.post("/", upload.single('image'), async (req, res) => {
    const imageUrl = req.file ? path.join('images', req.file.filename) : null;
    const isFeatured = req.body.isFeatured === 'true'; // Convert to boolean as needed

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        imageUrl: imageUrl,
        isFeatured: isFeatured
    });

    try {
        await product.save();
        res.status(201).send(product);
    } catch (err) {
        res.status(400).send(err);
    }
});



router.get("/", async (req, res) => {
    const search = req.query.search;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
        query = { name: { $regex: search, $options: 'i' } };
    }

    try {
        const total = await Product.countDocuments(query);
        const products = await Product.find(query).skip(skip).limit(limit);

        res.json({
            products,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).send(err);
    }
});
// GET: Retrieve featured products
router.get("/featured", async (req, res) => {
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).limit(5);
        res.json(featuredProducts);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/visited-products', async (req, res) => {
    if (!req.session.visitedProducts || req.session.visitedProducts.length === 0) {
        res.render('visitedProducts', { products: [] });
    } else {
        try {
            const products = await Product.find({
                '_id': { $in: req.session.visitedProducts }
            });
            res.render('visitedProducts', { products });
        } catch (error) {
            console.error('Error fetching visited products:', error);
            res.render('visitedProducts', { products: [] });
        }
    }
});


// Add to visited products
router.post('/visit-product/:productId', (req, res) => {
    const productId = req.params.productId;
    if (!req.session.visitedProducts) {
        req.session.visitedProducts = [];
    }
    req.session.visitedProducts.push(productId);
    res.json({ message: 'Product added to visited list', visitedProducts: req.session.visitedProducts });
});





router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send("Product not found");
        res.send(product);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put("/:id", upload.single('image'), async (req, res) => {
    const { name, price, description, category, isFeatured } = req.body;
    const imageUrl = req.file ? path.join('images', req.file.filename) : undefined;

    try {
        const updateData = { name, price, description, category, isFeatured };
        if (imageUrl) updateData.imageUrl = imageUrl;

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedProduct) {
            return res.status(404).send("Product not found");
        }
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).send("Product not found");
        res.send(product);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
