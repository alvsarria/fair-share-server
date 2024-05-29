const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// importing Group.model

// Defining initial request for gome, GET all projects
router.get("/", (req, res, next) => {
  res.status(200).json({ message: "Nothing to see here, for the moment" });
});

module.exports = router;