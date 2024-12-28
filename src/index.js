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

dbConnect();

const app = express();

//middleware
app.use(express.json());

//routes
app.use("/api/auth", authRoutes); 
app.use("/api/users", userRoutes);
app.use("/api/route", routeRoutes);
app.use("/api/bus", busRoutes);

//start the server
const PORT = process.env.PORT || 7002 ;
app.listen(PORT, () => {
  console.log(`server is running at PORT ${PORT}`);
});
