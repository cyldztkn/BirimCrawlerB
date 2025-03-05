import express from "express";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const router = express.Router();

router.get("/last-posts/:platform", async (req, res) => {
  try {
    const { platform } = req.params;
    const { q } = req.query;

    // Geçerli platformları kontrol et
    const validPlatforms = ["instagram", "linkedin", "facebook", "youtube"];
    if (!validPlatforms.includes(platform)) {
      return res.status(404).json({ error: "Geçersiz platform" });
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const competitorsPath = path.join(__dirname, "..", "data", "competitors");
    const competitors = fs.readdirSync(competitorsPath);

    const result = {};
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - (q ? parseInt(q) : 365));

    for (const competitor of competitors) {
      const filePath = path.join(
        competitorsPath,
        competitor,
        platform,
        "posts.json"
      );

      if (fs.existsSync(filePath)) {
        try {
          const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

          if (Array.isArray(data)) {
            const filteredPosts = data.filter((post) => {
              try {
                const postDate = new Date(post.date);
                return postDate > oneWeekAgo;
              } catch (error) {
                console.warn(`Geçersiz tarih formatı: ${post.date}`);
                return false;
              }
            });

            if (filteredPosts.length > 0) {
              result[competitor] = filteredPosts;
            }
          }
        } catch (error) {
          console.warn(
            `${competitor} - ${platform} dosyası okunurken hata oluştu:`,
            error
          );
          continue;
        }
      }
    }

    // fs.writeFileSync(
    //   `./RESPONSE_${platform}_Q_${q}.json`,
    //   JSON.stringify(result, null, 2),
    //   "utf-8"
    // );

    res.status(200).json(result);
  } catch (error) {
    console.error("Hata oluştu:", error);
    res.status(500).json({ error: "Sunucu hatası", details: error.message });
  }
});

router.get("/follower-data/:platform", async (req, res) => {
  try {
    const { platform } = req.params;
    const { q } = req.query;

    // Geçerli platformları kontrol et
    const validPlatforms = ["instagram", "linkedin", "facebook", "youtube"];
    if (!validPlatforms.includes(platform)) {
      return res.status(404).json({ error: "Geçersiz platform" });
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const competitorsPath = path.join(__dirname, "..", "data", "competitors");
    const competitors = fs.readdirSync(competitorsPath);

    const result = {};
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - (q ? parseInt(q) : 365));

    for (const competitor of competitors) {
      const filePath = path.join(
        competitorsPath,
        competitor,
        platform,
        "follower.json"
      );

      if (fs.existsSync(filePath)) {
        try {
          let data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

          // LinkedIn özel durumu
          if (platform === "linkedin" && data.followerData) {
            data = data.followerData;
          }

          if (Array.isArray(data)) {
            const filteredFollowers = data.filter((follower) => {
              try {
                const timestamp = follower[0];
                const followerDate = new Date(
                  timestamp.toString().length === 8
                    ? timestamp * 1000 // LinkedIn tarih formatı için
                    : timestamp
                );

                // Takipçi sayısını temizle
                let followerCount = follower[1];
                if (typeof followerCount === "string") {
                  followerCount = Number(followerCount.replace(".", ""));
                }

                return followerDate > oneWeekAgo;
              } catch (error) {
                console.warn(`Geçersiz tarih formatı: ${follower[0]}`);
                return false;
              }
            });

            if (filteredFollowers.length > 0) {
              result[competitor] = filteredFollowers.map((follower) => ({
                date: new Date(
                  follower[0].toString().length === 8
                    ? follower[0] * 1000
                    : follower[0]
                ).toISOString(),
                count:
                  typeof follower[1] === "string"
                    ? Number(follower[1].replace(".", ""))
                    : follower[1],
              }));
            }
          }
        } catch (error) {
          console.warn(
            `${competitor} - ${platform} dosyası okunurken hata oluştu:`,
            error
          );
          continue;
        }
      }
    }

    fs.writeFileSync(
      `./FOLLOWER_RESPONSE_${platform}_Q_${q}.json`,
      JSON.stringify(result, null, 2),
      "utf-8"
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Hata oluştu:", error);
    res.status(500).json({ error: "Sunucu hatası", details: error.message });
  }
});

export default router;
