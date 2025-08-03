const express = require("express");
const router = express.Router();
const helpController = require("../controller/helpcontroller");

router.get("/help", helpController.renderHelpPage);

module.exports = router;
