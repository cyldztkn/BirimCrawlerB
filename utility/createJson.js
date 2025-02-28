import fs from "fs";
import path from "path";

function saveJsonToFile(data, slug) {
  const timestamp = new Date()
    .toLocaleString()
    .replace(/[:.]/g, "-")
    .replace(/ /g, "_");
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const localISOTime = new Date(now - offset).toISOString().slice(0, -1);
  const formattedTimestamp = localISOTime
    .replace(/T/, "-T-")
    .replace(/:/g, "-")
    .split(".")[0];
  const filename = `${formattedTimestamp}.json`;
  const filepath = `./exports/${slug}/${filename}`;

  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), "utf8");
}

export { saveJsonToFile };
