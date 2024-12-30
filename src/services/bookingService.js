const Booking = require("../models/bookingModel");
const Route = require("../models/routeModel"); // Import the Route model
const Bus = require("../models/busModel");     // Import the Bus model
const Trip = require("../models/tripModel");   // Import the Trip model

const createBooking = async (req, res) => {
  try {
    const { routeId, busId, tripId, passengerName, Email, seatNumber } = req.body;

    // Check if the route exists
    const route = await Route.findOne({ routeId });
    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    // Check if the bus exists and get its capacity
    const bus = await Bus.findOne({ busId });
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const { capacity } = bus;

    // Check if the trip exists
    const trip = await Trip.findOne({ tripId });
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // Check if the seat number is already booked for the given route, bus, and trip
    const existingBooking = await Booking.findOne({
      routeId,
      busId,
      tripId,
      seatNumber,
      status: { $ne: 'cancelled' }, // Exclude cancelled bookings
    });

    if (existingBooking) {
      return res.status(400).json({ message: `Seat ${seatNumber} is already booked for this trip.` });
    }

    // Check if the total bookings for this bus exceed its capacity
    const totalBookingsForBus = await Booking.countDocuments({
      routeId,
      busId,
      tripId,
      status: { $ne: 'cancelled' }, // Exclude cancelled bookings
    });

    if (totalBookingsForBus >= capacity) {
      return res.status(400).json({ message: `Bus is fully booked (capacity: ${capacity}).` });
    }

    // Create the booking
    const booking = new Booking({
      routeId,
      busId,
      tripId,
      passengerName,
      Email,
      seatNumber,
      status: 'confirmed', // Confirm the booking
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllBookings = async (req, res) => {
  try {
    // Fetch all bookings and populate associated details
    const bookings = await Booking.find({}).populate("routeId busId tripId");
    res.status(200).json(bookings); // Return the list of bookings
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any server error
  }
};

const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params; // Extract bookingId from URL parameters

    // Find the booking by ID and populate associated details
    const booking = await Booking.findById(bookingId).populate("routeId busId tripId");

    if (!booking) {
      return res.status(404).json({ message: `Booking with ID ${bookingId} not found` });
    }

    res.status(200).json(booking); // Return the found booking
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any server error
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params; // Extract bookingId from URL parameters

    // Update the booking status to "cancelled"
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "cancelled" },
      { new: true } // Return the updated booking
    );

    if (!booking) {
      return res.status(404).json({ message: `Booking with ID ${bookingId} not found` });
    }

    res.status(200).json(booking); // Return the cancelled booking
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any server error
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  cancelBooking,
};