const User = require("../models/User");

module.exports = class ValidateService {
  static validatePassword(password, confirmPassord) {
    if (password != confirmPassord) {
      return true;
    } else {
      return false;
    }
  }
  static async validateEmail(email) {
    const dbEmail = await User.findOne({ where: { email: email } });
    if (dbEmail) {
      return true;
    } else {
      return false;
    }
  }
};
