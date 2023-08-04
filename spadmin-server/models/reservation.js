const Joi = require("joi");
const mongoose = require("mongoose");
const { typeSchema } = require("./type");
const { statusSchema } = require("./status");

const Reservation = mongoose.model(
  "Reservation",
  new mongoose.Schema({
    type: {
      type: typeSchema,
      required: true,
    },
    client: {
      type: new mongoose.Schema({
        firstname: {
          type: String,
          required: true,
        },
        lastname: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
          minLength: 5,
          maxLength: 12,
        },
      }),
      required: true,
    },
    stylist: {
      type: new mongoose.Schema({
        firstname: {
          type: String,
          required: true,
        },
        lastname: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
      }),
      required: true,
    },
    status: {
      type: statusSchema,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  })
);

function validateReservation(reservation) {
  const schema = Joi.object({
    serviceId: Joi.objectId().required(),
    clientId: Joi.objectId().required(),
    stylistId: Joi.objectId().required(),
    statusId: Joi.objectId().required(),
    date: Joi.string().required(),
    time: Joi.string().required(),
  });

  return schema.validate(reservation);
}

exports.Reservation = Reservation;
exports.validate = validateReservation;
