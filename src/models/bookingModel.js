const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
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
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: true,
    },
    passengerName: {
      type: String,
      required: true,
    },
    seatNumber: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled'],
      default: 'confirmed',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
