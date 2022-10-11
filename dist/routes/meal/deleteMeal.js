"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const { MealModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.delete('/api/meals/:id', auth, (req, res) => {
        MealModel.findByPk(req.params.id)
            .then((meal) => {
            if (meal === null) {
                const msg = `Le repas ${req.params.id} n'existe pas.`;
                return res.status(404).send({ error: msg });
            }
            MealModel.destroy({
                where: {
                    id: meal.id
                }
            })
                .then(() => {
                const msg = `Le repas ${meal.id} a bien été supprimée.`;
                res.send({ msg: msg, meal: meal });
            });
        })
            .catch((err) => {
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ error: msg });
        });
    });
};
