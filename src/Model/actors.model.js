const mongoose = require("mongoose");

const actorsSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
      required: true,
    },
    DOB: { type: String, required: true },
    Bio: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Actors = mongoose.model("actors", actorsSchema);

module.exports = Actors;
