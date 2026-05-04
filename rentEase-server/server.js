const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Razorpay = require('razorpay');
require('dotenv').config();

const app = express();

// --- 🌐 DYNAMIC PORT ---
// Render apna port khud provide karta hai, isliye process.env.PORT zaroori hai
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- 💳 RAZORPAY CONFIGURATION ---
// Inhe bhi aap .env mein daal sakte hain safety ke liye
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_SkynQQhj3gRoHa', 
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'vc7x83N96WHjbGSwyOxgRA5Y', 
});

// --- 🌿 MONGODB CONNECTION ---
// Render par MONGODB_URI use hoga, local par purana localhost link
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/RentEase';

mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => console.log("❌ MongoDB Connection Error:", err));

// --- 📝 DATABASE SCHEMAS ---

// 1. Product Schema
const productSchema = new mongoose.Schema({
    id: String, 
    name: String,
    price: Number,
    image: String,
    category: String,
    securityDeposit: { type: Number, default: 1000 }
});
const Product = mongoose.model('Product', productSchema);

// 2. Booking/Order Schema
const bookingSchema = new mongoose.Schema({
    razorpay_order_id: String,
    razorpay_payment_id: String,
    productName: String,
    fullName: String,
    phone: String,
    address: String,
    startDate: Date,
    endDate: Date,
    finalAmount: Number,
    paymentStatus: { type: String, default: 'Successful' },
    createdAt: { type: Date, default: Date.now }
});
const Booking = mongoose.model('Booking', bookingSchema);

// 3. User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }
});
const User = mongoose.model('User', userSchema);

// --- 🛠️ API ROUTES ---

// 💰 [A] RAZORPAY: Create Order
app.post('/api/create-order', async (req, res) => {
    try {
        const { amount } = req.body;
        const options = {
            amount: amount * 100, 
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (err) {
        console.error("Razorpay Error:", err);
        res.status(500).json({ success: false, message: "Order generation failed" });
    }
});

// 📦 [B] PRODUCT ROUTES
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) { res.status(500).json(err); }
});

app.post('/api/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ success: true, message: "Product Added!" });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, data: updated });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Product Deleted" });
    } catch (error) { res.status(500).json({ success: false }); }
});

// 📝 [C] BOOKING ROUTES
app.post('/api/bookings', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json({ success: true, message: "Booking saved in Database" });
    } catch (error) {
        res.status(500).json({ success: false, message: "DB Error" });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Booking.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) { res.status(500).json(err); }
});

// 🔑 [D] AUTH ROUTES
app.post('/api/auth/signup', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ success: true, message: "User Registered" });
    } catch (error) { res.status(400).json({ success: false, message: "User exists" }); }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) res.json({ success: true, name: user.name, role: user.role });
        else res.status(401).json({ success: false, message: "Invalid Login" });
    } catch (err) { res.status(500).json(err); }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 RentEase Backend Running on port ${PORT}`);
});