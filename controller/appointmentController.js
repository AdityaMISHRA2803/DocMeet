const User = require("../models/User");
const Appointment = require("../models/Appointment");

exports.getAppointment = async (request, response) => {
    const foundUser = request.user;
    // console.log(foundUser);
    const currentDate = new Date();
    const appointments = await Appointment.find({
        date: { $gte: currentDate },
    });
    appointments.sort((a, b) => a.date - b.date);
    response.render("appointment", { appointments: appointments })
}

exports.setAppointment = async (req, res) => {
    const Founduser = req.user;
    try {
        const user = await User.findById(Founduser.id);
        if (user) {
            const appointmentDateStr = req.body.date;
            const arr = appointmentDateStr.split("/");
            const appointDate = new Date(`${arr[2]}-${arr[1]}-${arr[0]}`);
            // console.log(appointDate);
            var appoint = await Appointment.create({
                ...req.body,
                user: user._id,
                date: appointDate,
            });
            user.appointments.push(appoint._id);

            await user.save();
            res.status(200).redirect("/appointment");
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};
