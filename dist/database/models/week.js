"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbAccess_1 = require("../dbAccess");
const Week = dbAccess_1.default.define("Week", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: { name: 'true', msg: `Ce nom est déjà présent dans la liste.` },
        validate: {
            notNull: { msg: `Un nom est obligatoire.` }
        }
    }
}, { timestamps: false });
module.exports = (Week);
