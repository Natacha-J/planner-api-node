"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const { MeasureModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.get('/api/measures', auth, (req, res) => {
        MeasureModel.findAll({
            attributes: [
                'id',
                'name'
            ]
        })
            .then((measures) => {
            const msg = `Voici la liste des unités de mesure.`;
            res.send({ msg: msg, measures: measures });
        })
            .catch((err) => {
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ error: msg });
        });
    });
};
