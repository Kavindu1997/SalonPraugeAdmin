const mongoose = require("mongoose");
const Joi = require("joi");

const statusSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
});

const Status = mongoose.model("Status", statusSchema);

function validateStatus(state) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(state);
}

exports.statusSchema = statusSchema;
exports.Status = Status;
exports.validate = validateStatus;
