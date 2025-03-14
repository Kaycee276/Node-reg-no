const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

const app = express();
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Please upload a PDF file.");
    }
  },
}); // Temporary file storage

const { logMessage } = require("./logger");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Kaycee1245&",
  port: 5432,
});

// API route to handle file upload and extract reg numbers
app.post("/upload", upload.single("pdf"), async (req, res) => {
  logMessage(
    `File upload attempted: ${req.file ? req.file.originalname : "No file"}`
  );
  if (!req.file || req.file.size === 0)
    return res
      .status(400)
      .json({ error: "No file uploaded. Please upload a PDF file." });

  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    logMessage(`Reading PDF file: ${req.file.originalname}`);
    const pdfData = await pdfParse(dataBuffer);

    // Extract UNN registration numbers
    const regNumbers = extractRegNumbers(pdfData.text);

    for (const regNumber of regNumbers) {
      await pool.query(
        "INSERT INTO registrations (reg_number) VALUES ($1) ON CONFLICT DO NOTHING",
        [regNumber]
      );
    }

    res.json({ regNumbers });
    logMessage(`File uploaded successfully: ${req.file.originalname}`);
  } catch (error) {
    res.status(500).json({
      error:
        "Error reading PDF file. Please ensure the file is valid. " +
        error.message,
    });
    logMessage(`Error reading PDF file: ${error.message}`);
  }
});

// Function to extract UNN registration numbers
function extractRegNumbers(text) {
  const regNumberPattern = /\b\d{12}[A-Z]{2}\b/g;
  const matches = text.match(regNumberPattern);
  return matches ? matches : ["No registration numbers found"];
}

// Export the app and extractRegNumbers function
module.exports = { app, extractRegNumbers };

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
