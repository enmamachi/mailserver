const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Middleware untuk menyajikan file statis
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Middleware untuk parsing JSON

// Rute untuk halaman utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rute untuk mengirim email
app.post('/send-email', (req, res) => {
    const { from, to, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 25,
        secure: false, // true untuk port 465, false untuk port 25
    });

    const mailOptions = {
        from,
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error,
