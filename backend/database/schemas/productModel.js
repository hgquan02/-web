const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  original_price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  category: {
    type: String, // Ví dụ: 'Trang điểm', 'Chăm sóc da', 'Nước hoa'
    required: true
  },
  subcategory: {
    type: String, // Ví dụ: 'Son môi', 'Chăm sóc cơ thể', 'Nước hoa cao cấp'
    required: true
  },
  sold: {
    type: Number,
    default: 0
  },
  imageUrl: {
    type: [String],  // Mảng chứa đường dẫn hình ảnh sản phẩm
    required: true
  },
  colors: {
    type: [String],  // Mảng chứa các tùy chọn màu sắc sản phẩm
    required: true
  },
  gifts: {
    type: [String],  // Mảng chứa các quà tặng kèm theo
    required: false
  },
  quantity_options: {
    type: [String],  // Mảng chứa các tùy chọn dung tích/số lượng (ví dụ: 250ml, 500ml)
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  usage_instructions: {
    type: String,  // Hướng dẫn sử dụng sản phẩm
    required: true
  },
  basic_info: {
    preservation: {
      type: String,  // Thông tin về cách bảo quản
      required: true
    },
    expiry_date: {
      type: String,  // Thông tin về hạn sử dụng
      required: true
    },
    volume: {
      type: String,  // Thông tin về dung tích
      required: true
    }
  },
  ingredients: {
    type: String,  // Thành phần công thức của sản phẩm
    required: true
  },
  origin_info: {
    manufacturing_country: {
      type: String,  // Quốc gia sản xuất
      required: true
    },
    distribution_company: {
      type: String,  // Công ty phân phối
      required: true
    }
  },
  brand_info: {
    type: String,  // Thông tin về thương hiệu sản phẩm
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Tạo model Product từ schema productSchema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
