const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  phoneNumber: { type: String, required: true },
  profilePic: { type: String, default: "https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/06/Gandalf-Lord-Of-The-Rings-You-Shall-Not-Pass.jpg" },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
},
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
