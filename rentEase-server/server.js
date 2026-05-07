const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Razorpay = require('razorpay');
const nodemailer = require('nodemailer'); // 📧 Email verification ke liye
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- 🛠️ MIDDLEWARE ---
app.use(cors());
app.use(express.json({ limit: '10mb' })); 

// --- 📧 NODEMAILER CONFIG ---
// Note: Iske liye .env mein EMAIL_USER aur EMAIL_PASS (App Password) hona zaroori hai
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});

// --- 🌿 MONGODB CONNECTION ---
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/RentEase';
mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected: RentEase Database Ready"))
    .catch(err => console.log("❌ MongoDB Error:", err));

// --- 📝 SCHEMAS ---

// 1. User Schema (Updated with isVerified)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String }, // Mobile verification ke liye
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    KYCVerified: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false } // OTP verification check
});
const User = mongoose.model('User', userSchema);

// 2. OTP Schema (Temporary Storage - 5 min expiry)
const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, index: { expires: 300 } } 
});
const OTP = mongoose.model('OTP', otpSchema);

// 3. Product & Booking Schemas (Same as before)
const productSchema = new mongoose.Schema({
    name: String, price: Number, image: String, category: String,
    condition: { type: String, default: 'New' }, securityDeposit: { type: Number, default: 1000 },
    inStock: { type: Boolean, default: true }
});
const Product = mongoose.model('Product', productSchema);

const bookingSchema = new mongoose.Schema({
    bookingId: { type: String, unique: true }, razorpay_order_id: String,
    razorpay_payment_id: String, productName: String, tenure: Number,
    fullName: String, phone: String, address: String, startDate: Date,
    finalAmount: Number, status: { type: String, default: 'KYC Pending' },
    step: { type: Number, default: 1 }, createdAt: { type: Date, default: Date.now }
});
const Booking = mongoose.model('Booking', bookingSchema);

// --- 🛠️ API ROUTES ---

// 🔑 [VERIFICATION] SEND OTP
app.post('/api/auth/send-otp', async (req, res) => {
    const { email } = req.body;
    try {
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Save to DB (pichla delete karke naya save)
        await OTP.findOneAndDelete({ email });
        const newOtp = new OTP({ email, otp: generatedOtp });
        await newOtp.save();

        // Send Email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'RentEase - Verification Code',
            html: `<h3>Welcome to RentEase!</h3><p>Aapka verification code hai: <b>${generatedOtp}</b>. Ye code 5 minute mein expire ho jayega.</p>`
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "OTP sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error sending OTP" });
    }
});

// 🔑 [AUTH] SIGNUP (Updated with OTP check)
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password, otp, phone } = req.body;
        
        // OTP check karein
        const otpRecord = await OTP.findOne({ email, otp });
        if (!otpRecord) return res.status(400).json({ message: "Invalid or Expired OTP" });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already registered" });

        const user = new User({ 
            name, email, password, phone, isVerified: true 
        });
        await user.save();
        
        // OTP delete karein signup ke baad
        await OTP.deleteOne({ email });
        
        res.status(201).json({ success: true, message: "Account Verified & Created!" });
    } catch (error) {
        res.status(500).json({ message: "Signup Failed" });
    }
});

// 🔑 [AUTH] LOGIN
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (user) {
            res.json({ 
                success: true, name: user.name, role: user.role, 
                email: user.email, KYC: user.KYCVerified 
            });
        } else {
            res.status(401).json({ success: false, message: "Invalid Email or Password" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Login Error" });
    }
});

// 💰 [PAYMENT] RAZORPAY & 📦 [PRODUCTS] (Same as before)
app.post('/api/create-order', async (req, res) => {
    try {
        const { amount } = req.body;
        const options = { amount: amount * 100, currency: "INR", receipt: `re_${Date.now()}` };
        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (err) { res.status(500).json({ message: "Payment Error" }); }
});

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
        res.status(201).json({ success: true });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.post('/api/bookings', async (req, res) => {
    try {
        const customId = `RE-${Math.floor(1000 + Math.random() * 9000)}`;
        const newBooking = new Booking({ ...req.body, bookingId: customId });
        await newBooking.save();
        res.status(201).json({ success: true, bookingId: customId });
    } catch (error) { res.status(500).json({ message: "Booking Failed" }); }
});

app.post('/api/auth/update-kyc', async (req, res) => {
    try {
        const { email } = req.body;
        await User.findOneAndUpdate({ email }, { KYCVerified: true });
        res.json({ success: true });
    } catch (err) { res.status(500).json({ message: "KYC Failed" }); }
});

app.get('/api/admin/stats', async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments();
        const revenue = await Booking.aggregate([{ $group: { _id: null, total: { $sum: "$finalAmount" } } }]);
        const recentOrders = await Booking.find().sort({ createdAt: -1 }).limit(10);
        res.json({ totalRevenue: revenue[0]?.total || 0, activeRentals: totalBookings, recentOrders });
    } catch (err) { res.status(500).json(err); }
});

app.listen(PORT, () => console.log(`🚀 RentEase Engine Running on: ${PORT}`));