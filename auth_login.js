const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken library

const app = express();
const port = 5002; // You can change this to your desired port number

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

// Function to generate a JWT token
const generateToken = (user) => {
  const secretKey = "your_secret_key"; // Replace this with a secret key used to sign the token
  const expiresIn = "1h"; // Token expiration time, e.g., 1 hour

  return jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn });
};

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const secretKey = "your_secret_key"; // Replace this with the same secret key used to sign the token

  jwt.verify(token.split(" ")[1], secretKey, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach the decoded user information to the request for further processing
    req.user = decodedToken;

    next();
  });
};

// Endpoint for user login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login request:", email, password);

  // Read the existing registration data from the JSON file
  const existingData = readRegisterData();

  // Find the user with the provided email or username
  const user = existingData.find(
    (user) => user.email === email || user.username === email
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  try {
    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If the password is valid, generate a JWT token
    const token = generateToken(user);

    // Return the token along with the user data
    res.json({ message: "Login successful", user: user, token: token });
  } catch (error) {
    console.error("Error while login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Authenticated route protected by the verifyToken middleware
app.get("/api/some_endpoint", verifyToken, (req, res) => {
  // The user information from the token is available in req.user
  console.log("Authenticated user:", req.user);

  // Handle the authenticated request here

  // For example, you can send a response with the user data
  res.json({ message: "Authenticated request successful", user: req.user });
});

app.listen(port, () => {
  console.log(`Authentication server is running on http://localhost:${port}`);
});
