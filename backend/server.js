const express = require("express");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app_secret = "Testing";

// app creation
const app = express();

// JSON middleware
app.use(express.json());
// Cookie middleware
app.use(cookieParser());
// CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware function to verify JWT
const verifyToken = (req, res, next) => {
  const jwt_token = req.cookies?.["auth-token"];

  if (!jwt_token) {
    return res.sendStatus(401);
  }

  jwt.verify(jwt_token, app_secret, (err, decoded) => {
    if (err) {
      res.clearCookie("auth-token");
      return res.sendStatus(401);
    }

    req.user = decoded; // Attach the decoded user information to the request object
    next();
  });
};

// AUTH endpoint
// Post request
// takes username, password form body
// returns jwt with userName and user_type, userType is decided on the string length of username
// sets the cookie auth-token on the browser
app.post("/auth", (req, res) => {
  const { username, password } = req.body;
  const user_type = username?.length % 2 === 0 ? "type_1" : "type_2";
  const user = {
    username,
    user_type,
  };

  const token = jwt.sign(user, app_secret, { expiresIn: "1h" });

  // cookie setting
  res.cookie("auth-token", token, {
    // can only be accessed by server requests
    httpOnly: true,
    // path = where the cookie is valid
    path: "/",
    // domain = what domain the cookie is valid on
    domain: "localhost",
    // secure = only send cookie over https
    secure: false,
    // sameSite = only send cookie if the request is coming from the same origin
    sameSite: "lax", // "strict" | "lax" | "none" (secure must be true)
    // maxAge = how long the cookie is valid for in milliseconds
    maxAge: 3600000, // 1 hour
  });

  // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Allow specific HTTP methods
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  // Allow specific headers to be sent in the request
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Allow credentials (e.g., cookies, authentication) to be included in requests
  res.setHeader("Access-Control-Allow-Credentials", true);

  // send json response
  res.json({ token, user_type });
});

// Delete request
// clears the token from the browser
app.delete("/auth", (req, res) => {
  res.clearCookie("auth-token"); // Clear the 'auth-token' cookie
  res.status(200).send("Auth token cleared successfully!");
});

// PROFILE endpoint
// takes in the auth-token cookie
// Returns username, usertype and some basic hardcoded details
app.get("/profile", verifyToken, (req, res) => {
  const details = req.user;
  let type;

  if (details.user_type === "type_2") {
    type = 2;
  } else {
    type = 1;
  }
  res.json({
    username: details?.username,
    user_type: type,
    DOB: "24-08-1999",
  });
});

const PORT = 3001;

// PORT Socket listening
app.listen(PORT, () => {
  console.log(`app starting on port ${PORT}`);
});
