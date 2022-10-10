"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const { IngredientModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.delete('/api/ingredients/:id', auth, (req, res) => {
        IngredientModel.findByPk(req.params.id)
            .then((ingredient) => {
            if (ingredient === null) {
                const msg = `L'ingrédient ${req.params.id} n'existe pas.`;
                return res.status(404).send({ error: msg });
            }
            IngredientModel.destroy({
                where: {
                    id: ingredient.id
                }
            })
                .then(() => {
                const msg = `L'ingrédient ${ingredient.name} a bien été supprimé.`;
                res.send({
                    msg: msg,
                    ingredient: {
                        id: ingredient.id,
                        name: ingredient.name,
                        CategoryId: ingredient.CategoryId,
                        MeasureId: ingredient.MeasureId
                    }
                });
            })
                .catch((err) => {
                const msg = `Une erreur est survenue : ${err}`;
                res.status(500).send({ error: msg });
            });
        });
    });
};
