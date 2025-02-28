import { load } from "cheerio";
import { console } from "inspector";
// import getFocusedMedia from "./getFocusedMedia.js";

async function parseInstagramData(html, type) {
  if (!html) {
    throw new Error("HTML content is empty");
  }

  try {
    const $ = load(html, {
      xmlMode: false,
      decodeEntities: true,
    });

    const data = [];

    // // Debug için tablo yapısını kontrol et
    // console.log("Table HTML:", $("table").html());
    // console.log("Number of tr elements:", $("tr").length);

    // Her tr elementini işle
    $("tr").each(async (_, element) => {
      const tr = $(element);
      const itemId = tr.attr("data-item-id");
      const lastDate = tr.attr("data-last-date");
      const link = tr.find("td:first-child a").first().attr("href") || "";

      // TimeStamp
      // console.log(typeof lastDate);
      // const [day, month, year, time] = lastDate.split(/[\s.:]/);
      // const date = new Date(year, month - 1, day, ...time.split(":"));
      // const timestamp = date.getTime() / 1000; // Unix timestamp in seconds

      if (itemId && lastDate) {
        const dataObject = {
          id: itemId,
          time: lastDate,
          // timestamp,
          link,
          caption: tr.find("td:first-child a").first().attr("title") || "",
          like: tr.find("td:nth-child(3) a").text().trim(),
          comment: tr.find("td:nth-child(4) a").text().trim(),
        };

        if (type == "facebookOrganic") {
          dataObject.shere = tr.find("td:nth-child(5) a").text().trim();
        }
        if (type == "youtubeOrganic") {
          dataObject.watch = tr.find("td:nth-child(5) a").text().trim();
        }
        if (type == "instagramOrganic") {
          dataObject.rawDetails = `${link}?__a=1&__d=dis`;
        }

        data.push(dataObject);
      }
    });

    return data;
  } catch (error) {
    throw new Error("Failed to parse Instagram data");
  }
}

export default parseInstagramData;
