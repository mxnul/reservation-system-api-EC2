const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema(
  {
    routeId :{
      type: String,
      required : true,
      unique : true
    },
    origin :{
      type: String,
      required : true,
     
    },
    destination :{
      type: String,
      required : true,
     
    },
    duration :{
      type: String,
      required : true,
     
    },
    stops :{
      type: String,
      required : true,
     
    },
    

  },
  {
    timestamps : true
  }
)

module.exports = mongoose.model("Route", routeSchema);