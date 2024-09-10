import { sequelize } from "../config/conectionPostgresql.js";

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    return { result: true, msg: "Success" };
  } catch (error) {
    return { result: false, msg: `Error: ${error.message}` };
  }
};

export default testDbConnection;
