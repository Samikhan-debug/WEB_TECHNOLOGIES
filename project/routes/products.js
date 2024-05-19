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
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        imageUrl: imageUrl
    });

    try {
        const savedProduct = await product.save();
        res.status(201).send(savedProduct);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;
        
        const total = await Product.countDocuments();
        const products = await Product.find().skip(skip).limit(limit);

        console.log({ products, totalPages: Math.ceil(total / limit), currentPage: page }); // Log to see output
        res.json({
            products,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

// GET: Retrieve a single product by ID
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send("Product not found");
        res.send(product);
    } catch (err) {
        res.status(500).send(err);
    }
});

// PUT: Update a product
router.put("/:id", upload.single('image'), async (req, res) => {
    const updateData = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        imageUrl: req.file ? path.join('images', req.file.filename) : undefined
    };

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedProduct) {
            return res.status(404).send("Product not found");
        }
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).send(err);
    }
});

// DELETE: Delete a product
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