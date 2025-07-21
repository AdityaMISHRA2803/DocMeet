const express = require('express');
const appointments = require("../controller/appointmentController");

const router = express.Router();

router
    .route("/")
    .get(appointments.getAppointment)
    .post(appointments.setAppointment);

router

module.exports = router;