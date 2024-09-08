const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    // slug: {
    //   type: String,
    //   slug: "title",
    //   unique: true
    // },
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  // },{
  //   timestamps: true
  }
  );

const Blog = mongoose.model('Blog', BlogSchema, "blog");
module.exports = Blog;

