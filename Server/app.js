const express = require("express");
const app = express();

app.use(express.json());

const testRoutes = require("./routes/testRoutes");
app.use("/api", testRoutes);

app.get("/", (req, res) => {
  res.send("Backend working");
});

module.exports = app;