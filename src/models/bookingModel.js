const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    routeId: {
      type: String,
      ref: 'Route',
      required: true,
    },
    busId: {
      type: String,
      ref: 'Bus',
      required: true,
    },
    tripId: {
      type: String,
      ref: 'Trip',
      required: true,
    },
    passengerName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },

    seatNumber: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'confirmed', 'cancelled'],
      default: 'available',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
