const express = require("express");
const app = express();

app.use(express.json());

const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api", testRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend working");
});

module.exports = app;