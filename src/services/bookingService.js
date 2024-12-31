const Booking = require("../models/bookingModel");
const Route = require("../models/routeModel"); // Import the Route model
const Bus = require("../models/busModel");     // Import the Bus model
const Trip = require("../models/tripModel");   // Import the Trip model

// const createBooking = async (req, res) => {
//   try {
//     const { routeId, busId, tripId, passengerName, Email, seatNumber } = req.body;

//     // Check if the route exists
//     const route = await Route.findOne({ routeId });
//     if (!route) {
//       return res.status(404).json({ message: "Route not found" });
//     }

//     // Check if the bus exists and get its capacity
//     const bus = await Bus.findOne({ busId });
//     if (!bus) {
//       return res.status(404).json({ message: "Bus not found" });
//     }

//     const { capacity } = bus;

//     // Check if the trip exists
//     const trip = await Trip.findOne({ tripId });
//     if (!trip) {
//       return res.status(404).json({ message: "Trip not found" });
//     }

//     // Check if the seat number is already booked for the given route, bus, and trip
//     const existingBooking = await Booking.findOne({
//       routeId,
//       busId,
//       tripId,
//       seatNumber,
//       status: { $ne: 'cancelled' }, // Exclude cancelled bookings
//     });

//     if (existingBooking) {
//       return res.status(400).json({ message: `Seat ${seatNumber} is already booked for this trip.` });
//     }

//     // Check if the total bookings for this bus exceed its capacity
//     const totalBookingsForBus = await Booking.countDocuments({
//       routeId,
//       busId,
//       tripId,
//       status: { $ne: 'cancelled' }, // Exclude cancelled bookings
//     });

//     if (totalBookingsForBus >= capacity) {
//       return res.status(400).json({ message: `Bus is fully booked (capacity: ${capacity}).` });
//     }

//     // Create the booking
//     const booking = new Booking({
//       routeId,
//       busId,
//       tripId,
//       passengerName,
//       Email,
//       seatNumber,
//       status: 'confirmed', // Confirm the booking
//     });

//     await booking.save();
//     res.status(201).json(booking);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
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

    const { capacity, seats } = bus;

    // Check if the trip exists
    const trip = await Trip.findOne({ tripId });
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // Check if the seat number is available for the given bus
    const seat = bus.seats.find(seat => seat.seatNumber === seatNumber);
    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }

    if (seat.status === 'booked') {
      return res.status(400).json({ message: `Seat ${seatNumber} is already booked.` });
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

    // Save the booking
    await booking.save();

    // Update the seat status in the Bus model to 'booked'
    seat.status = 'booked';
    await bus.save(); // Save the updated bus

    // Return the booking and success response
    res.status(201).json({ message: 'Booking confirmed', booking });
  } catch (error) {
    console.error('Error creating booking:', error.message);
    res.status(500).json({ message: error.message });
  }
};


// const getAllBookings = async (req, res) => {
//   try {
//     // Fetch all bookings and populate associated routeId, busId, and tripId
//     const bookings = await Booking.find({})
//       //  .populate("routeId")
//       //  .populate("busId")
//       //  .populate("tripId");

//     // If you need further processing or adding custom keys
//     const bookingsWithDetails = bookings.map((booking) => ({
//       ...booking.toObject(), // Convert the Mongoose document to a plain object
//       route: booking.routeId || null, // Include route details or null if not found
//       routeName: booking.routeName || null,
//       bus: booking.busId || null, // Include bus details or null if not found
//       busNumber : booking.busNumber || null,
//       trip: booking.tripId || null, // Include trip details or null if not found
//       tripTime : booking.departureTime || null,
//     }));

//     res.status(200).json(bookingsWithDetails); // Return enriched list of bookings
//   } catch (error) {
//     console.error("Error fetching all bookings:", error); // Log for debugging
//     res.status(500).json({ message: error.message }); // Handle any server error
//   }
// };

const getAllBookings = async (req, res) => {
  try {
    // Fetch all bookings
    const bookings = await Booking.find({});
    // console.log('bookings  : ',bookings);
    
    // Iterate through each booking and fetch additional details from Route, Bus, and Trip collections
    const bookingsWithDetails = await Promise.all(bookings.map(async (booking) => {
      // Fetch route details based on the routeId
      const route = await Route.findOne({routeId : booking.routeId});
      console.log('route  : ',route);
      
      // Fetch bus details based on the busId
      const bus = await Bus.findOne({busId : booking.busId});
      
      // Fetch trip details based on the tripId
      const trip = await Trip.findOne({tripId : booking.tripId});
      
      // Return enriched booking data
      return {
        ...booking.toObject(), // Convert the Mongoose document to a plain object
      route: booking.routeId || null, // Include route details or null if not found
      bus: booking.busId || null, // Include bus details or null if not found
      trip: booking.tripId || null, // Include trip details or null if not found
        routeName: route ? route.name : null, // Example of adding the route name
        busNumber: bus ? bus.number : null, // Example of adding the bus number
        tripTime: trip ? trip.departureTime : null, // Example of adding the trip time
      };
    }));

    // Return enriched list of bookings with trip details
    res.status(200).json(bookingsWithDetails);
  } catch (error) {
    console.error("Error fetching all bookings:", error); // Log for debugging
    res.status(500).json({ message: error.message }); // Handle any server error
  }
};


// const getAllScheduledTrips = async (req, res) => {
//   try {
//     // Fetch all scheduled trips
//     const trips = await ScheduledTrip.find({});

//     // Fetch associated route and bus details for each trip
//     const tripsWithDetails = await Promise.all(
//       trips.map(async (trip) => {
//         const route = await Route.findOne({ routeId: trip.routeId });
//         const bus = await Bus.findOne({ busId: trip.busId });
//         return {
//           ...trip.toObject(),
//           route: route || null, // Include route details (or null if not found)
//           bus: bus || null,     // Include bus details (or null if not found)
//         };
//       })
//     );

//     res.status(200).json(tripsWithDetails); // Return enriched list of trips
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


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