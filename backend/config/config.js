import dotenv from "dotenv";

dotenv.config();

const {
  PORT,
  ENV,
  DBPORT,
  DBHOST,
  DBUSER,
  DBPASS,
  DBNAME,
  JWT_SECRET,
  FRONTEND,
} = process.env;

export {
  PORT,
  DBPORT,
  DBHOST,
  DBUSER,
  DBPASS,
  DBNAME,
  ENV,
  JWT_SECRET,
  FRONTEND,
};
