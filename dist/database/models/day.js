"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbAccess_1 = require("../dbAccess");
const sequelize_1 = require("sequelize");
const Day = dbAccess_1.default.define("Day", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: { name: 'true', msg: `Ce jour est déjà présent dans la liste.` }
    }
}, { timestamps: false });
module.exports = (Day);
