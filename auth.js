const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const bcrypt = require("bcrypt");

const app = express();
const port = 5001; // You can change this to your desired port number

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE_PATH = "register.json"; // The path to your JSON file

// Function to read registration data from the JSON file
const readRegisterData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading registration data:", error);
    return [];
  }
};

// Function to write registration data to the JSON file
const writeRegisterData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing registration data:", error);
  }
};

// Endpoint for user registration
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Read the existing registration data from the JSON file
  const existingData = readRegisterData();

  // Check if the username or email is already taken
  if (
    existingData.some(
      (user) => user.username === username || user.email === email
    )
  ) {
    return res.status(409).json({ message: "Username or email already taken" });
  }

  try {
    // Generate a new unique ID for the user (You can use a UUID library for a real-world app)
    const newUserId = existingData.length + 1;

    // Log the original password before hashing
    console.log("Original Password:", password);

    // Hash the password using bcrypt before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Log the hashed password
    console.log("Hashed Password:", hashedPassword);

    // Create a new user object with the hashed password
    const newUser = {
      id: newUserId,
      username: username,
      email: email,
      password: hashedPassword,
    };

    // Log the new user object
    console.log("New User:", newUser);

    // Add the new user to the existing data array
    existingData.push(newUser);

    // Write the updated data back to the JSON file
    writeRegisterData(existingData);

    console.log("User registered:", newUser);
    res.json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error while registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(
    `User registration server is running on http://localhost:${port}`
  );
});
