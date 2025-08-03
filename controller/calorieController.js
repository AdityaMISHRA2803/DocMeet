const User = require("../models/User");
const fetch = require("node-fetch");

exports.getCalories = async (req, res) => {
  const foundUser = req.user;
  res.render("calorie", { meals: foundUser.meals });
};

exports.setCalories = async (req, res) => {
  const food = req.body.Item?.trim();
  const times = Number(req.body.times);
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).send("User not found");
  }

  if (!food) {
    return res.status(400).send("Ingredient name is required");
  }

  const URL = `https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}&ingr=${encodeURIComponent(food)}`;

  try {
    const response = await fetch(URL);

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await response.text(); // read HTML body
      console.error("Invalid API response (non-JSON):", text);
      return res.status(502).send("Invalid response from calorie API");
    }

    const jsonData = await response.json();

    if (!jsonData.parsed || !jsonData.parsed.length) {
      return res.status(404).send("Ingredient not found in food database.");
    }

    const calories = times * jsonData.parsed[0].food.nutrients.ENERC_KCAL;

    user.meals.push({ food, calories, times });
    await user.save();

    res.status(200).redirect("/calorie_tracker");

  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).send("Error fetching calorie data.");
  }
};
