"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const sequelize_1 = require("sequelize");
const { collectErrors } = require('../../helpers/errorsTab');
const { MeasureModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.post('/api/measures', auth, (req, res) => {
        MeasureModel.create({
            name: req.body.name,
        })
            .then((measure) => {
            const msg = `L'unité de mesure ${measure.name} a bien été créée.`;
            res.send({ msg: msg, measure: measure });
        })
            .catch((err) => {
            if (err instanceof sequelize_1.ValidationError) {
                const errorsTab = collectErrors(err);
                return res.status(400).send({ msg: errorsTab });
            }
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ msg: msg });
        });
    });
};
