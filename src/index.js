require('dotenv').config();
console.log('Environment variables loaded:');
console.log('PORT:', process.env.PORT);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('CONNECTION_STRING:', process.env.CONNECTION_STRING);

const express = require("express");
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes"); 
const routeRoutes = require("./routes/routeRoutes");
const busRoutes = require("./routes/busRoutes");
const tripRoutes = require("./routes/tripRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const cors = require("cors");

dbConnect();

const app = express();




//middleware
app.use(express.json());

app.use(cors({
  origin: "*", // Allow all origins (replace "*" with specific origin(s) in production)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}));

//routes
app.use("/api/auth", authRoutes); 
app.use("/api/users", userRoutes);
app.use("/api/route", routeRoutes);
app.use("/api/bus", busRoutes);
app.use("/api/trip",tripRoutes);
app.use("/api/booking", bookingRoutes);

//start the server
const PORT = process.env.PORT || 7002 ;
app.listen(PORT, () => {
  console.log(`server is running at PORT ${PORT}`);
});
