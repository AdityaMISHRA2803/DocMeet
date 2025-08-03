<<<<<<< HEAD
// connection to mongodb
const mongoose = require("mongoose");

=======
const mongoose = require("mongoose");

mongoose.set('strictQuery', true); // Add this line to suppress warning

>>>>>>> 4843a4fd38a4b89cf775f44a4a3974757e3ac81e
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
