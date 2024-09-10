import { DBHOST, DBPORT, DBPASS, DBUSER, DBNAME } from "./config.js";

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(DBNAME, DBUSER, DBPASS, {
  host: DBHOST,
  port: DBPORT,
  dialect: "postgres",
  timezone: "-05:00",
});

export { sequelize };
