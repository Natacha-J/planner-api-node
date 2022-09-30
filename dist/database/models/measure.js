"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbAccess_1 = require("../dbAccess");
const sequelize_1 = require("sequelize");
const Measure = dbAccess_1.default.define("Measure", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 10],
                msg: `Le nom de la mesure doit contenir entre 1 et 10 caractères.`
            },
            notNull: { msg: `Un nom de mesure est obligatoire.` }
        }
    }
}, { timestamps: false });
module.exports = (Measure);
