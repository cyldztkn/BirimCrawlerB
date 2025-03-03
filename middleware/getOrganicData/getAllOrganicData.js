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

      if (data) {
        const dir = `./data/competitors/${name}/instagram`;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(
          `${dir}/posts.json`,
          JSON.stringify(data, null, 2),
          "utf8"
        );
      }

      const followerData = await fetchFollowerData(instaId);

      if (followerData) {
        const dir = `./data/competitors/${name}/instagram`;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(
          `${dir}/follower.json`,
          JSON.stringify(followerData, null, 2),
          "utf8"
        );
      }
      const organicdata = { followerData, data };

      if (organicdata) {
        const dir = `./data/competitors/${name}/instagram`;
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

      if (followerData) {
        const dir = `./data/competitors/${name}/facebook`;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(
          `${dir}/follower.json`,
          JSON.stringify(followerData, null, 2),
          "utf8"
        );
      }

      const data = rawData.map((post) => ({
        ...post,
        date: addStandardizedDates("instagram", post.time),
      }));

      if (data) {
        const dir = `./data/competitors/${name}/facebook`;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(
          `${dir}/posts.json`,
          JSON.stringify(data, null, 2),
          "utf8"
        );
      }

      // console.log(`Data for ${name}:`, JSON.stringify(data, null, 2));
      facebookData.push({ name, followerData, data });
      const organicdata = { followerData, data };
      if (organicdata) {
        const dir = `./data/competitors/${name}/facebook`;
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

      if (followerData) {
        const dir = `./data/competitors/${name}/youtube`;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(
          `${dir}/follower.json`,
          JSON.stringify(followerData, null, 2),
          "utf8"
        );
      }
      const data = rawData.map((post) => ({
        ...post,
        date: addStandardizedDates("youtube", post.time),
      }));

      if (data) {
        const dir = `./data/competitors/${name}/youtube`;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(
          `${dir}/posts.json`,
          JSON.stringify(data, null, 2),
          "utf8"
        );
      }

      youtubeData.push({ name, followerData, data });
      const organicdata = { followerData, data };

      if (organicdata) {
        const dir = `./data/competitors/${name}/youtube`;
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
          linkedinData.push({ name, data });
          const dir = `./data/competitors/${name}/linkedin`;
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          fs.writeFileSync(
            `${dir}/posts.json`,
            JSON.stringify(data.data, null, 2),
            "utf8"
          );
          fs.writeFileSync(
            `${dir}/linkedinOrganic.json`,
            JSON.stringify(data, null, 2),
            "utf8"
          );

          // Follower verisi için yeni format
          const currentTimestamp = Date.now();
          const newFollowerData = [currentTimestamp, data.followerCount];

          // Mevcut veriyi oku ve yeni veriyi ekle
          let existingData = { followerData: [] };
          const followerFilePath = `${dir}/follower.json`;
          
          if (fs.existsSync(followerFilePath)) {
            try {
              const fileContent = fs.readFileSync(followerFilePath, 'utf8');
              existingData = JSON.parse(fileContent);
              if (!existingData.followerData) {
                existingData.followerData = [];
              }
            } catch (error) {
              console.error(`Error reading existing follower data: ${error}`);
            }
          }

          // Yeni veriyi ekle
          existingData.followerData.push(newFollowerData);

          // Dosyaya yaz
          fs.writeFileSync(
            followerFilePath,
            JSON.stringify(existingData, null, 2),
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
