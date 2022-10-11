"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
let sequelize;
if (process.env.NODE_ENV === 'production') {
    sequelize = new sequelize_1.Sequelize('jzsrf298z1nrfzd4', 'stfouz9a22ror01g', 'zomqoo2lurmgp8ga', {
        host: 'iu51mf0q32fkhfpl.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    });
}
else {
    sequelize = new sequelize_1.Sequelize('planner', 'root', '', {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    });
}
sequelize.authenticate()
    .then(() => console.log('connexion réussie'))
    .catch((err) => console.log(`connexion échouée : ${err}`));
exports.default = sequelize;
