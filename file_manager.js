const fs = require("fs");
const readJsonFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    console.log("오류 발생: " + err);
    process.exit(1);
  }
};

module.exports = readJsonFile;