const auth = require("../middleware/auth");
const _ = require("lodash");
const { User, validate, validateInvite } = require("../models/user");
const { Reservation } = require("../models/reservation");
const sendEmail = require("../services/mailService");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find().sort("firstname");

  res.send(users);
});

router.post("/availablestylists", async (req, res) => {
  const existReservations = await Reservation.find({
    date: req.body.date,
    time: req.body.time,
  }).select("stylist._id");

  let existStylists = existReservations.map((existReservation) =>
    existReservation.stylist._id.toHexString()
  );

  if (!req.body._id) {
    let users = await User.find({
      _id: { $nin: existStylists },
    });
    res.send(users);
  } else {
    let existStylist = await Reservation.find({ _id: req.body._id }).select(
      "stylist._id"
    );
    existStylist = existStylist.map((exist) => exist.stylist._id.toHexString());
    existStylists = existStylists.filter((exist) => existStylist[0] !== exist);

    let users = await User.find({ _id: { $nin: existStylists } });
    res.send(users);
  }
});

router.post("/invite", async (req, res) => {
  const { error } = validateInvite(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  });
  //await user.save();
  const token = user.generateAuthToken();
  res.status(200).send(user);
  sendEmail(req.body, token);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return res
      .status(404)
      .send("The admin user with the given ID was not found.");

  res.send(user);
});

router.put("/:id", async (req, res) => {
  const { error } = validateInvite(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (user && user._id.toHexString() !== req.params.id)
    return res.status(400).send("This email is already taken.");

  user = await User.findByIdAndUpdate(
    req.params.id,
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      // phone: req.body.phone,
    },
    { new: true }
  );

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user)
    return res
      .status(404)
      .send("The admin user with the given ID was not found.");

  res.send(user);
});

module.exports = router;
