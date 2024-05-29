const { Schema, model } = require("mongoose");

const expenseSchema = new Schema({
  name: { type: String, required: true },
  concept: { type: String, required: true },
  amount: { type: Number, min: 0 },
  group: {
    type: Schema.Types.ObjectId,
    ref: "Group"
  },
  expenseAuthor: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  expensePayers: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
},
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

module.exports = model("Expense", expenseSchema);
