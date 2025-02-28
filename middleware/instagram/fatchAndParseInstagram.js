import parseInstagramData from "../../utility/parseInstagramData.js";
import fetchInstagramData from "../../utility/fetchInstagramPosts.js";

export default async function fetchAndParseInstagramData(id, type) {
  try {
    const html = await fetchInstagramData(id);
    const parsedData = parseInstagramData(html, type);
    // console.log("Final Parsed Data:", JSON.stringify(parsedData, null, 2));
    // return JSON.stringify(parsedData, null, 2);
    return parsedData;
  } catch (error) {
    console.error("Main Error:", error.message);
    process.exit(1);
  }
}
