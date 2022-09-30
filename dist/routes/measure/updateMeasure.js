"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const sequelize_1 = require("sequelize");
const { collectErrors } = require('../../helpers/errorsTab');
const { MeasureModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.put('/api/categories/:id', auth, (req, res) => {
        MeasureModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
            .then(() => {
            MeasureModel.findByPk(req.params.id, {
                attributes: [
                    'id',
                    'name'
                ]
            })
                .then((measure) => {
                if (measure === null) {
                    const msg = `L'unité de mesure ${req.params.id} n'existe pas.`;
                    return res.status(404).send({ msg: msg });
                }
                const msg = `L'unité de mesure a bien été modifiée.`;
                res.send({ msg: msg, measure: measure });
            });
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
