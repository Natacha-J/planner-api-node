"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbAccess_1 = require("../dbAccess");
const sequelize_1 = require("sequelize");
const TypeMeal = dbAccess_1.default.define("TypeMeal", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: { name: 'true', msg: `Ce type de repas est déjà présent dans la liste.` }
    }
}, { timestamps: false });
module.exports = (TypeMeal);
