const path = require("path");
const { createLogger, format, transports } = require("winston");
const { timestamp, combine, printf, colorize, errors, json } = format;

// const logFormat = printf(({ level, message, timestamp, stack }) => {
//   return `${timestamp} ${level}: ${stack || message}`;
// });

const logger = createLogger({
  level: "info",
  format: combine(
    timestamp(/*{ format: "YYYY-MM-DD HH:mm:ss" }*/),
    errors({ stack: true }),
    json()
  ),
  defaultMeta: { service: "CPG" },
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(
        __dirname,
        "..",
        "logs",
        "_run_logs",
        "combined.json"
      ),
    }),
  ],
});

module.exports = logger;
