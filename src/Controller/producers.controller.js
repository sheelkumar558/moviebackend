const express = require("express");
const router = express.Router();
const Producers = require("../Model/Producers.model");
const { body, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  try {
    const producers = await Producers.find().lean().exec();
    return res.status(200).send({ producers: producers });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post(
  "/",

  body("Name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please enter your name")
    .isLength({ min: 3 })
    .withMessage("Name must be atleast 3 characters"),
  body("DOB")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please enter your date of birth"),
  body("Bio")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please enter your Bio")
    .isLength({ min: 5 })
    .withMessage("Bio must have atleast 5 characters"),
  body("Gender").trim().not().isEmpty().withMessage("Please enter your gender"),

  async (req, res) => {
    try {
      const producers = await Producers.create(req.body);
      return res.status(201).send({ producers: producers });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
);

router.get("/:id", async (req, res) => {
  try {
    const producers = await Producers.findById(req.params.id).lean().exec();
    return res.status(201).send({ producers: producers });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const actors = await Actors.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(201).send({ actors: actors });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const producers = await Producers.findByIdAndDelete(req.params.id)
      .lean()
      .exec()
      .lean()
      .exec();
    return res.status(201).send({ producers: producers });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
