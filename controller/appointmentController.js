const User = require("../models/User");
const Appointment = require("../models/Appointment");

exports.getAppointment = async (req, res) => {
  try {
    const currentUser = req.user;
    const currentDate = new Date();

    // Get only this user's upcoming appointments
    const appointments = await Appointment.find({
      user: currentUser._id,
      date: { $gte: currentDate },
    });

    appointments.sort((a, b) => a.date - b.date);

    res.render("appointment", { appointments });
  } catch (err) {
    console.error("Error in getAppointment:", err);
    res.status(500).send("Server Error");
  }
};

exports.setAppointment = async (req, res) => {
  const currentUser = req.user;

  try {
    const user = await User.findById(currentUser.id);
    if (!user) return res.status(404).send("User not found");

    const { date, start_time, end_time, description } = req.body;

    // Convert dd/mm/yyyy + start_time => proper JS Date
    const [dd, mm, yyyy] = date.split("/");
    const appointmentDateTime = new Date(`${yyyy}-${mm}-${dd}T${start_time}:00`);

    const newAppointment = await Appointment.create({
      user: user._id,
      date: appointmentDateTime,
      start_time,
      end_time,
      description,
      reminderSent: false, // important for email system
    });

    user.appointments.push(newAppointment._id);
    await user.save();

    res.status(200).redirect("/appointment");
  } catch (err) {
    console.error("Error in setAppointment:", err);
    res.status(500).send("Server Error");
  }
};
