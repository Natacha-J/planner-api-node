"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const auth = require('../../auth/auth');
const { collectErrors } = require('../../helpers/errorsTab');
const { ShoppingListModel, IngredientModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.get('/api/shoppingLists/:id', auth, (req, res) => {
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
            if (lists === null) {
                const msg = `Il n'y a pas de liste de course.`;
                return res.status(400).send({ error: msg });
            }
            const msg = `Voici la liste de courses ${req.params.id}.`;
            return res.send({ msg: msg, shoppingList: lists });
        })
            .catch((err) => {
            if (err instanceof sequelize_1.ValidationError) {
                const errorsTab = collectErrors(err);
                return res.status(400).send({ error: errorsTab });
            }
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ error: msg });
        });
    });
};
