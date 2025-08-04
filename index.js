const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const passport = require("passport");
const { ensureAuth, ensureGuest } = require("./middleware/auth");
const { login } = require("./controller/login");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");

const appointmentRoute = require("./routes/appointmentRoute");
const profileRoute = require("./routes/profileRoute");
const dashboardRoute = require("./routes/dashRoute");
const calorieRoute = require("./routes/calorieRoute");
const diseaseRoute = require("./routes/diseaseRoute");
const adminRoute = require("./routes/adminRoute");

dotenv.config({ path: "./config/config.env" });

// Connecting to database
connectDB();

const app = express();

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

// Session middleware
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

// View engine setup
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// Passport
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./routes/auth"));
app.use("/dashboard", ensureAuth, dashboardRoute);
app.use("/appointment", ensureAuth, appointmentRoute);
app.use("/disease", ensureAuth, diseaseRoute);
app.use("/calorie_tracker", ensureAuth, calorieRoute);
app.use("/profile", ensureAuth, profileRoute);
app.use("/admin", adminRoute);
app.use("/help", require("./routes/helpRouter"));

// ✅ Start the email reminder service
require("./reminderCron");

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on ${PORT}`));
