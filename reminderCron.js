const cron = require("node-cron");
const moment = require("moment");
const Appointment = require("./models/Appointment");
const User = require("./models/User");
const sendReminderEmail = require("./utils/mailer");

cron.schedule("* * * * *", async () => {
  const now = moment();
  const target = now.clone().add(10, "minutes");

  const appointments = await Appointment.find({
    reminderSent: false,
    date: {
      $gte: now.toDate(),
      $lte: target.toDate(),
    },
  }).populate("user");

  for (let appt of appointments) {
    if (!appt.user?.email) continue;

    const mailText = `Hello ${appt.user.name || "User"},\n\nThis is a reminder that you have an appointment scheduled at ${appt.date.toLocaleString()}.\n\nStay healthy!\nDocMeet`;

    await sendReminderEmail(appt.user.email, "Appointment Reminder", mailText);

    appt.reminderSent = true;
    await appt.save();
  }
});

console.log("⏰ Reminder service running every minute...");

module.exports = cron;