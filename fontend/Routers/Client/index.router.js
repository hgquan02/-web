// const producRoutes = require("./product.router");
const homeRoutes = require("./home.router");
const blogRoutes = require("./blog.router");
const policyRoutes = require("./policy.router");

module.exports = (app) => {
  app.use("/", homeRoutes);
  app.use("/blog", blogRoutes);
  app.use("/policy", policyRoutes);
      
  // app.use("/products", producRoutes);
}