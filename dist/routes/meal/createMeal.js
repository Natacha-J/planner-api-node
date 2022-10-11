"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const sequelize_1 = require("sequelize");
const { collectErrors } = require('../../helpers/errorsTab');
const { MealModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.post('/api/meals', auth, (req, res) => {
        MealModel.create(req.body)
            .then((meal) => {
            const msg = `Le repas a bien été enregistré.`;
            res.send({ msg: msg, meal: meal });
        })
            .catch((err) => {
            if (err instanceof sequelize_1.ValidationError) {
                const errorsTab = collectErrors(err);
                return res.status(400).send({ error: errorsTab });
            }
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ error: msg });
        });
    });
};
