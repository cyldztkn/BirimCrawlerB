import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Dinamik rakip ve platform endpoint'leri
router.get("/:competitor/:platform/:file", (req, res) => {
  const { competitor, platform, file } = req.params;
  const filePath = path.join(
    __dirname,
    "..",
    "data",
    "competitors",
    competitor,
    platform,
    `${file}.json`
  );

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: "Dosya bulunamadı" });
  }
});

// Rakip listesi endpoint'i
router.get("/list", (req, res) => {
  const competitorsPath = path.join(__dirname, "..", "data", "competitors");
  const competitors = fs.readdirSync(competitorsPath);
  res.json(competitors);
});

export default router;

// import post from "../data/competitors/DanieliGroup/youtube/follower.json"
