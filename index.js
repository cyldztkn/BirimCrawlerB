// İmport Server Staff
import express from "express";
import competitors from "./Competitors/competitors.js";
import cors from "cors"; // CORS paketini import ediyoruz

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import Crawler functions
import { getAllData } from "./middleware/getOrganicData/getAllOrganicData.js";
import { getAllAdsData } from "./middleware/ads/getAllAds.js";

// Utility
import { saveJsonToFile } from "./utility/createJson.js";

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

// Data yenileme İsteği
app.get("/refresh-data", (req, res) => {
  // getAllData();
  // getAllAdsData();
  res.status(200).json({ message: "Refresh Start" });
});

// competitors Listesi İsteği
app.get("/competitors", (req, res) => {
  // Sadece name'leri çıkarıp döndürüyoruz
  const competitorNames = competitors.map((competitor) => competitor.name);
  res.json(competitors);
});

// Belirli Rakibin Belirli Platform Dataları
app.get("/competitors/:competitor/:platform", (req, res) => {
  const { competitor, platform } = req.params;
  console.log(competitor, platform);

  // Dosya yolu oluştur
  const filePath = path.join(
    __dirname,
    "exports",
    "competitors",
    competitor,
    `${platform}Organic.json`
  );

  // Dosyanın olup olmadığını kontrol et
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: "Dosya bulunamadı" });
  }
});

// Son Hafta Bilgileri

// Auth işlemleri
const SECRET_KEY = process.env.JWT_SECRET_KEY;

// Fake kullanıcı verisi
const FAKE_USER = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

app.post("/auth/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  console.log(email, password, req.body);

  // Basit kullanıcı kontrolü
  if (email === FAKE_USER.email && password == FAKE_USER.password) {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

    console.log("generated token", token);

    return res.json({ success: true, user: { email }, token });
  }

  return res
    .status(401)
    .json({ success: false, message: "Invalid credentials" });
});

app.get("/auth", (req, res) => {
  res.status(200).json({ data: { user: "asd" } });
});

app.get("/auth/me", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return res.json({ success: true, user: { email: decoded.email } });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`API http://localhost:${port} adresinde çalışıyor`);
});
