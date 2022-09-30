"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const collectErrors = (errors, type = '') => {
    let errorsTab = [];
    if (errors instanceof sequelize_1.ForeignKeyConstraintError) {
        errorsTab.push(`La valeur n'est pas valide pour le champ ${errors.fields}`);
    }
    if (errors instanceof sequelize_1.ValidationError) {
        errors.errors.map((e) => {
            errorsTab.push(e.message);
        });
    }
    return errorsTab;
};
module.exports = { collectErrors };
