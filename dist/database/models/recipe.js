"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbAccess_1 = require("../dbAccess");
const sequelize_1 = require("sequelize");
const Recipe = dbAccess_1.default.define("Recipe", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [3, 60],
                msg: `Le titre doit contenir entre 3 et 60 caractères.`
            },
            notNull: { msg: `Un titre est obligatoire.` }
        }
    }
});
module.exports = (Recipe);
