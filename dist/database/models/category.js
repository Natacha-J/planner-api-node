"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbAccess_1 = require("../dbAccess");
const sequelize_1 = require("sequelize");
const Category = dbAccess_1.default.define("Category", {
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
                args: [3, 40],
                msg: `Le nom de la catégorie doit contenir entre 3 et 40 caractères.`
            },
            notNull: { msg: `Un nom de catégorie est obligatoire.` }
        }
    },
});
module.exports = (Category);
