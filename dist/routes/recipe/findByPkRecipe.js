"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const { RecipeModel, IngredientModel, UserModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.get('/api/recipes/:id', auth, (req, res) => {
        RecipeModel.findByPk(req.params.id, {
            attributes: [
                'id',
                'title'
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
                    }
                },
            ]
        })
            .then((recipe) => {
            if (recipe === null) {
                const msg = `Il n'y a pas de recettes à afficher.`;
                return res.status(404).send({ msg: msg });
            }
            const msg = `Voici la recette ${req.params.id}.`;
            res.send({ msg: msg, recipe: recipe });
        })
            .catch((err) => {
            res.status(500).send({ msg: `Une erreur est survenue : ${err}` });
        });
    });
};
