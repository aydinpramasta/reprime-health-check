import { DataTypes } from "sequelize";
import database from "../lib/database.js";

const Subscriber = database.define(
  "subscribers",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    telegram_chat_id: DataTypes.BIGINT,
  },
  { freezeTableName: true, createdAt: "created_at", updatedAt: "updated_at" }
);

export default Subscriber;
