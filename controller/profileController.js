const User = require("../models/User");


exports.getProfile = async (request, response) => {
    const foundUser = request.user;
    response.render("profile", { foundUser, userDetails: foundUser.userDetails });
}
var name, mobile, mail, address, weight, height, gen, BMI, bg;

exports.setProfile = async (request, response) => {
    name = request.body.Name;
    mobile = request.body.phone;
    bg = request.body.blood_grp;
    mail = request.body.Email1;
    address = request.body.address;
    weight = Number(request.body.Weight);
    height = Number(request.body.Height);
    gen = request.body.gender;
    BMI = (weight * 100 * 100) / (height * height);
    BMI = BMI.toFixed(1);

    // console.log("profile", mobile);
    const Founduser = request.user;
    try {
        const user = await User.findById(Founduser.id);

        if (user) {
            user.displayName = name;
            var d = {
                weight,
                height,
                gen,
                BMI,
                bg,
                address,
                mail,
                mobile,
            };
            user.userDetails = d;
            await user.save();
            // res.status(200).redirect("/dashboard");
            response.redirect("/profile");
        } else {
            response.status(404).send("User not found");
        }
    } catch (err) {
        console.error(err);
        response.status(500).send("Server Error");
    }
}