import competitors from "../../Competitors/competitors.js";
import { saveJsonToFile } from "../../utility/createJson.js";
import getMetaAds from "./metaAds.js";
import { getGoogleAdsById, getGoogleAdsByDomain } from "./googleAds.js";
import getLinkedinAdsList from "./linkedinAds.js";
import fs from "fs";

async function getMetaAdsData() {
  try {
    let metaAdsData = [];

    for (let competitor of competitors) {
      const { name, metaAdsId } = competitor;

      if (metaAdsId) {
        console.log(`Fetching data for ${name}...`);

        const data = await getMetaAds(metaAdsId);

        metaAdsData.push({ name, data });
        if (data) {
          const dir = `./data/competitors/${name}/meta`;
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          fs.writeFileSync(
            `${dir}/ads.json`,
            JSON.stringify(data, null, 2),
            "utf8"
          );
        }
      }
    }

    saveJsonToFile(metaAdsData, "metaAdsData");
    fs.writeFileSync(
      "./data/platforms/metaAds.json",
      JSON.stringify(metaAdsData, null, 2),
      "utf8"
    );
  } catch (error) {
    console.error("Hata:", error.message);
  }
}

async function getAllLinkedinAdsData() {
  try {
    let linkedinAdsData = [];
    for (let competitor of competitors) {
      const { name, linkedinUrl } = competitor;

      if (linkedinUrl) {
        console.log(`Fetching Linkedin data for ${name}...`);

        try {
          const data = await getLinkedinAdsList(linkedinUrl, name);
          linkedinAdsData.push({ name, data });
          if (data) {
            const dir = `./data/competitors/${name}/linkedin`;
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(
              `${dir}/ads.json`,
              JSON.stringify(data, null, 2),
              "utf8"
            );
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    saveJsonToFile(linkedinAdsData, "linkedinAdsData");
    fs.writeFileSync(
      "./data/platforms/linkedinAds.json",
      JSON.stringify(linkedinAdsData, null, 2),
      "utf8"
    );
  } catch (error) {}
}

async function getGoogleAds() {
  try {
    let googleAdsData = [];

    for (let competitor of competitors) {
      const { name, googleAdsId } = competitor;

      if (googleAdsId) {
        for (let googleAds of googleAdsId) {
          let data;

          if (googleAds.type === "id") {
            console.log(`Fetching Google Ads data for ${name}...`);
            data = await getGoogleAdsById(googleAds.id, name);
            googleAdsData.push({ name, data });
          } else if (googleAds.type === "domain") {
            console.log(`Fetching Google Ads data by domain for ${name}...`);
            data = await getGoogleAdsByDomain(googleAds.domain, name);
            googleAdsData.push({ name, data });
          }

          if (data) {
            const dir = `./data/competitors/${name}/google`;
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(
              `${dir}/ads.json`,
              JSON.stringify(data, null, 2),
              "utf8"
            );
          }
        }
      }
    }
    // const formattedData = formatGoogleAdsData(googleAdsData);
    saveJsonToFile(googleAdsData, "googleAdsData");
    fs.writeFileSync(
      "./data/platforms/googleAds.json",
      JSON.stringify(googleAdsData, null, 2),
      "utf8"
    );
  } catch (error) {
    console.error("Hata:", error.message);
  }
}

async function getAllAdsData() {
  getMetaAdsData();
  getGoogleAds();
  getAllLinkedinAdsData();
}

export { getAllAdsData, getMetaAdsData, getAllLinkedinAdsData, getGoogleAds };
