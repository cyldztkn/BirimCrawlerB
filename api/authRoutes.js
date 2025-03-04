import express from "express";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// __dirname için polyfill (ES modülleri için)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Yapılandırma
const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";
const FAKE_USER = {
  email: process.env.ADMIN_EMAIL || "admin@example.com",
  password: process.env.ADMIN_PASSWORD || "admin123",
};

const router = express.Router();

// Giriş endpoint'i
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: "Email ve şifre gereklidir" 
    });
  }

  if (email === FAKE_USER.email && password === FAKE_USER.password) {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ 
      success: true, 
      user: { email }, 
      token 
    });
  }

  return res.status(401).json({ 
    success: false, 
    message: "Geçersiz kimlik bilgileri" 
  });
});

// Kullanıcı bilgilerini getir
router.get("/me", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "Token bulunamadı" 
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return res.json({ 
      success: true, 
      user: { email: decoded.email } 
    });
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: "Geçersiz token" 
    });
  }
});

// Auth durumunu kontrol et
router.get("/", (req, res) => {
  res.status(200).json({ 
    status: "active", 
    message: "Auth servisi çalışıyor" 
  });
});

export default router;
