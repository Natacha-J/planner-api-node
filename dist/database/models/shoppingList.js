"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbAccess_1 = require("../dbAccess");
const sequelize_1 = require("sequelize");
const ShoppingList = dbAccess_1.default.define("ShoppingList", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, { timestamps: false });
module.exports = (ShoppingList);
