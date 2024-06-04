const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// importing Group.model
const Group = require("../models/Group.model")
const Expense = require("../models/Expense.model")

// Routes for groups without req.params

// Gets all expenses
router.get("/details/:expenseId", (req, res, next) => {
    const { expenseId } = req.params
    Expense.findById(expenseId)
        .populate("expenseAuthor expenseUsers")
        .then((allExpenses) => res.json(allExpenses))
        .catch((error) => res.json(error));
});


// Creates a new expense and updates group collection that the expense is part of
router.post("/", (req, res, next) => {
    const { name, concept, amount, group, userId, expensePayers } = req.body;

    Expense.create({ name, concept, amount, group, expenseAuthor: userId, expensePayers })
        .then((newExpense) => {
            return Group.findByIdAndUpdate(group, { $push: { expenses: newExpense._id } }, { new: true })
        })
        .then((updatedGroup) => res.json(updatedGroup))
        .catch((error) => res.json(error));
});

// Deletes expense
router.delete("/:groupId/:userId/:expenseId", (req, res, next) => {
    const { expenseId, userId, groupId } = req.params;

    // Checks _id is a valid object type for our model
    if (!mongoose.Types.ObjectId.isValid(expenseId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    };

    // Only admin can delete group, we sent the userid through the request and check if it is
    // an admin of the group that wants to delete
    Expense.findByIdAndDelete(expenseId)
        .then((response) => {

            // if (response.expenseAuthor !== userId) {
            //     res.status(400).json({ message: [groupId, userId, expenseId] })
            //     return;
            // };

            // return promise here to concatonate next promises
            return Group.findByIdAndUpdate(groupId, { $pull: { groupExpenses: expenseId } }, { new: true });
        })
        .then((deletedExpense) => res.status(202).json({ message: "lol" }))
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
        .populate("groupExpenses groupUsers")
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

//to dos: 



module.exports = router;