const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

router.get("/test", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

module.exports = router;