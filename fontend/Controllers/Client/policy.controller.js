// const paginationHelper = require("../../helpers/pagination");
// const Policy = require("../../models/blog.model");

module.exports.index = async (req, res) => {
  res.render("Client/Pages/Policy/index",{
    pageTitle: "Trang chính sách khách hàng"
  });
};

