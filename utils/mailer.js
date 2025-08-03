const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendReminderEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"DocMeet" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
  } catch (err) {
    console.error("Email sending error:", err);
  }
};

const sendWelcomeEmail = async (to, name = "User") => {
  const subject = "Welcome to DocMeet 👋";
  const message = `Hello ${name},\n\nWelcome to DocMeet! We're excited to have you onboard. Book appointments, get reminders, and manage your health with ease.\n\nStay healthy,\nThe DocMeet Team`;

  await sendReminderEmail(to, subject, message); // reusing main mail function
};

module.exports = {
  sendReminderEmail,
  sendWelcomeEmail
};
