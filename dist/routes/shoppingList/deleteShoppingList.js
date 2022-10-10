"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const { ShoppingListIngredients } = require('../../database/dbInit');
module.exports = (app) => {
    app.delete('/api/shoppingLists/:id', auth, (req, res) => {
        ShoppingListIngredients.findAll({
            where: {
                ShoppingListId: req.params.id
            }
        })
            .then((lists) => {
            if (lists.length == 0) {
                const msg = `La liste de courses ${req.params.id} ne contient aucun ingrédient à supprimer.`;
                return res.status(404).send({ msg: msg });
            }
            lists.map((list) => {
                ShoppingListIngredients.destroy({
                    where: {
                        ShoppingListId: list.ShoppingListId,
                    }
                });
            });
            const msg = `La liste de course ${req.params.id} a été vidée.`;
            res.send({ msg: msg, shoppingList: lists });
        })
            .catch((err) => {
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ error: msg });
        });
    });
};
