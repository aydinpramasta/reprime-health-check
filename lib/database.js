import { DataTypes, Sequelize } from "sequelize";
import config from "./config.js";

const database = new Sequelize(
  config.database.name,
  config.database.username,
  config.database.password,
  {
    dialect: config.database.dialect,
    host: config.database.host,
    port: config.database.port,
  }
);

export default database;
