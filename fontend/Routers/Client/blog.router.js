const express = require('express');
const router = express.Router();

const controller = require("../../Controllers/Client/blog.controller");
router.get('/', controller.index);

module.exports = router;