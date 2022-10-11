"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbAccess_1 = require("../dbAccess");
const sequelize_1 = require("sequelize");
const Ingredient = dbAccess_1.default.define("Ingredient", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: { name: 'true', msg: `Cet ingrédient est déjà présent dans la liste.` },
        validate: {
            len: {
                args: [3, 40],
                msg: `Le nom doit contenir entre 3 et 40 caractères.`
            },
            notNull: { msg: `Un nom est obligatoire.` }
        }
    }
}, { timestamps: false });
module.exports = (Ingredient);
