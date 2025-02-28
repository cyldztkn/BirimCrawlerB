export default function  (platform, time) {
  if (!time) return null;

  try {
    switch (platform) {
      case "instagram": {
        // "16.12.2024 10:05:51" → YYYY-MM-DDTHH:mm:ssZ
        const [day, month, year, hours, minutes, seconds] = time
          .match(/\d+/g)
          .map(Number);
        return new Date(
          Date.UTC(year, month - 1, day, hours, minutes, seconds)
        ).toISOString();
      }
      case "linkedin": {
        // "2025-02-18T08:55:22.488Z" (ISO Format zaten)
        if (time.isoString) return new Date(time.isoString).toISOString();
        // "18.02.2025"
        if (time.parsed) {
          const [day, month, year] = time.parsed.split(".").map(Number);
          return new Date(Date.UTC(year, month - 1, day)).toISOString();
        }
        return null;
      }
      case "metaAds": {
        // "2024-12-18" → YYYY-MM-DDTHH:mm:ssZ
        return new Date(time + "T00:00:00Z").toISOString();
      }
      case "youtube": {
        // "24.2.2025 09:23:50" → YYYY-MM-DDTHH:mm:ssZ
        const [day, month, year, hours, minutes, seconds] = time
          .match(/\d+/g)
          .map(Number);
        return new Date(
          Date.UTC(year, month - 1, day, hours, minutes, seconds)
        ).toISOString();
      }
      default:
        return null;
    }
  } catch (error) {
    console.error("Tarih dönüştürme hatası:", error);
    return null;
  }
}
