const UserSchema = require("../models/UserSchema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require("../services/mail-service");

class AuthController {

    // Ro'yxatdan o'tish va email kod yuborish
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            const existingUser = await UserSchema.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Bu email allaqachon ro'yxatdan o'tgan" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const verificationCode = Math.floor(100000 + Math.random() * 900000); // 6 xonali kod

            const newUser = new UserSchema({
                name,
                email,
                password: hashedPassword,
                verificationCode, 
                isVerified: false
            });

            await newUser.save();

            // Email yuborish
            await sendEmail(
                email,
                "Tasdiqlash kodi",
                `Assalomu alaykum ${name},\n\nSizning tasdiqlash kodingiz: ${verificationCode}`
            );

            return res.status(201).json({ message: "Ro'yxatdan o'tildi. Emailga tasdiqlash kodi yuborildi." });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Server xatosi" });
        }
    }

    // Tizimga kirish
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await UserSchema.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: "Email topilmadi" });
            }

            if (!user.isVerified) {
                return res.status(401).json({ message: "Email tasdiqlanmagan!" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Parol noto'g'ri" });
            }

            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000
            });

            return res.status(200).json({ message: "Tizimga muvaffaqiyatli kirildi", token });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Server xatosi (login)" });
        }
    }
   async checkVerCode(req, res) {
        try {
            const { verCode } = req.params;

            
            const user = await UserSchema.findOne({ verificationCode: verCode });

            if (!user) {
                return res.status(400).json({ message: "Tasdiqlash kodi noto‘g‘ri yoki eskirgan" });
            }

        
            user.isVerified = true;
            user.verificationCode = null; 
            await user.save();

            return res.status(200).json({ message: "Email tasdiqlandi ✅" });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Server xatoligi" });
        }
    }
}

module.exports = new AuthController();
