"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const { RecipeModel, IngredientModel, UserModel, MeasureModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.get('/api/recipes', auth, (req, res) => {
        RecipeModel.findAll({
            attributes: [
                'id',
                'title',
            ],
            include: [
                {
                    model: UserModel,
                    attributes: ['id', 'pseudo']
                },
                {
                    model: IngredientModel,
                    attributes: ['name'],
                    through: {
                        attributes: ['quantity']
                    },
                    include: {
                        model: MeasureModel,
                        attributes: ['id', 'name']
                    }
                }
            ]
        })
            .then((recipes) => {
            if (recipes.length === 0) {
                const msg = `Il n'y a pas de recettes à afficher.`;
                return res.status(404).send({ error: msg });
            }
            const msg = `Voici la liste des recettes.`;
            res.send({ msg: msg, recipes: recipes });
        })
            .catch((err) => {
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ error: msg });
        });
    });
};
