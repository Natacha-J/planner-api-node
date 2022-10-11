"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbAccess_1 = require("../dbAccess");
const sequelize_1 = require("sequelize");
const User = dbAccess_1.default.define("User", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pseudo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: {
            name: 'true',
            msg: `Ce pseudo est déjà pris.`,
        },
        validate: {
            len: {
                args: [3, 60],
                msg: `Le pseudo doit contenir entre 3 et 60 caractères.`
            },
            notNull: { msg: `Un pseudo est obligatoire.` }
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: {
            name: 'true',
            msg: `Cet e-mail est déjà enregistré.`,
        },
        validate: {
            notNull: { msg: `Un e-mail doit être renseigné.` }
        }
    },
    password: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: `Un mot de passe est obligatoire.` }
        }
    }
});
module.exports = (User);
