const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
  const allURLs = await URL.find({});
  res.render("home", {
    urls: allURLs,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

module.exports = router;
