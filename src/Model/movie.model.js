const mongoose = require("mongoose");

// Movie schema

const MovieSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Year_of_release: { type: Number, required: true },
    Plot: { type: Number, required: true },
    Poster: { type: String, required: true },
    actorId: [{ type: mongoose.Schema.Types.ObjectId, ref: "actors" }],
    producerId: { type: mongoose.Schema.Types.ObjectId, ref: "producers" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Movie Model

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
// Name, Year of Release, Name, Gender, DOB, Bio
// Plot, Poster
