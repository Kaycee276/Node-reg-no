const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "upload.log");

function logMessage(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} - ${message}\n`;
  fs.appendFileSync(logFilePath, logEntry);
}

module.exports = { logMessage };
