const mongoose = require("mongoose");

const producersSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Gender: { type: String, required: true },
    DOB: { type: String, required: true },
    Bio: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Producers = mongoose.model("producers", producersSchema);

module.exports = Producers;
