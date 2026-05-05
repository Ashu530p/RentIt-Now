const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Razorpay = require('razorpay');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Image upload ke liye limit badhayi hai

// --- 💳 RAZORPAY CONFIG ---
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_SkynQQhj3gRoHa', 
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'vc7x83N96WHjbGSwyOxgRA5Y', 
});

// --- 🌿 MONGODB CONNECTION ---
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/RentEase';
mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected: RentEase Database Ready"))
    .catch(err => console.log("❌ MongoDB Error:", err));

// --- 📝 UPGRADED SCHEMAS ---

// 1. Product Schema (Now with Condition & Specs)
const productSchema = new mongoose.Schema({
    name: String,
    price: Number, // Monthly Base Price
    image: String,
    category: String,
    condition: { type: String, default: 'New' }, // New, Mint, Refurbished
    securityDeposit: { type: Number, default: 1000 },
    inStock: { type: Boolean, default: true }
});
const Product = mongoose.model('Product', productSchema);

// 2. Booking Schema (Now with Tenure & Step Tracking)
const bookingSchema = new mongoose.Schema({
    bookingId: { type: String, unique: true }, // RE-XXXXX format
    razorpay_order_id: String,
    razorpay_payment_id: String,
    productName: String,
    tenure: Number, // 3, 6, 12 months
    fullName: String,
    phone: String,
    address: String,
    startDate: Date,
    finalAmount: Number,
    status: { type: String, default: 'KYC Pending' }, // KYC Pending, Verified, Shipped, Delivered
    step: { type: Number, default: 1 }, // Tracker step (1 to 4)
    createdAt: { type: Date, default: Date.now }
});
const Booking = mongoose.model('Booking', bookingSchema);

// 3. User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    kycVerified: { type: Boolean, default: false }
});
const User = mongoose.model('User', userSchema);

// --- 🛠️ SMART API ROUTES ---

// 💰 [A] RAZORPAY: Secure Order Creation
app.post('/api/create-order', async (req, res) => {
    try {
        const { amount } = req.body;
        const options = {
            amount: amount * 100, 
            currency: "INR",
            receipt: `re_${Math.floor(Math.random() * 100000)}`,
        };
        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: "Payment Gateway Error" });
    }
});

// 📦 [B] PRODUCT MANAGEMENT (Admin & User)
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({ inStock: true });
        res.json(products);
    } catch (err) { res.status(500).json(err); }
});

app.post('/api/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ success: true, message: "Inventory Updated!" });
    } catch (error) { res.status(500).json({ success: false }); }
});

// 📝 [C] SMART BOOKING LOGIC
app.post('/api/bookings', async (req, res) => {
    try {
        // Unique Booking ID Generate karna (e.g., RE-4521)
        const customId = `RE-${Math.floor(1000 + Math.random() * 9000)}`;
        const newBooking = new Booking({
            ...req.body,
            bookingId: customId
        });
        await newBooking.save();
        res.status(201).json({ success: true, bookingId: customId });
    } catch (error) {
        res.status(500).json({ message: "Booking Storage Failed" });
    }
});

// Admin Dashboard Analytics Route
app.get('/api/admin/stats', async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments();
        const revenue = await Booking.aggregate([{ $group: { _id: null, total: { $sum: "$finalAmount" } } }]);
        const recentOrders = await Booking.find().sort({ createdAt: -1 }).limit(5);
        
        res.json({
            totalRevenue: revenue[0]?.total || 0,
            activeRentals: totalBookings,
            recentOrders
        });
    } catch (err) { res.status(500).json(err); }
});

// 🔑 [D] AUTHENTICATION
app.post('/api/auth/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ success: true });
    } catch (error) { res.status(400).json({ message: "Email already registered" }); }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
        res.json({ success: true, name: user.name, role: user.role, kyc: user.kycVerified });
    } else {
        res.status(401).json({ message: "Galat Email ya Password" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 RentEase Engine Started on Port: ${PORT}`);
});