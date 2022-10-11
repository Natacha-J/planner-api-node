"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const sequelize_1 = require("sequelize");
const { collectErrors } = require('../../helpers/errorsTab');
const { MealModel, DayModel, TypeMealModel, WeekModel, IngredientModel, RecipeModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.put('/api/meals/:id', auth, (req, res) => {
        MealModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
            .then(() => {
            MealModel.findByPk(req.params.id, {
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
            });
        })
            .then((meal) => {
            const msg = `Le repas a bien été mis à jour.`;
            res.send({ msg: msg, meal: meal });
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
