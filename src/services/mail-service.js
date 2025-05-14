const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})
const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: `"Asilbek portfolio Apps" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log("Email yuborildi:", info.messageId);
  } catch (err) {
    console.error("Email yuborishda xatolik:", err);
  }
};

module.exports = sendEmail;