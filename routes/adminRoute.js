const express = require('express');
const adminInfo = require("../controller/adminController");

const router = express.Router();

router
    .route("/")
    .get(adminInfo.getInfo)

router

module.exports = router;