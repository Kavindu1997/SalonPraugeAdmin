const { Status, validate } = require("../models/status");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const status = await Status.find();
  res.send(status);
});

module.exports = router;
