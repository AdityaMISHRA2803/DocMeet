const User = require("../models/User");
const fetch = require("node-fetch");

exports.getCalories = async (req, res) => {
    const foundUser = req.user;
    res.render("calorie", { meals: foundUser.meals });
}
var food, times, calories;

exports.setCalories = async (req, res) => {
    food = req.body.Item;
    times = Number(req.body.times);
    // console.log(food, times);
    const URL = `https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}&ingr=${food}`;
    const Founduser = req.user;
    const user = await User.findById(Founduser.id);

    if (user) {
        fetch(URL)
            .then(response => response.json())
            .then(jsonData => {
                calories = times * jsonData.parsed[0].food.nutrients.ENERC_KCAL;
            }).then(async () => {
                var d = {
                    food,
                    calories,
                    times,
                };
                user.meals.push(d);
                await user.save();
                res.status(200).redirect("/calorie_tracker");
            })
    } else {
        {
            res.status(404).send("User not found");
        }
    }
}
