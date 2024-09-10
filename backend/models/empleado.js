import { DataTypes } from "sequelize";
import { sequelize } from "../config/conectionPostgresql.js";

const Empleado = sequelize.define(
  "Empleado",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha_ingreso: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    nombre: {
      type: DataTypes.STRING(100),
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
    salario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
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
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "empleado",
    timestamps: true,
    underscored: true,
  }
);

export default Empleado;
