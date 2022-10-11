"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbAccess_1 = require("../dbAccess");
const Meal = dbAccess_1.default.define("Meal", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, { timestamps: false });
module.exports = (Meal);
