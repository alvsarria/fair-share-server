const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// importing User.model
const User = require("../models/User.model")

// Gets user details
router.get("/:userId", (req, res, next) => {
    const {userId} = req.params;
    User.findById(userId)
        // .populate("expenses users")
        .then((User) => res.json(User))
        .catch((error) => res.json(error));
});

// Updates user details
router.put("/:userId", (req, res, next) => {
    const {userId} = req.params;

    if(req.body.name === "" | req.body.lastName === "" | req.body.dateOfBirth === "" | req.body.phoneNumber === "" | req.body.email === "" ){
        res.status(400).json({message: "Please fill all the fields"})
        return;
    };

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
      };

    User.findByIdAndUpdate(userId, req.body, {new: true})
    .then(() => res.status(202).json({message: "User updated!"}))
    .catch((error) => res.json(error));
})

module.exports = router;