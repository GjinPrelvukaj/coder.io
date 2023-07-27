const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 5000; // Change this to the desired port number

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const DATA_FILE_PATH = "feedbacks.json"; // The path to your JSON file

// Function to read feedback data from the JSON file
const readFeedbacksData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading feedback data:", error);
    return [];
  }
};

// Function to write feedback data to the JSON file
const writeFeedbacksData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing feedback data:", error);
  }
};

app.post("/api/saveFeedback", (req, res) => {
  const feedback = req.body;

  // Read the existing feedbacks data from the JSON file
  const existingData = readFeedbacksData();

  // Create a new feedback object
  const newFeedback = {
    initialValue: feedback.initialValue,
    name: "New User",
    avatarSrc: "https://i.pravatar.cc/300?u=newuser",
    timestamp: new Date().toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  // Add the new feedback to the existing data array
  existingData.push(newFeedback);

  // Write the updated data back to the JSON file
  writeFeedbacksData(existingData);

  console.log("Feedback saved:", newFeedback);
  res.json(newFeedback);
});
