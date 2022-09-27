"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { IngredientModel, CategoryModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.get('/api/ingredients', (req, res) => {
        if (req.query.category) {
            return IngredientModel.findAll({
                include: [{
                        model: CategoryModel,
                        where: {
                            name: req.query.category
                        }
                    }]
            })
                .then((ingredients) => {
                if (ingredients.length === 0) {
                    const msg = `Il n'y a aucun ingrédient dans la catégorie ${req.query.category}.`;
                    return res.status(404).send({ msg: msg });
                }
                const msg = `Voici la liste des ingrédients de la catégorie ${req.query.category}.`;
                res.send({ msg: msg, ingredients: ingredients });
            });
        }
        IngredientModel.findAll()
            .then((ingredients) => {
            const msg = `Voici la liste des ingrédients.`;
            res.send({ msg: msg, ingredients: ingredients });
        })
            .catch((err) => {
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ msg: msg });
        });
    });
};
