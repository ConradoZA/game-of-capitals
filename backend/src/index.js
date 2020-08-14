const express = require("express");
require("dotenv").config();
const scoresRouter = require("./routes/scores");

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.options("/*", (req, res) => res.send());

// Routes
app.get("/", (req, res) =>
  res.send("Hi! Your princess/prince is in another endpoint")
);
app.use("/scores", scoresRouter);

// Create server
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
