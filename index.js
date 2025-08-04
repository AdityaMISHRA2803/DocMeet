const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const connectDB = require("./config/db");
const { ensureAuth } = require("./middleware/auth");
const { login } = require("./controller/login");

const appointmentRoute = require("./routes/appointmentRoute");
const profileRoute = require("./routes/profileRoute");
const dashboardRoute = require("./routes/dashRoute");
const calorieRoute = require("./routes/calorieRoute");
const diseaseRoute = require("./routes/diseaseRoute");
const adminRoute = require("./routes/adminRoute");
const helpRoute = require("./routes/helpRouter");
const authRoutes = require("./routes/auth");

dotenv.config({ path: "./config/config.env" });

// Connect to MongoDB
connectDB();

const app = express();

// Static files
app.use(express.static(path.join(__dirname, "/public")));

// Body parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logger
app.use(morgan("dev"));

// Session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

// View engine
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// Passport
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes); // ✅ Fix for Google login
app.get("/", (req, res) => res.render("login")); // Login page
app.use("/dashboard", ensureAuth, dashboardRoute);
app.use("/appointment", ensureAuth, appointmentRoute);
app.use("/disease", ensureAuth, diseaseRoute);
app.use("/calorie_tracker", ensureAuth, calorieRoute);
app.use("/profile", ensureAuth, profileRoute);
app.use("/admin", adminRoute);
app.use("/help", helpRoute);

// Start the reminder service
require("./reminderCron");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
