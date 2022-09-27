"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('planner-bis', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT-2'
    },
    logging: false
});
/* const sequelize = new Sequelize('tfx4sp48k4lingbl', 'nea6jzxrd3l4n784', 'c4empgcpyl7vn8v4', {
    host: 'iu51mf0q32fkhfpl.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT-2'
    },
    logging: false
}) */
sequelize.authenticate()
    .then(() => console.log('connexion réussie'))
    .catch((err) => console.log(`connexion échouée : ${err}`));
exports.default = sequelize;
