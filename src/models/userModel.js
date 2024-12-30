const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email :{
      type: String,
      required: true,
      unique : true,
    },

    password :{
      type: String,
      required: true,
     
    },

    fullname :{
      type: String,
      required: true,
     
    },

    mobilenumber:{
      type: String,
      required: true,
     
    },


    role: {
      type: String,
      required: true,
      enum : ["admin","operater"],
     
    },

},
{
  timestamps: true,
}


);

module.exports = mongoose.model("User", userSchema);