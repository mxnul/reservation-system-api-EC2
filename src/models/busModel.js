const mongoose = require('mongoose');

const routeModel = require("./routeModel");

const busSchema = new mongoose.Schema(
  {
    busId :{
      type: String,
      required : true,
      unique : true,
    },
    
    routeId: {
      type: String,
      ref: 'Route',
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    seats: {
      type: [
        {
          seatNumber: { type: Number, required: true },
          status: { type: String, enum: ['available', 'booked'], default: 'available' },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

// Pre-save to initialize seats based on capacity
busSchema.pre('save', function (next) {
  if (this.isNew && this.capacity) {
    for (let i = 1; i <= this.capacity; i++) {
      this.seats.push({ seatNumber: i });
    }
  }
  next();
});

module.exports = mongoose.model('Bus', busSchema);
