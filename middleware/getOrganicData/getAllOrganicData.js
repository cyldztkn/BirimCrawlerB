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
      const newData = rawData.map((post) => ({
        ...post,
        date: addStandardizedDates("instagram", post.time),
      }));

      const dir = `./data/competitors/${name}/instagram`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Mevcut post verilerini oku
      let existingPosts = [];
      const postsFilePath = `${dir}/posts.json`;
      if (fs.existsSync(postsFilePath)) {
        existingPosts = JSON.parse(fs.readFileSync(postsFilePath, "utf8"));
      }

      // Yeni verileri mevcut verilere ekle (aynı olanları atla)

      const updatedPosts = [...existingPosts];
      newData.forEach((newPost) => {
        if (
          !existingPosts.some(
            (existingPost) => existingPost.link === newPost.link
          )
        ) {
          updatedPosts.push(newPost);
        }
      });

      // Güncellenmiş verileri yaz
      fs.writeFileSync(
        postsFilePath,
        JSON.stringify(updatedPosts, null, 2),
        "utf8"
      );

      // Follower verilerini işle
      const followerData = await fetchFollowerData(instaId);
      let existingFollowers = [];
      const followerFilePath = `${dir}/follower.json`;
      if (fs.existsSync(followerFilePath)) {
        existingFollowers = JSON.parse(
          fs.readFileSync(followerFilePath, "utf8")
        );
      }

      // Yeni follower verisini ekle (aynı timestamp kontrolü)
      if (
        followerData &&
        !existingFollowers.some((f) => f[0] === followerData[0])
      ) {
        existingFollowers.push(followerData);
        fs.writeFileSync(
          followerFilePath,
          JSON.stringify(existingFollowers, null, 2),
          "utf8"
        );
      }

      // InstagramOrganic.json güncelleme
      const organicData = {
        followerData: existingFollowers,
        data: updatedPosts,
      };
      fs.writeFileSync(
        `${dir}/instagramOrganic.json`,
        JSON.stringify(organicData, null, 2),
        "utf8"
      );

      instagramData.push({
        name,
        followerData: existingFollowers,
        data: updatedPosts,
      });
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
      const newData = rawData.map((post) => ({
        ...post,
        date: addStandardizedDates("instagram", post.time),
      }));

      const dir = `./data/competitors/${name}/facebook`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Mevcut post verilerini oku
      let existingPosts = [];
      const postsFilePath = `${dir}/posts.json`;
      if (fs.existsSync(postsFilePath)) {
        existingPosts = JSON.parse(fs.readFileSync(postsFilePath, "utf8"));
      }

      // Yeni verileri mevcut verilere ekle (aynı olanları atla)
      const updatedPosts = [...existingPosts];
      newData.forEach((newPost) => {
        if (
          !existingPosts.some(
            (existingPost) => existingPost.link === newPost.link
          )
        ) {
          updatedPosts.push(newPost);
        }
      });

      // Güncellenmiş verileri yaz
      fs.writeFileSync(
        postsFilePath,
        JSON.stringify(updatedPosts, null, 2),
        "utf8"
      );

      // Follower verilerini işle
      const followerData = await fetchFollowerData(faceId);
      let existingFollowers = [];
      const followerFilePath = `${dir}/follower.json`;
      if (fs.existsSync(followerFilePath)) {
        existingFollowers = JSON.parse(
          fs.readFileSync(followerFilePath, "utf8")
        );
      }

      // Yeni follower verisini ekle (aynı timestamp kontrolü)
      if (
        followerData &&
        !existingFollowers.some((f) => f[0] === followerData[0])
      ) {
        existingFollowers.push(followerData);
        fs.writeFileSync(
          followerFilePath,
          JSON.stringify(existingFollowers, null, 2),
          "utf8"
        );
      }

      // FacebookOrganic.json güncelleme
      const organicData = {
        followerData: existingFollowers,
        data: updatedPosts,
      };
      fs.writeFileSync(
        `${dir}/facebookOrganic.json`,
        JSON.stringify(organicData, null, 2),
        "utf8"
      );

      facebookData.push({
        name,
        followerData: existingFollowers,
        data: updatedPosts,
      });
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
      const newData = rawData.map((post) => ({
        ...post,
        date: addStandardizedDates("youtube", post.time),
      }));

      const dir = `./data/competitors/${name}/youtube`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Mevcut post verilerini oku
      let existingPosts = [];
      const postsFilePath = `${dir}/posts.json`;
      if (fs.existsSync(postsFilePath)) {
        existingPosts = JSON.parse(fs.readFileSync(postsFilePath, "utf8"));
      }

      // Yeni verileri mevcut verilere ekle (aynı olanları atla)
      const updatedPosts = [...existingPosts];
      newData.forEach((newPost) => {
        if (
          !existingPosts.some(
            (existingPost) => existingPost.link === newPost.link
          )
        ) {
          updatedPosts.push(newPost);
        }
      });

      // Güncellenmiş verileri yaz
      fs.writeFileSync(
        postsFilePath,
        JSON.stringify(updatedPosts, null, 2),
        "utf8"
      );

      // Follower verilerini işle
      const followerData = await fetchFollowerData(youtubeId);
      let existingFollowers = [];
      const followerFilePath = `${dir}/follower.json`;
      if (fs.existsSync(followerFilePath)) {
        existingFollowers = JSON.parse(
          fs.readFileSync(followerFilePath, "utf8")
        );
      }

      // Yeni follower verisini ekle (aynı timestamp kontrolü)
      if (
        followerData &&
        !existingFollowers.some((f) => f[0] === followerData[0])
      ) {
        existingFollowers.push(followerData);
        fs.writeFileSync(
          followerFilePath,
          JSON.stringify(existingFollowers, null, 2),
          "utf8"
        );
      }

      // YoutubeOrganic.json güncelleme
      const organicData = {
        followerData: existingFollowers,
        data: updatedPosts,
      };
      fs.writeFileSync(
        `${dir}/youtubeOrganic.json`,
        JSON.stringify(organicData, null, 2),
        "utf8"
      );

      youtubeData.push({
        name,
        followerData: existingFollowers,
        data: updatedPosts,
      });
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
        const delay = Math.floor(Math.random() * 3000) + 2000;
        await new Promise((resolve) => setTimeout(resolve, delay));

        const data = await scrapLinkednAtMobile(url, name);

        if (data) {
          const dir = `./data/competitors/${name}/linkedin`;
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }

          // Mevcut post verilerini oku
          let existingPosts = [];
          const postsFilePath = `${dir}/posts.json`;
          if (fs.existsSync(postsFilePath)) {
            existingPosts = JSON.parse(fs.readFileSync(postsFilePath, "utf8"));
          }

          // Yeni verileri mevcut verilere ekle (aynı olanları atla)
          const combinedData = [...existingPosts, ...data.data];

          const uniqueMap = new Map();

          combinedData.forEach((item) => {
            uniqueMap.set(item.captions, item);
          });

          const uniqueArray = Array.from(uniqueMap.values());

          // Güncellenmiş verileri yaz
          fs.writeFileSync(
            postsFilePath,
            JSON.stringify(uniqueArray, null, 2),
            "utf8"
          );

          // Follower verilerini işle
          const currentTimestamp = Date.now();
          const newFollowerData = [currentTimestamp, data.followerCount];

          let existingFollowers = { followerData: [] };
          const followerFilePath = `${dir}/follower.json`;
          if (fs.existsSync(followerFilePath)) {
            existingFollowers = JSON.parse(
              fs.readFileSync(followerFilePath, "utf8")
            );
          }

          // Yeni follower verisini ekle (aynı timestamp kontrolü)
          if (
            !existingFollowers.followerData.some(
              (f) => f[0] === newFollowerData[0]
            )
          ) {
            existingFollowers.followerData.push(newFollowerData);
            fs.writeFileSync(
              followerFilePath,
              JSON.stringify(existingFollowers, null, 2),
              "utf8"
            );
          }

          // LinkedinOrganic.json güncelleme
          const organicData = {
            followerData: existingFollowers.followerData,
            data: uniqueArray,
          };
          fs.writeFileSync(
            `${dir}/linkedinOrganic.json`,
            JSON.stringify(organicData, null, 2),
            "utf8"
          );

          linkedinData.push({
            name,
            followerData: existingFollowers.followerData,
            data: uniqueArray,
          });
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
