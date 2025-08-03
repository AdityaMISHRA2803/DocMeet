const express = require('express');
const diseases = require("../controller/diseaseController");

const router = express.Router();

router
    .route('/')
    .get(diseases.getdiseases)

module.exports = router;