const express = require("express");
const router = express.Router();

const { testController } = require("../controllers/testControllers");

router.get("/test", testController);

module.exports = router;