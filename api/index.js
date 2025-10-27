const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const MONGO_URI = process.env.MONGO_DB;

  if (!MONGO_URI) {
    throw new Error("MONGO_DB environment variable is not set");
  }

  try {
    const connection = await mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    });

    cachedDb = connection;
    console.log("✓ Connected to MongoDB successfully!");
    return connection;
  } catch (err) {
    console.error("✗ MongoDB connection error:", err);
    throw err;
  }
}

// Registration Schema
const registrationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address with @ and domain",
      ],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{9}$/, "Phone number must be exactly 9 digits"],
    },
    countryCode: {
      type: String,
      required: true,
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create or get model
const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);

// API Routes

// Health check endpoint
app.get("/api/health", async (req, res) => {
  try {
    await connectToDatabase();
    res.json({
      status: "ok",
      message: "Server is running",
      database:
        mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// Registration endpoint
app.post("/api/register", async (req, res) => {
  try {
    await connectToDatabase();

    const { firstName, lastName, email, phone, countryCode } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !countryCode) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Trim whitespace
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.trim();

    // Validate email format (must contain @ and .)
    if (!trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address with @ and domain",
      });
    }

    // Additional email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Validate phone number (exactly 9 digits)
    const phoneRegex = /^\d{9}$/;
    if (!phoneRegex.test(trimmedPhone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be exactly 9 digits",
      });
    }

    // Check if email already exists
    const existingUser = await Registration.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "This email is already registered",
      });
    }

    // Create new registration
    const newRegistration = new Registration({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: trimmedEmail,
      phone: trimmedPhone,
      countryCode,
      timestamp: new Date(),
    });

    // Save to database
    await newRegistration.save();

    console.log("✓ New registration saved:", trimmedEmail);

    res.status(201).json({
      success: true,
      message: "✓ Registration successful! We will contact you soon.",
      data: {
        id: newRegistration._id,
        email: newRegistration.email,
        registeredAt: newRegistration.timestamp,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during registration. Please try again.",
      error: error.message,
    });
  }
});

// Get all registrations (optional - for admin purposes)
app.get("/api/registrations", async (req, res) => {
  try {
    await connectToDatabase();

    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching registrations",
      error: error.message,
    });
  }
});

// Delete a registration (optional - for admin purposes)
app.delete("/api/registrations/:id", async (req, res) => {
  try {
    await connectToDatabase();

    const { id } = req.params;
    const deleted = await Registration.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    res.json({
      success: true,
      message: "Registration deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting registration:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting registration",
      error: error.message,
    });
  }
});

// Export the Express app as a serverless function
module.exports = app;
