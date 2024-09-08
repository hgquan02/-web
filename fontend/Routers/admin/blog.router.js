const express = require('express');
const router = express.Router();

const controller = require("../../Controllers/Admin/blog.controller");
router.get('/', controller.blog);

module.exports = router;