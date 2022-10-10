"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const { MealModel, DayModel, TypeMealModel, WeekModel, IngredientModel, RecipeModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.get('/api/meals', auth, (req, res) => {
        MealModel.findAll({
            include: [
                {
                    model: DayModel,
                    attributes: ['id', 'name']
                },
                {
                    model: TypeMealModel,
                    attributes: ['id', 'name']
                },
                {
                    model: WeekModel,
                    attributes: ['id', 'name']
                },
                {
                    model: IngredientModel,
                    attributes: ['id', 'name', 'MeasureId'],
                    through: {
                        attributes: ['quantity']
                    }
                },
                {
                    model: RecipeModel,
                    attributes: ['id', 'title'],
                    include: {
                        model: IngredientModel,
                        attributes: ['id', 'name'],
                        through: {
                            attributes: ['quantity']
                        }
                    }
                }
            ]
        })
            .then((meals) => {
            if (meals.length === 0) {
                const msg = `Il n'y a pas de repas enregistrer.`;
                return res.status(404).send({ error: msg });
            }
            const msg = `Voici la liste des repas enregistrée.`;
            res.send({ msg: msg, meals: meals });
        })
            .catch((err) => {
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ error: msg });
        });
    });
};
