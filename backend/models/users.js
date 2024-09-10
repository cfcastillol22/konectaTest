import { DataTypes } from "sequelize";
import { sequelize } from "../config/conectionPostgresql.js";
import bcrypt from "bcrypt";
const Users = sequelize.define(
  "Users",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      set(value) {
        this.setDataValue(
          "nombre",
          value.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;")
        );
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
      set(value) {
        this.setDataValue("email", value.trim().toLowerCase());
      },
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM("EMPLEADO", "ADMINISTRADOR"),
      allowNull: false,
      defaultValue: "EMPLEADO",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    created_by: {
      type: DataTypes.STRING,
    },
    updated_by: {
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password_hash) {
          const salt = await bcrypt.genSalt(10);
          user.password_hash = await bcrypt.hash(user.password_hash, salt);
        }
      },
    },
    tableName: "users",
    timestamps: true,
    underscored: true,
  }
);

export default Users;
