const amqp = require("amqplib/callback_api");
let res = true

class RabbitmqService {
  constructor() {}

  async run(message, url) {
    amqp.connect(url, function(
      error0,
      connection
    ) {
      if (error0) {
        return res = false
      }

      connection.createChannel(function(error1, channel) {
        if (error1) {
          return res = false;
        }

        var queue = "teste";
        var msg = `${message}`;

        channel.assertQueue(queue, {
          durable: true,
          autoDelete: false,
        });

        channel.sendToQueue(queue, Buffer.from(msg));
      });
    });
    return res;
  }
}

module.exports = new RabbitmqService();
