const User = require("../models/User");
const { sendWelcomeEmail } = require("../utils/mailer");

exports.login = async (req, res) => {
  try {
    // Find the user based on Google ID
    const user = await User.findOne({ googleId: req.user.googleId });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Send welcome email
    if (user.email) {
      await sendWelcomeEmail(user.email, user.name || req.user.displayName || "User");
    }

    // Redirect to dashboard
    res.redirect("/dashboard");
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Internal server error during login");
  }
};
