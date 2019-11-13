const UserModel = require("../models/userModel");
const logger = require("../config/logger/winston");

class UserMiddleware {
  constructor() {
    this.userModel = UserModel;
  }

  async createUser({ username, email }) {
    const res = await this.userModel
      .create({ username, email })
      .catch(error => {
        logger.error(`UserMiddleware -> createUser:11 -> Error: ${error}`);
        return false;
      });
    logger.info(res);
    return true;
  }
}

module.exports = new UserMiddleware();
