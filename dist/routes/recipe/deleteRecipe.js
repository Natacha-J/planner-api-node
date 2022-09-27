"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { RecipeModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.delete('/api/recipes/:id', (req, res) => {
        RecipeModel.findByPk(req.params.id)
            .then((recipe) => {
            if (recipe === null) {
                const msg = `La recette ${req.params.id} n'existe pas.`;
                return res.status(404).send({ msg: msg });
            }
            RecipeModel.destroy({
                where: {
                    id: recipe.id
                }
            })
                .then(() => {
                const msg = `La recette ${recipe.title} a bien été supprimée.`;
                res.send({ msg: msg, cookingDish: recipe });
            });
        })
            .catch((err) => {
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ msg: msg });
        });
    });
};
