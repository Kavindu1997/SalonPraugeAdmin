const auth = require("../middleware/auth");
const _ = require("lodash");
const { Client, validate } = require("../models/client");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const clients = await Client.find().sort("firstname");

  res.send(clients);
});

router.get("/:id", async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (!client)
    return res.status(404).send("The client with the given ID was not found.");

  res.send(client);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let client = await Client.findOne({ email: req.body.email });
  if (client) return res.status(400).send("Client already registered.");

  client = new Client({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
  });
  await client.save();

  res.send(client);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let client = await Client.findOne({ email: req.body.email });

  if (client && client._id.toHexString() !== req.params.id)
    return res.status(400).send("Client already registered.");

  client = await Client.findByIdAndUpdate(
    req.params.id,
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
    },
    { new: true }
  );

  if (!client)
    return res.status(404).send("The client with the given ID was not found.");

  res.send(client);
});

router.delete("/:id", async (req, res) => {
  const client = await Client.findByIdAndRemove(req.params.id);

  if (!client)
    return res.status(404).send("The client with the given ID was not found.");

  res.send(client);
});

module.exports = router;
