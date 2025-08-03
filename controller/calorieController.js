const User = require("../models/User");
const fetch = require("node-fetch");

exports.getCalories = async (req, res) => {
    const foundUser = req.user;
    res.render("calorie", { meals: foundUser.meals });
}
var food, times, calories;

exports.setCalories = async (req, res) => {
<<<<<<< HEAD
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
=======
    const food = req.body.Item?.trim();
    const times = Number(req.body.times);
    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).send("User not found");
    }

    // Step 1: Validate food input
    if (!food) {
        return res.status(400).send("Ingredient name is required");
    }

    // Step 2: Build API URL
    const URL = `https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}&ingr=${encodeURIComponent(food)}`;

    try {
        // Step 3: Fetch from Edamam
        const response = await fetch(URL);
        const jsonData = await response.json();

        // Step 4: Validate API response
        if (!jsonData.parsed || !jsonData.parsed.length) {
            return res.status(404).send("Ingredient not found in food database.");
        }

        const calories = times * jsonData.parsed[0].food.nutrients.ENERC_KCAL;

        // Step 5: Save to DB
        const meal = {
            food,
            calories,
            times,
        };

        user.meals.push(meal);
        await user.save();

        res.status(200).redirect("/calorie_tracker");

    } catch (err) {
        console.error("Fetch error:", err.message);
        res.status(500).send("Error fetching calorie data.");
    }
};

>>>>>>> 4843a4fd38a4b89cf775f44a4a3974757e3ac81e
