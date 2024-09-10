import Empleado from "./empleado.js";
import { DataTypes } from "sequelize";
import { sequelize } from "../config/conectionPostgresql.js";

const Solicitud = sequelize.define(
  "Solicitud",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
      set(value) {
        this.setDataValue(
          "codigo",
          value.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;")
        );
      },
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      set(value) {
        this.setDataValue(
          "descripcion",
          value.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;")
        );
      },
    },
    resumen: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
      set(value) {
        this.setDataValue(
          "resumen",
          value.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;")
        );
      },
    },
    empleado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Empleado,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    created_by: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "solicitud",
    timestamps: true,
    underscored: true,
  }
);

Solicitud.belongsTo(Empleado, { foreignKey: "empleado_id", as: "empleado" });

export default Solicitud;
