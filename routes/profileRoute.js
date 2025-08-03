const express = require('express');
const profile = require("../controller/profileController");
const router = express.Router();

router
    .route('/')
    .get(profile.getProfile)
    .post(profile.setProfile);

module.exports = router;

