const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// importing Group.model
const Group = require("../models/Group.model")
const Expense = require("../models/Expense.model")

// Routes for groups without req.params

// Gets all projects - Home Page
router.get("/:userId", (req, res, next) => {
  const {userId} = req.params;
  Group.find({ users: userId })
    // .populate("expenses users")
    .then((allGroups) => res.json(allGroups))
    .catch((error) => res.json(error));
});

// Creates new group for expenses - Home Page
router.post("/", (req, res, next) => {
  const { name, userId, users } = req.body;

  Group.create({ name, expenses: [], admin: userId, users })
    .then((response) => res.status(201).json(response))
    .catch((error) => res.json(error));
});

// Deletes group - Home Page
router.delete("/", (req, res, next) => {
  const { _id, userId } = req.body;

  // Checks _id is a valid object type for our model
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  };

  // Only admin can delete group, we sent the userid through the request and check if it is
  // an admin of the group that wants to delete
  Group.findById(_id)
    .then((response) => {

      if (response.admin != userId) {
        res.status(400).json({ message: "You are not an admin for this group" })
        return;
      }

      // return promise here to concatonate next promises
      return Group.findByIdAndDelete(_id)
    })
    .then((deletedGroup) => res.status(202).json(deletedGroup))
    .catch((error) => res.json(error));
});

// Routes for groups with req.params

// Gets a specific group based on url params from details page - Details page
router.get("/:groupId", (req, res, next) => {
  const { groupId } = req.params;

  // Checks _id is a valid object type for our model
  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  };

  Group.findById(groupId)
    .populate("expenses users")
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

// Updates group information based on url params from details page - Details page
router.put("/:groupId", (req, res, next) => {
  const { groupId } = req.params;

  // Checks _id is a valid object type for our model
  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  };

  Group.findByIdAndUpdate(groupId, req.body, { new: true })
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

// Deletes group based on params from details page - Details page
router.delete("/:groupId", (req, res, next) => {
  const { userId } = req.body;
  const { groupId } = req.params;

  // Checks _id is a valid object type for our model
  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  };

  // Only admin can delete group, we sent the userid through the request and check if it is
  // an admin of the group that wants to delete
  Group.findById(groupId)
    .then((response) => {

      if (response.admin != userId) {
        res.status(400).json({ message: "You are not an admin for this group" })
        return;
      }

      return Group.findByIdAndDelete(groupId)
    })
    .then((deletedGroup) => res.status(202).json(deletedGroup))
    .catch((error) => res.json(error));
});

module.exports = router;