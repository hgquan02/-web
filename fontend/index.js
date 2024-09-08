const express = require('express');
const router = require("./Routers/Client/index.router");
const routerAdmin = require("./Routers/admin/index.router");
const systemConfig = require("./config/system");

require("dotenv").config();

const database = require("./config/database");



const app = express();
const port = process.env.PORT || 3000 ;

app.set("views", "./Views");
app.set("view engine", "pug");

database.connect();
// Phân trang blog

//end Phân trang blog

app.locals.preFixAdmin = systemConfig.prefixAdmin;

app.use(express.static(`./Public`));


router(app);
routerAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});