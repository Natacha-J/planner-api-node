"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { collectErrors } = require('../../helpers/errorsTab');
const { RecipeModel, IngredientModel, RecipeIngredients } = require('../../database/dbInit');
module.exports = (app) => {
    app.put('/api/recipes/:id', (req, res) => {
        RecipeModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
            .then(() => {
            req.body.ingredients.map((ingredient) => {
                RecipeIngredients.destroy({
                    where: {
                        RecipeId: req.params.id,
                    }
                })
                    .then(() => {
                    RecipeIngredients.create({
                        RecipeId: req.params.id,
                        IngredientId: ingredient.IngredientId,
                        quantity: ingredient.quantity
                    });
                });
            });
        })
            .then(() => {
            RecipeModel.findByPk(req.params.id, {
                attributes: [
                    'id',
                    'title'
                ],
                include: [
                    {
                        model: IngredientModel,
                        attributes: ['name'],
                        through: {
                            attributes: ['quantity']
                        }
                    },
                ]
            })
                .then((recipe) => {
                if (recipe === null) {
                    const msg = `La recette ${req.params.id} n'existe pas.`;
                    return res.status(404).send({ msg: msg });
                }
                const msg = `La recette ${recipe.title} a bien été modifiée.`;
                res.send({ msg: msg, recipe: recipe });
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
