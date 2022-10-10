"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const sequelize_1 = require("sequelize");
const { collectErrors } = require('../../helpers/errorsTab');
const { RecipeModel, RecipeIngredients, IngredientModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.post('/api/recipes', auth, (req, res) => {
        if (req.body.ingredients === undefined || req.body.ingredients.lenght === 0) {
            const msg = `Vous devez renseigner au moins un ingrédient pour enregitrer la recette.`;
            return res.status(400).send({ error: msg });
        }
        RecipeModel.create({
            title: req.body.title,
            UserId: req.body.UserId
        })
            .then((recipe) => {
            req.body.ingredients.map((ingredient) => {
                RecipeIngredients.create({
                    RecipeId: recipe.id,
                    IngredientId: ingredient.IngredientId,
                    quantity: ingredient.quantity
                });
            });
            const msg = `La recette a bien été créée.`;
            res.send({ msg: msg, recipe: { id: recipe.id, title: recipe.title } });
        })
            .catch((err) => {
            if (err instanceof sequelize_1.ValidationError) {
                const errorsTab = collectErrors(err);
                return res.status(400).send({ error: errorsTab });
            }
            else if (err instanceof sequelize_1.ForeignKeyConstraintError) {
                const errorsTab = collectErrors(err);
                return res.status(400).send({ error: errorsTab });
            }
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ error: msg });
        });
    });
};
