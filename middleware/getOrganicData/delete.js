// ... existing code ...

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

// ... existing code ...


// 

// 

// 

if (followerData) {
  const combinedData = [...existingFollowers, ...followerData];

  const uniqueMap = new Map();

  combinedData.forEach((item) => {
    uniqueMap.set(item[0], item);
  });
  const uniqueArray = Array.from(uniqueMap.values());

  fs.writeFileSync(
    followerFilePath,
    JSON.stringify(uniqueArray, null, 2),
    "utf8"
  );
}



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