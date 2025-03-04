import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Platform dosyaları için endpoint
router.get("/:file", (req, res) => {
  const { file } = req.params;
  const filePath = path.join(
    __dirname,
    "..",
    "data",
    "platforms",
    `${file}.json`
  );

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: "Dosya bulunamadı" });
  }
});

// Platform listesi endpoint'i
router.get("/list", (req, res) => {
  const platformsPath = path.join(__dirname, "..", "data", "platforms");
  const platforms = fs.readdirSync(platformsPath);
  res.json(platforms);
});

export default router;
