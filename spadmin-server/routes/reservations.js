const { Reservation, validate } = require("../models/reservation");
const { Type } = require("../models/type");
const { Status } = require("../models/status");
const { Client } = require("../models/client");
const { User } = require("../models/user");
const moment = require("moment");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const reservations = await Reservation.find().sort("date time");

  res.send(reservations);
});

router.get("/eachday", async (req, res) => {
  const reservations = await Reservation.aggregate([
    { $match: { date: moment().format("YYYY-MM-DD") } },
    { $group: { _id: "$stylist._id", day_count: { $sum: 1 } } },
    { $project: { stylist: "$_id", day_count: 1, _id: 0 } },
  ]);
  res.send(reservations);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const type = await Type.findById(req.body.serviceId);
  if (!type) return res.status(400).send("Invalid Service.");

  const client = await Client.findById(req.body.clientId);
  if (!client) return res.status(400).send("Invalid Client.");

  const stylist = await User.findById(req.body.stylistId);
  if (!stylist) return res.status(400).send("Invalid Stylist.");

  const status = await Status.findById(req.body.statusId);
  if (!status) return res.status(400).send("Invalid Status.");

  if (req.body.date === moment().format("YYYY-MM-DD")) {
    const startTime = moment(req.body.time, "h:mma");
    const currentTime = moment(moment(), "h:mma");

    if (startTime.isBefore(currentTime)) {
      return res.status(400).send("Invalid Time.");
    }
  }

  const limits = await Reservation.find({
    "stylist._id": req.body.stylistId,
    date: req.body.date,
  });

  if (limits.length >= 8)
    return res.status(400).send("Stylist not available today.");

  const slot = await Reservation.find({
    "stylist._id": req.body.stylistId,
    date: req.body.date,
    time: req.body.time,
  });

  if (slot.length !== 0)
    return res.status(400).send("This time slot not available.");

  const reservation = new Reservation({
    type: {
      _id: type._id,
      name: type.name,
    },
    client: {
      _id: client._id,
      firstname: client.firstname,
      lastname: client.lastname,
      email: client.email,
      phone: client.phone,
    },
    stylist: {
      _id: stylist._id,
      firstname: stylist.firstname,
      lastname: stylist.lastname,
      email: stylist.email,
    },
    status: {
      _id: status._id,
      name: status.name,
    },
    date: req.body.date,
    time: req.body.time,
  });
  await reservation.save();

  res.status(201).send(reservation);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const type = await Type.findById(req.body.serviceId);
  if (!type) return res.status(400).send("Invalid Service.");

  const client = await Client.findById(req.body.clientId);
  if (!client) return res.status(400).send("Invalid Client.");

  const stylist = await User.findById(req.body.stylistId);
  if (!stylist) return res.status(400).send("Invalid Stylist.");

  const status = await Status.findById(req.body.statusId);
  if (!status) return res.status(400).send("Invalid Status.");

  if (req.body.date === moment().format("YYYY-MM-DD")) {
    const startTime = moment(req.body.time, "h:mma");
    const currentTime = moment(moment(), "h:mma");

    const existReservationTime = await Reservation.findById(
      req.params.id
    ).select("time");

    if (
      existReservationTime.time !== req.body.time &&
      startTime.isBefore(currentTime)
    ) {
      return res.status(400).send("Invalid Time.");
    }
  }

  const limits = await Reservation.find({
    "stylist._id": req.body.stylistId,
    date: req.body.date,
  });

  const skipLimit = limits.find(
    (limit) => limit._id.toHexString() === req.params.id
  );

  if (!skipLimit && limits.length >= 8)
    return res.status(400).send("Stylist not available today.");

  const slot = await Reservation.find({
    "stylist._id": req.body.stylistId,
    date: req.body.date,
    time: req.body.time,
  });

  if (slot.length !== 0 && slot[0]._id.toHexString() !== req.params.id)
    return res.status(400).send("This time slot not available.");

  const reservation = await Reservation.findByIdAndUpdate(
    req.params.id,
    {
      type: {
        _id: type._id,
        name: type.name,
      },
      client: {
        _id: client._id,
        firstname: client.firstname,
        lastname: client.lastname,
        email: client.email,
        phone: client.phone,
      },
      stylist: {
        _id: stylist._id,
        firstname: stylist.firstname,
        lastname: stylist.lastname,
        email: stylist.email,
      },
      status: {
        _id: status._id,
        name: status.name,
      },
      date: req.body.date,
      time: req.body.time,
    },
    { new: true }
  );

  if (!reservation)
    return res
      .status(404)
      .send("The reservation with the given ID was not found.");

  res.send(reservation);
});

router.delete("/:id", async (req, res) => {
  const reservation = await Reservation.findByIdAndRemove(req.params.id);

  if (!reservation)
    return res
      .status(404)
      .send("The reservation with the given ID was not found.");

  res.send(reservation);
});

router.get("/:id", async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);

  if (!reservation)
    return res
      .status(404)
      .send("The reservation with the given ID was not found.");

  res.send(reservation);
});

module.exports = router;
