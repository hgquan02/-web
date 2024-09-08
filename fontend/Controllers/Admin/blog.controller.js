module.exports.blog = (req, res) => {
  res.render("admin/pages/blogs/index",{
    pageTitle: "Trang blog"
  });
};