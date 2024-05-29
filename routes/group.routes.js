const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// importing Group.model
const Group = require("../models/Group.model")
const Expense = require("../models/Expense.model")

// Defining initial request for gome, GET all projects
router.get("/", (req, res, next) => {
  Group.find()
  // .populate("expenses users")
    .then((allGroups) => res.json(allGroups))
    .catch((err) => res.json(err));
});

router.post("/", (req,res,next) => {
  const { name, users } = req.body;

  Group.create({ name, users, expenses: [] })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
