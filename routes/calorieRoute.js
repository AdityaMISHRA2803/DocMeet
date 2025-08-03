const express = require('express');
const calorie = require("../controller/calorieController");

const router = express.Router();

router
    .route('/')
    .get(calorie.getCalories)
    .post(calorie.setCalories)

module.exports = router;