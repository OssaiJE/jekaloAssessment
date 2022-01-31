const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name_prefix: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
