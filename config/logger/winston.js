const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new transports.File({ filename: "./logs/%DATE%.log" })]
});

module.exports = logger;
