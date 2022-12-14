"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const { IngredientModel, CategoryModel, MeasureModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.get('/api/ingredients', auth, (req, res) => {
        if (req.query.category) {
            return IngredientModel.findAll({
                attributes: [
                    'id',
                    'name',
                ],
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
                    return res.status(404).send({ error: msg });
                }
                const msg = `Voici la liste des ingrédients de la catégorie ${req.query.category}.`;
                res.send({ msg: msg, ingredients: ingredients });
            });
        }
        IngredientModel.findAll({
            attributes: [
                'id',
                'name',
            ],
            include: [
                {
                    model: CategoryModel,
                    attributs: ['id', 'name']
                },
                {
                    model: MeasureModel,
                    attributs: ['id', 'name']
                }
            ]
        })
            .then((ingredients) => {
            const msg = `Voici la liste des ingrédients.`;
            res.send({ msg: msg, ingredients: ingredients });
        })
            .catch((err) => {
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ error: msg });
        });
    });
};
