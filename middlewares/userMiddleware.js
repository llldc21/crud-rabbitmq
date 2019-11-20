const UserModel = require("../models/userModel");
const logger = require("../config/logger/winston");

class UserMiddleware {
  constructor() {
    this.userModel = UserModel;
  }

  async createUser({ username, email }) {
    if (username && email) {
      const res = await this.userModel
        .create({ username, email })
        .catch(error => {
          logger.error(`UserMiddleware -> createUser: -> Error: ${error}`);
          return false;
        });
      await logger.info(res);
      return { username, email };
    } else {
      await logger.error(
        `UserMiddleware -> createUser: -> Error: username and email is null`
      );
      return false;
    }
  }

  async listUsers() {
    const res = await this.userModel.find({}).catch(error => {
      logger.error(`UserMiddleware -> createUser: -> Error: ${error}`);
      return false;
    });
    return res;
  }
}

module.exports = new UserMiddleware();
