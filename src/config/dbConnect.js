const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Database connected: Host - ${connect.connection.host}, Database - ${connect.connection.name}`
    );
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
    process.exit(1); // Exit process if unable to connect
  }
};

module.exports = dbConnect;
