const express = require("express");
const cors = require("cors");
const auth = require("../routes/auth");
const register = require("../routes/register");
const users = require("../routes/users");
const clients = require("../routes/clients");
const types = require("../routes/types");
const status = require("../routes/status");
const reservations = require("../routes/reservations");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/register", register);
  app.use("/api/users", users);
  app.use("/api/clients", clients);
  app.use("/api/types", types);
  app.use("/api/status", status);
  app.use("/api/reservations", reservations);
  app.use(error);
};
