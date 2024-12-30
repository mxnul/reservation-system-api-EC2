const mongoose = require('mongoose');

const routeModel = require("./routeModel");

const busSchema = new mongoose.Schema(
  {
    busId :{
      type: String,
      required : true,
      unique : true,
    },
    busNumber: {
      type: String,
      required: true,
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
// busSchema.pre('save', function (next) {
//   if (this.isNew && this.capacity) {
//     for (let i = 1; i <= this.capacity; i++) {
//       this.seats.push({ seatNumber: i });
//     }
//   }
//   next();
// });

// Pre-save to initialize or update seats based on capacity
busSchema.pre('save', function (next) {
  if (this.isNew) {
    // Initialize seats when the document is created
    if (this.capacity) {
      for (let i = 1; i <= this.capacity; i++) {
        this.seats.push({ seatNumber: i });
      }
    }
  } else {
    const currentCapacity = this.seats.length;
    // If the capacity is modified, update the seats accordingly
    if (currentCapacity !== this.capacity) {
      const currentCapacity = this.seats.length;

      // If new capacity is greater, add more seats
      if (this.capacity > currentCapacity) {
        for (let i = currentCapacity + 1; i <= this.capacity; i++) {
          this.seats.push({ seatNumber: i });
        }
      }
      
      // If new capacity is smaller, remove excess seats
      else if (this.capacity < currentCapacity) {
        this.seats.splice(this.capacity);
      }
    }
  }
  next();
});


module.exports = mongoose.model('Bus', busSchema);
