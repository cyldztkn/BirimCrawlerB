import fs from "fs";
import path from "path";

let facebookOrganic = JSON.parse(
  fs.readFileSync("./data/platforms/facebookOrganic.json", "utf8")
);
let instagramOrganic = JSON.parse(
  fs.readFileSync("./data/platforms/instagramOrganic.json", "utf8")
);
let linkedinOrganic = JSON.parse(
  fs.readFileSync("./data/platforms/linkedinOrganic.json", "utf8")
);

// console.log( facebookOrganic[0].followerData);
let facebookOrganicWithHumanDate = [];

facebookOrganic.forEach((item) => {
  facebookOrganicWithHumanDate.push({
    name: item.name,
    followerData: item.followerData.map((followerData) => {
      const timestamp =
        followerData[0].toString().length === 8
          ? followerData[0] * 1000 // LinkedIn timestamp formatı için
          : followerData[0];

      return [
        new Date(timestamp).toLocaleDateString("tr-TR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        followerData[1],
      ];
    }),
  });
});

fs.writeFileSync(
  "./data/platforms/facebookOrganicWithHumanDate.json",
  JSON.stringify(facebookOrganicWithHumanDate, null, 2)
);

let instagramOrganicWithHumanDate = [];

instagramOrganic.forEach((item) => {
  instagramOrganicWithHumanDate.push({
    name: item.name,
    followerData: item.followerData.map((followerData) => {
      const timestamp =
        followerData[0].toString().length === 8
          ? followerData[0] * 1000 // LinkedIn timestamp formatı için
          : followerData[0];

      return [
        new Date(timestamp).toLocaleDateString("tr-TR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        followerData[1],
      ];
    }),
  });
});

fs.writeFileSync(
  "./data/platforms/instagramOrganicWithHumanDate.json",
  JSON.stringify(instagramOrganicWithHumanDate, null, 2)
);

let linkedinOrganicWithHumanDate = [];

linkedinOrganic.forEach((item) => {
  linkedinOrganicWithHumanDate.push({
    name: item.name,
    followerData: item.followerData.map((followerData) => {
      const timestamp =
        followerData[0].toString().length === 8
          ? followerData[0] * 1000 // LinkedIn timestamp formatı için
          : followerData[0];

      return [
        new Date(timestamp).toLocaleDateString("tr-TR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        followerData[1],
      ];
    }),
  });
});

fs.writeFileSync(
  "./data/platforms/linkedinOrganicWithHumanDate.json",
  JSON.stringify(linkedinOrganicWithHumanDate, null, 2)
);
