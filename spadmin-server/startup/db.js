const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/salonprauge-db")
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("error"));
};
