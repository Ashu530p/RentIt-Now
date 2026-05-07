const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});

const testMail = async () => {
    try {
        console.log("⏳ Email bhejne ki koshish kar raha hoon...");
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Khud ko hi test mail bhejein
            subject: 'RentEase Connection Test',
            text: 'Mubarak ho! Aapka RentEase email system sahi se kaam kar raha hai. 🚀'
        });
        console.log("✅ Mail successfully chali gayi! ID:", info.messageId);
        console.log("👉 Apna Inbox check karo (Spam folder bhi dekh lena).");
    } catch (error) {
        console.error("❌ Email error:", error.message);
        console.log("\n--- Troubleshooting Tips ---");
        console.log("1. Check karo .env file mein EMAIL_USER aur EMAIL_PASS sahi hai?");
        console.log("2. Kya aapne Gmail ka 'App Password' use kiya hai? (Normal password kaam nahi karega)");
        console.log("3. Kya aapka internet connection stable hai?");
    }
};

testMail();