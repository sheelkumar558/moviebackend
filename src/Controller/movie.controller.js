const express = require("express");
const router = express.Router();
const Movie = require("../Model/movie.model");
const { body, validationResult } = require("express-validator");

// Crud...
router.get("/", async (req, res) => {
  try {
    const movie = await Movie.find()
      .populate(["actorId", "producerId"])
      .lean()
      .exec();
    return res.status(200).send({ movie: movie });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// p...
router.post(
  "/",
  // validations...

  body("Name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please enter any song name")
    .isLength({ min: 3 })
    .withMessage("Name must be atleast 3 characters"),
  body("Poster").trim().not().isEmpty().withMessage("Please enter poster URl"),
  body("Year_of_release")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please enter year of release"),
  body("Plot").trim().not().isEmpty().withMessage("Please enter plot number"),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const movie = await Movie.create(req.body);
      return res.status(201).send({ movie: movie });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
);

// single Song...
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).lean().exec();
    return res.status(201).send({ movie: movie });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

//patch Song...
router.patch("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(201).send({ movie: movie });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// delete Song...
router.delete("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(201).send({ movie: movie });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
