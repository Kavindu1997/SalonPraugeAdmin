const mongoose = require("mongoose");
const Joi = require("joi");

const typeSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
});

const Type = mongoose.model("Type", typeSchema);

function validateType(type) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(type);
}

exports.typeSchema = typeSchema;
exports.Type = Type;
exports.validate = validateType;
