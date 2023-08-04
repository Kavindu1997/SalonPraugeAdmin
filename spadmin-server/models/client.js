const mongoose = require("mongoose");
const Joi = require("joi");

const clientSchema = new mongoose.Schema({
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
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 12,
  },
});

const Client = mongoose.model("Client", clientSchema);

function validateClient(client) {
  const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().min(5).max(12).required(),
  });

  return schema.validate(client);
}

exports.clientSchema = clientSchema;
exports.Client = Client;
exports.validate = validateClient;
