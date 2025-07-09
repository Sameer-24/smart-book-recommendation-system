const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favoriteAuthors: {
  type: [String],
  default: [],
},
favoriteGenres: {
  type: [String],
  default: [],
},
signupComplete: {
  type: Boolean,
  default: false,
}
});

module.exports = mongoose.model('User', userSchema);
