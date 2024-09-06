const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const models = reqlib('database').models
const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Cấu hình nơi lưu trữ file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Thư mục lưu ảnh trên VPS
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // Tạo tên file với timestamp
    }
})

// Khởi tạo upload với cấu hình
const upload = multer({ storage: storage })

module.exports = () => {

    // Tạo sản phẩm mới
    router.post('/create-products', upload.single('image'), async (req, res) => {
        try {
            // Đường dẫn URL của ảnh sẽ được lưu trong MongoDB
            const imageUrl = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
            
            const newProduct = new models.Product({
                ...req.body,
                imageUrl: imageUrl // Lưu URL của ảnh
            });
            
            const product = await newProduct.save();
            return res.status(201).json({ status: 1, data: product, message: 'Product created successfully' });
        } catch (error) {
            return res.status(400).json({ status: 0, data: null, message: error.message });
        }
    });

    // Lấy tất cả sản phẩm
    router.get('/get-products', async (req, res) => {
        try {
            const products = await models.Product.find();
            return res.status(200).json({ status: 1, data: products, message: 'Success' });
        } catch (error) {
            return res.status(400).json({ status: 0, data: null, message: error.message });
        }
    });

    // Lấy sản phẩm theo ID
    router.get('/get-products/:id', async (req, res) => {
        try {
            const product = await models.Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ status: 0, data: null, message: 'Product not found' });
            }
            return res.status(200).json({ status: 1, data: product, message: 'Success' });
        } catch (error) {
            return res.status(400).json({ status: 0, data: null, message: error.message });
        }
    });

    // Cập nhật sản phẩm theo ID (với nhiều ảnh)
    router.put('/update-products/:id', async (req, res) => {
        try {
            const product = await models.Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ status: 0, data: null, message: 'Product not found' });
            }

            // So sánh ảnh cũ và mới
            const oldImages = product.imageUrl;  // Mảng ảnh cũ
            const newImages = req.body.imageUrl;  // Mảng ảnh mới được gửi từ client

            // Tìm và xóa ảnh cũ không còn trong danh sách mới
            const imagesToDelete = oldImages.filter(image => !newImages.includes(image));
            imagesToDelete.forEach(imageUrl => {
                const imagePath = path.join(__dirname, '../uploads/', imageUrl.split('/uploads/')[1]);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        return res.status(500).json({ status: 0, data: null, message: 'Error deleting old image file' });
                    }
                });
            });

            // Cập nhật thông tin sản phẩm (bao gồm danh sách ảnh mới)
            const updatedProduct = await models.Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).json({ status: 1, data: updatedProduct, message: 'Product updated successfully' });

        } catch (error) {
            return res.status(400).json({ status: 0, data: null, message: error.message });
        }
    });

    // Xóa sản phẩm theo ID và xóa toàn bộ ảnh liên quan
    router.delete('/products/:id', async (req, res) => {
        try {
            const product = await models.Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ status: 0, data: null, message: 'Product not found' });
            }

            // Lấy danh sách các URL ảnh của sản phẩm từ mảng imageUrl
            const imagesToDelete = product.imageUrl;  // Mảng chứa đường dẫn hình ảnh sản phẩm

            // Xóa toàn bộ ảnh khỏi VPS
            imagesToDelete.forEach(imageUrl => {
                const imagePath = path.join(__dirname, '../uploads/', imageUrl.split('/uploads/')[1]);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        return res.status(500).json({ status: 0, data: null, message: 'Error deleting image file' });
                    }
                });
            });

            // Xóa sản phẩm khỏi MongoDB
            await models.Product.findByIdAndDelete(req.params.id);

            return res.status(200).json({ status: 1, data: null, message: 'Product and images deleted successfully' });
        } catch (error) {
            return res.status(400).json({ status: 0, data: null, message: error.message });
        }
    });

    // Tìm kiếm sản phẩm theo tên
    router.get('/get-products/search', async (req, res) => {
        try {
            const { name } = req.query;
            const products = await models.Product.find({
                name: { $regex: name, $options: 'i' }
            });
            return res.status(200).json({ status: 1, data: products, message: 'Success' });
        } catch (error) {
            return res.status(400).json({ status: 0, data: null, message: error.message });
        }
    });

    // Lọc sản phẩm theo giá
    router.get('/get-products/filter', async (req, res) => {
        try {
            const { minPrice, maxPrice } = req.query;
            const filter = {};
            if (minPrice) filter['price'] = { $gte: minPrice };
            if (maxPrice) filter['price'] = { ...filter['price'], $lte: maxPrice };

            const products = await models.Product.find(filter);
            return res.status(200).json({ status: 1, data: products, message: 'Success' });
        } catch (error) {
            return res.status(400).json({ status: 0, data: null, message: error.message });
        }
    });

    // Lấy sản phẩm theo loại
    router.get('/get-products/category', async (req, res) => {
        try {
            const { category } = req.query;
            const products = await models.Product.find({ category: category });
            return res.status(200).json({ status: 1, data: products, message: 'Success' });
        } catch (error) {
            return res.status(400).json({ status: 0, data: null, message: error.message });
        }
    });

    return router;
}
