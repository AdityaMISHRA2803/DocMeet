const User = require("../models/User");

exports.getdashboard = async (request, response) => {
    foundUser = request.user;
    response.render("index", { foundUser });
}

exports.setdashboard = async (req, res) => {
    var medname, time, freq;
    medname = req.body.Medicine_name;
    time = req.body.medicine_time;
    freq = req.body.medicine_freq;
    const Founduser = req.user;
    // clg
    const user = await User.findById(Founduser.id);
    // console.log(freq)

    if (user) {
        var d = {
            medname,
            time,
            freq,
        };
        user.details.push(d);

        await user.save();
        res.status(200).redirect("/dashboard");
    } else {
        res.status(404).send("User not found");
    }
}