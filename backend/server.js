const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const enrollRoutes = require('./routes/enroll');
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/admin");
import courseRoutes from './routes/courseRoutes.js';

dotenv.config();
connectDB();
const app = express();

// ✅ Allowed origins for dev and production
const allowedOrigins = [
  "http://localhost:5173", // dev frontend
  "https://login-vercel-frontend.vercel.app" // deployed frontend
];

// ✅ CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes); // ← admin routes
let enrollments = [];

// List of valid coupons (case-insensitive)
const validCoupons = ['MAHI1', 'FREECOURSE', 'DISCOUNT20'];

// Endpoint for course enrollment
app.post('/api/enroll', (req, res) => {
  const { courseId, studentName, studentEmail, coupon } = req.body;

  // Normalize coupon code to uppercase to handle case-insensitivity
  const couponCode = coupon ? coupon.trim().toUpperCase() : '';

  // Validate coupon
  if (coupon && !validCoupons.includes(couponCode)) {
    return res.status(400).json({ error: 'Invalid coupon code.' });
  }

  // If the coupon is valid, mark the enrollment as free
  const enrollmentPrice = couponCode ? 0 : 100; // Free if valid coupon is applied

  // Store enrollment details (in this case, just pushing to an array)
  enrollments.push({
    courseId,
    studentName,
    studentEmail,
    coupon: couponCode || 'No coupon',
    price: enrollmentPrice,
  });

  // If no coupon, proceed with payment logic (this is a placeholder)
  if (!couponCode) {
    // Normally, you would trigger the payment system here.
    // For now, just return a message indicating that payment is required.
    return res.status(200).json({ message: 'Enrollment successful, proceed with payment.' });
  }

  // Otherwise, confirm free enrollment if coupon is valid
  res.status(200).json({ message: 'Enrollment successful with coupon!' });
});

app.use('/api/enroll', enrollRoutes);
const courseRoutes = require('./routes/courseRoutes');
app.use('/api/courses', courseRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
