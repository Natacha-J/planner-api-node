"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const { MeasureModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.delete('/api/measures/:id', auth, (req, res) => {
        MeasureModel.findByPk(req.params.id)
            .then((measure) => {
            if (measure === null) {
                const msg = `L'unité de mesure ${req.params.id} n'existe pas.`;
                return res.status(404).send({ error: msg });
            }
            MeasureModel.destroy({
                where: {
                    id: measure.id
                }
            })
                .then(() => {
                const msg = `L'unité de mesure ${measure.name} a bien été supprimée.`;
                res.send({ msg: msg, measure: measure });
            });
        })
            .catch((err) => {
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ error: msg });
        });
    });
};
