const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes"); 
const routeRoutes = require("./routes/routeRoutes");

dbConnect();

const app = express();

//middleware
app.use(express.json());

//routes
app.use("/api/auth", authRoutes); 
app.use("/api/users", userRoutes);

app.use("/api/route", routeRoutes);


//start the server
const PORT = process.env.PORT || 7002 ;
app.listen(PORT, () => {
  console.log(`server is running at PORT ${PORT}`)
});