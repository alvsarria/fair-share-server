const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// importing Group.model
const Group = require("../models/Group.model")
const Expense = require("../models/Expense.model")

// Routes for home page in the client, groupId for HHTP request needs to be sent 
// through the request body
router.get("/groups", (req, res, next) => {
  Group.find()
    // .populate("expenses users")
    .then((allGroups) => res.json(allGroups))
    .catch((error) => res.json(error));
});

router.post("/groups", (req, res, next) => {
  const { name, users } = req.body;

  Group.create({ name, expenses: [], users })
    .then((response) => res.status(201).json(response))
    .catch((error) => res.json(error));
});

router.delete("/groups", (req, res, next) => {
  const { _id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  };

  Group.findByIdAndDelete(_id)
    .then((response) => res.status(202).json(response))
    .catch((error) => res.json(error));
});

// Routes for details page in the client, groupId as request parameter
router.get("/groups/:groupId", (req, res, next) => {
  const { groupId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  };

  Group.findById(groupId)
    .populate("expenses users")
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

router.put("/groups/:groupId", (req, res, next) => {
  const { groupId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  };

  Group.findByIdAndUpdate(groupId, req.body, { new: true })
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

router.delete("/groups/:groupId", (req, res, next) => {
  const { groupId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  };

  Group.findByIdAndDelete(groupId)
    .then((response) => res.status(202).json(response))
    .catch((error) => res.json(error));
});

module.exports = router;
