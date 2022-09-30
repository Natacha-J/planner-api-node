"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { collectErrors } = require('../../helpers/errorsTab');
const { ShoppingListModel, ShoppingListIngredients, IngredientModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.put('/api/shoppingLists/:id', (req, res) => {
        ShoppingListIngredients.findAll({
            where: {
                ShoppingListId: req.params.id
            }
        })
            .then((listIngredients) => {
            //remove shoppingList's ingredient not in user's request
            listIngredients.map((ingredientInList) => {
                ShoppingListIngredients.destroy({
                    where: {
                        IngredientId: ingredientInList.IngredientId,
                        ShoppingListId: req.params.id
                    }
                });
            });
            //add request's ingredients
            req.body.ingredients.map((ingredientInRequest) => {
                ShoppingListIngredients.create({
                    IngredientId: ingredientInRequest.IngredientId,
                    ShoppingListId: req.params.id,
                    quantity: ingredientInRequest.quantity
                });
            });
        })
            .then(() => {
            ShoppingListModel.findAll({
                where: {
                    id: req.params.id
                },
                include: [
                    {
                        model: IngredientModel,
                        attributes: ['id', "name", "CategoryId", "MeasureId"],
                        through: { attributes: ['quantity'] }
                    }
                ]
            })
                .then((lists) => {
                const msg = `La liste de courses ${req.params.id} a bien été mise à jour.`;
                return res.send({ msg: msg });
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
