// Temel importlar
import express from "express";
import cors from "cors";
import cron from "node-cron";

// Yapılandırma
import config from "./config/config.js";

// Rotalar
import authRoutes from "./api/authRoutes.js";
import competitorRoutes from "./api/competitors.js";
import platformRoutes from "./api/platforms.js";

// Middleware'ler
import { getAllData } from "./middleware/getOrganicData/getAllOrganicData.js";
import { getAllAdsData } from "./middleware/ads/getAllAds.js";

const app = express();

// Middleware kurulumu
app.use(express.json());
app.use(cors(config.security.cors));

// Rotaları bağlama
app.use("/auth", authRoutes);
app.use("/competitors", competitorRoutes);
app.use("/platforms", platformRoutes);

// Veri yenileme endpoint'i
app.get("/refresh-data", async (req, res) => {
  try {
    getAllData();
    getAllAdsData();
    res.status(200).json({ message: "Veri yenileme başarıyla tamamlandı" });
  } catch (error) {
    console.error("Veri yenileme hatası:", error);
    res
      .status(500)
      .json({ message: "Veri yenileme sırasında bir hata oluştu" });
  }
});

// Zamanlanmış görevler
if (config.cron.enabled) {
  cron.schedule(config.cron.schedule, () => {
    console.log("Otomatik tarama başlatılıyor...");
    getAllData();
    getAllAdsData();
  });
}

// Hata yönetimi middleware'i
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Bir hata oluştu",
    error: config.app.env === "development" ? err.message : null,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint bulunamadı",
  });
});

// Sunucuyu başlat
app.listen(config.app.port, () => {
  console.log(`API http://localhost:${config.app.port} adresinde çalışıyor`);
  console.log(`Ortam: ${config.app.env}`);
});
