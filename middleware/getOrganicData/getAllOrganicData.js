import fetchAndParseInstagramData from "../instagram/fatchAndParseInstagram.js";
import competitors from "../../Competitors/competitors.js";
import { saveJsonToFile } from "../../utility/createJson.js";
import fetchFollowerData from "../../utility/fetchFollowerData.js";
import scrapLinkednAtMobile from "../linkedin/scrapAtMobile.js";
import fs from "fs";
import addStandardizedDates from "../../utility/addStandardizedDates.js";

async function instagramOrganic() {
  let instagramData = [];

  for (let competitor of competitors) {
    const { name, instaId } = competitor;
    console.log(`Fetching data for ${name}...`);
    if (instaId) {
      const rawData = await fetchAndParseInstagramData(
        instaId,
        "instagramOrganic"
      );
      // Tarihleri standardize et
      const data = rawData.map((post) => ({
        ...post,
        date: addStandardizedDates("instagram", post.time),
      }));

      const followerData = await fetchFollowerData(instaId);
      // console.log(`Data for ${name}:`, JSON.stringify(data, null, 2));
      const organicdata = { followerData, data };

      if (organicdata) {
        const dir = `./data/competitors/${name}`;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(
          `${dir}/instagramOrganic.json`,
          JSON.stringify(organicdata, null, 2),
          "utf8"
        );
      }
      instagramData.push({ name, followerData, data });
    }
  }

  saveJsonToFile(instagramData, "instagramOrganic");
  fs.writeFileSync(
    "./data/platforms/instagramOrganic.json",
    JSON.stringify(instagramData, null, 2),
    "utf8"
  );
}
async function facebookOrganic() {
  let facebookData = [];

  for (let competitor of competitors) {
    const { name, faceId } = competitor;
    console.log(`Fetching data for ${name}...`);
    if (faceId) {
      const rawData = await fetchAndParseInstagramData(
        faceId,
        "facebookOrganic"
      );
      const followerData = await fetchFollowerData(faceId);
      const data = rawData.map((post) => ({
        ...post,
        date: addStandardizedDates("instagram", post.time),
      }));

      // console.log(`Data for ${name}:`, JSON.stringify(data, null, 2));
      facebookData.push({ name, followerData, data });
      const organicdata = { followerData, data };
      if (organicdata) {
        const dir = `./data/competitors/${name}`;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(
          `${dir}/facebookOrganic.json`,
          JSON.stringify(organicdata, null, 2),
          "utf8"
        );
      }
    }
  }

  saveJsonToFile(facebookData, "facebookOrganic");
  fs.writeFileSync(
    "./data/platforms/facebookOrganic.json",
    JSON.stringify(facebookData, null, 2),
    "utf8"
  );
}
async function youtubeOrganic() {
  let youtubeData = [];

  for (let competitor of competitors) {
    const { name, youtubeId } = competitor;
    console.log(`Fetching data for ${name}...`);
    if (youtubeId) {
      const rawData = await fetchAndParseInstagramData(
        youtubeId,
        "youtubeOrganic"
      );
      // console.log(`Data for ${name}:`, JSON.stringify(data, null, 2));
      const followerData = await fetchFollowerData(youtubeId);
      const data = rawData.map((post) => ({
        ...post,
        date: addStandardizedDates("youtube", post.time),
      }));

      youtubeData.push({ name, followerData, data });
      const organicdata = { followerData, data };

      if (organicdata) {
        const dir = `./data/competitors/${name}`;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(
          `${dir}/youtubeOrganic.json`,
          JSON.stringify(organicdata, null, 2),
          "utf8"
        );
      }
    }
  }

  saveJsonToFile(youtubeData, "youtubeOrganic");
  fs.writeFileSync(
    "./data/platforms/youtubeOrganic.json",
    JSON.stringify(youtubeData, null, 2),
    "utf8"
  );
}

async function getLinkedinOrganics() {
  let linkedinData = [];
  let processedCount = 0;

  for (let competitor of competitors) {
    const { name, linkedinId } = competitor;
    processedCount++;
    console.log(
      `\nProcessing ${processedCount}/${competitors.length}: ${name}`
    );
    console.log(`Fetching LinkedIn data for ${name}...`);

    if (linkedinId) {
      try {
        const url = `https://www.linkedin.com/company/${linkedinId}/`;

        // Add random delay between requests (2-5 seconds)
        const delay = Math.floor(Math.random() * 3000) + 2000;

        await new Promise((resolve) => setTimeout(resolve, delay));

        const data = await scrapLinkednAtMobile(url, name);

        if (data) {
          console.log("rawData var, if bloğuna düştü");

          linkedinData.push({ name, data });
          const dir = `./data/competitors/${name}`;
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          fs.writeFileSync(
            `${dir}/linkednOrganic_DATETEST.json`,
            JSON.stringify(data, null, 2),
            "utf8"
          );
        } else {
          console.log(`No data found for ${name}`);
        }
      } catch (error) {
        console.error(`Error fetching LinkedIn data for ${name}:`, error);
      }
    } else {
      console.log(`No LinkedIn ID found for ${name}`);
    }
  }

  saveJsonToFile(linkedinData, "linkedinOrganic");
  fs.writeFileSync(
    "./data/platforms/linkedinOrganic.json",
    JSON.stringify(linkedinData, null, 2),
    "utf8"
  );
}

async function getAllData() {
  getLinkedinOrganics();
  instagramOrganic();
  facebookOrganic();
  youtubeOrganic();
}

export {
  getAllData,
  getLinkedinOrganics,
  instagramOrganic,
  youtubeOrganic,
  facebookOrganic,
};
