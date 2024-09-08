// const paginationHelper = require("../../helpers/pagination");
const Blog = require("../../models/blog.model");

module.exports.index = async (req, res) => {
  const blog = await Blog.find({
    status: "active",
    deleted: false
  });
  

  res.render("Client/Pages/Blogs/index",{
    pageTitle: "Trang Blogs",
    blog : blog 
  });
};

