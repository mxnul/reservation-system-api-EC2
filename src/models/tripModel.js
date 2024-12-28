const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    tripId :{
      type: String,
      required : true,
      unique : true,
    },
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Route',
      required: true,
    },
    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bus',
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Trip', tripSchema);
