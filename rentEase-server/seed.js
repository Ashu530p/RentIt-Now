const mongoose = require('mongoose');

// 1. Database Connection
mongoose.connect('mongodb://localhost:27017/RentEase')
    .then(() => console.log("Connected to MongoDB for seeding..."))
    .catch(err => console.error("Could not connect...", err));

// 2. Schema Define karein (Matches your UI)
const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    image: String,
    category: String
});

const Product = mongoose.model('Product', productSchema);

// 3. Dummy Data
const seedProducts = [
    { id: 2, name: "Queen Size Bed", price: 500, image: "bed.jpg", category: "Furniture" },
    { id: 3, name: "Washing Machine", price: 1200, image: "appliance.jpg", category: "Appliances" },
    { id: 4, name: "3-Seater Sofa", price: 600, image: "sofa.jpg", category: "Furniture" }
];

// 4. Function to Seed
const seedDB = async () => {
    await Product.deleteMany({}); // Purana purana data delete karne ke liye
    await Product.insertMany(seedProducts);
    console.log("Database Seeded! Saare products add ho gaye hain.");
    mongoose.connection.close(); // Kaam hone ke baad connection band
};

seedDB();