const Appointment = require("../models/Appointment");

exports.getInfo = async (req, res) => {
    const currentDate = new Date();

    const upcomingAppointments = await Appointment.find({
        date: { $gte: currentDate },
    }).sort("date");

    res.render("admin.ejs", { appointments: upcomingAppointments });
}