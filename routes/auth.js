const express = require("express");
const passport = require("passport");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const { login } = require("../controller/login");
const router = express.Router();

router.get("/", ensureGuest, (req, res) => {
  res.status(200).render("login");
});

// @desc    Auth with Google
// @route   GET /auth/google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

//@desc logout user
//@route /auth/logout
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
