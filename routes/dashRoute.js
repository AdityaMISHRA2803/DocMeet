const express = require('express');
const dashboard = require("../controller/dashController");

const router = express.Router();

router
    .route('/')
    .get(dashboard.getdashboard)
    .post(dashboard.setdashboard)

module.exports = router;