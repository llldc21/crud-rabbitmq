const UserModel = require("../models/userModel");
const logger = require("../config/logger/winston");

const RabbitmqService = require("../service/rabbitmqService");
class UserMiddleware {
  constructor() {
    this.userModel = UserModel;
    this.rabbitmqService = RabbitmqService;
    this.url = process.env.RABBIT_URL || "amqp://guest:guest@rabbit:5672";
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
      await this.rabbitmqService.run(res, this.url).catch(error => {
        logger.error(
          `UserMiddleware -> createUser -> rabbitmqService -> Error: ${error}`
        );
        return false;
      });
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
      logger.error(`UserMiddleware -> listUsers: -> Error: ${error}`);
      return false;
    });
    return res;
  }

  async updateUsers(body, params) {
    const res = await this.userModel
      .updateOne({ _id: params.id }, { body })
      .catch(error => {
        logger.error(`UserMiddleware -> updateUsers: -> Error: ${error}`);
        return false;
      });
    return res;
  }

  async deleteUsers(id) {
    const res = await this.userModel.deleteOne({ _id: id }).catch(error => {
      logger.error(`UserMiddleware -> deleteUsers: -> Error: ${error}`);
      return false;
    });
    return res;
  }
}

module.exports = new UserMiddleware();
