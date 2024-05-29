const { Schema, model } = require("mongoose");

const groupSchema = new Schema({
  name: { type: String, required: true },
  expenses: [{
    type: Schema.Types.ObjectId,
    ref: "Expense"
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]
},
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

module.exports = model("Group", groupSchema);
