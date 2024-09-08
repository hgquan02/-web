const express = require('express');
const router = express.Router();

const controller = require("../../Controllers/Admin/dashboard.controller");
router.get('/', controller.dashboard);

module.exports = router;