// ~~~~~~~~~~~~~~~~~ MODELS - USER ~~~~~~~~~~~~~~~~~
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// rules for user
const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// rules for password confirmation
userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

// system checks if passwords are identicals
userSchema.pre('validate', function checkPasswordsMatch(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'Passwords do not match');
  }
  next();
});

// pre save hook - hashes the password
userSchema.pre('save', function hashPassword(next) {
  //if user's pwd is modified, hash the password using bcrypt + add salt
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

// systems validate if password correct
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// ========== module exports ==========
module.exports = mongoose.model('User', userSchema);
