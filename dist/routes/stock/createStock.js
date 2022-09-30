"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const auth = require('../../auth/auth');
const { collectErrors } = require('../../helpers/errorsTab');
const { StockModel, StockIngredients, IngredientModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.post('/api/stocks/:id', auth, (req, res) => {
        StockIngredients.findAll({
            where: {
                StockId: req.params.id
            }
        })
            .then((listIngredients) => {
            //remove stockList's ingredient not in user's request
            listIngredients.map((ingredientInList) => {
                StockIngredients.destroy({
                    where: {
                        IngredientId: ingredientInList.IngredientId,
                        StockId: req.params.id
                    }
                });
            });
            //add request's ingredients
            req.body.ingredients.map((ingredientInRequest) => {
                StockIngredients.create({
                    IngredientId: ingredientInRequest.IngredientId,
                    StockId: req.params.id,
                    quantity: ingredientInRequest.quantity
                });
            });
        })
            .then(() => {
            StockModel.findAll({
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
                const msg = `Le stock ${req.params.id} a bien été mise à jour.`;
                return res.send({ msg: msg, stock: lists });
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
