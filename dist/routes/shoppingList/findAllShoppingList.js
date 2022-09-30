"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { ShoppingListModel, ShoppingListIngredients } = require('../../database/dbInit');
module.exports = (app) => {
    app.get('/api/shoppingLists', (req, res) => {
        ShoppingListModel.findByPk({
            attributes: [
                'id',
                'UserId',
            ],
            include: [
                {
                    model: ShoppingListIngredients,
                    attributes: ['ingredientId'],
                    through: {
                        attributes: ['quantity']
                    }
                },
            ]
        })
            .then((list) => {
            const msg = `Voici les listes de courses des utilisateurs.`;
            return res..send({ msg: msg, list: list });
        });
    });
};
