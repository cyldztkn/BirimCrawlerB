import fs from "fs";
import path from "path";

function saveHtmlToFile(htmlData, filename = "test.html") {
  const filepath = path.join(process.cwd(), filename);
  fs.writeFileSync(filepath, htmlData, "utf8");
}

export default saveHtmlToFile;
