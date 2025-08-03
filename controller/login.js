const User = require("../models/User");
<<<<<<< HEAD
const { sendWelcomeEmail } = require("../utils/mailer");

exports.login = async (req, res) => {
  try {
    // Fetch the logged-in user using Google ID
    const user = await User.findOne({ googleId: req.user.googleId });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // ✅ Send welcome email every time user logs in
    if (user.email) {
      await sendWelcomeEmail(user.email, user.name || req.user.displayName || "User");
    }

    // Redirect to dashboard after login
    res.redirect("/dashboard");
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Internal server error during login");
  }
=======

exports.login = async (req, res) => {

  const user = await User.find({ googleId: req.user.googleId }).lean();
  //   console.log(user[0]);
  const foundUser = user[0];
  //   console.log(req.user.displayName);
  res.redirect("/dashboard");
>>>>>>> 4843a4fd38a4b89cf775f44a4a3974757e3ac81e
};
