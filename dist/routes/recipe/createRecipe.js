"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { RecipeModel, RecipeIngredients, IngredientModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.post('/api/recipes', (req, res) => {
        if (req.body.ingredients === undefined || req.body.ingredients.lenght === 0) {
            const msg = `Vous devez renseigner au moins un ingrédient pour enregitrer la recette.`;
            return res.status(400).send({ msg: msg });
        }
        RecipeModel.create({
            title: req.body.title
        })
            .then((recipe) => {
            req.body.ingredients.map((ingredient) => {
                RecipeIngredients.create({
                    RecipeId: recipe.id,
                    IngredientId: ingredient.IngredientId,
                    quantity: ingredient.quantity
                });
            });
            const msg = `La recette ${recipe.title} a bien été créée.`;
            res.send({ msg: msg, recipe: recipe });
        })
            .catch((err) => {
            if (err instanceof sequelize_1.ValidationError) {
                let errorsTab = [];
                err.errors.map((e) => {
                    errorsTab.push(e.message);
                });
                return res.status(400).send({ msg: errorsTab });
            }
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ msg: msg });
        });
    });
};
