import path from "path";
import { fileURLToPath } from "url";

// __dirname için polyfill (ES modülleri için)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Temel yapılandırma
const config = {
  app: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
  },
  auth: {
    secretKey: process.env.JWT_SECRET_KEY || "your-secret-key",
    adminEmail: process.env.ADMIN_EMAIL || "admin@example.com",
    adminPassword: process.env.ADMIN_PASSWORD || "admin123",
    tokenExpiration: "1h",
  },
  paths: {
    root: __dirname,
    exports: path.join(__dirname, "../exports"),
    competitors: path.join(__dirname, "../exports/competitors"),
  },
  cron: {
    enabled: process.env.CRON_ENABLED === "true" || false,
    schedule: process.env.CRON_SCHEDULE || "0 6 * * *", // Her sabah 06:00
  },
  security: {
    cors: {
      origin: process.env.CORS_ORIGIN || "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  },
};

// Geliştirme ortamı için özel ayarlar
if (config.app.env === "development") {
  config.auth.secretKey = "development-secret-key";
  config.cron.enabled = true;
}

// Production ortamı için özel ayarlar
if (config.app.env === "production") {
  config.auth.secretKey = process.env.JWT_SECRET_KEY;
  config.cron.enabled = true;
}

// Çevresel değişken kontrolü
const validateEnvVariables = () => {
  const requiredEnvVars = {
    production: ["JWT_SECRET_KEY", "ADMIN_EMAIL", "ADMIN_PASSWORD"],
    development: [],
  };

  const missingVars = [];
  const currentEnv = config.app.env;

  // Gerekli değişkenleri kontrol et
  requiredEnvVars[currentEnv]?.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  });

  if (missingVars.length > 0) {
    console.error("\x1b[31m%s\x1b[0m", "HATA: Eksik çevresel değişkenler:"); // Kırmızı renkte hata mesajı
    missingVars.forEach((envVar) => {
      console.error(`- ${envVar}`);
    });
    console.error(
      "\x1b[33m%s\x1b[0m",
      "Uyarı: Uygulama düzgün çalışmayabilir!"
    ); // Sarı renkte uyarı mesajı
  } else {
    console.log(
      "\x1b[32m%s\x1b[0m",
      "Çevresel değişkenler başarıyla doğrulandı."
    ); // Yeşil renkte başarı mesajı
  }
};

// Uygulama başladığında çevresel değişkenleri kontrol et
validateEnvVariables();

export default config;
