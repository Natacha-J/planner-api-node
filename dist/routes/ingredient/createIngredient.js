"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const sequelize_1 = require("sequelize");
const { collectErrors } = require('../../helpers/errorsTab');
const { IngredientModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.post('/api/ingredients', auth, (req, res) => {
        IngredientModel.create(req.body)
            .then((ingredient) => {
            const msg = `L'ingrédient ${ingredient.name} a bien été créée.`;
            res.send({
                msg: msg,
                ingredient: {
                    id: ingredient.id,
                    name: ingredient.name,
                    CategoryId: ingredient.CategoryId,
                    MeasureId: ingredient.MeasureId
                }
            });
        })
            .catch((err) => {
            if (err instanceof sequelize_1.ValidationError) {
                const errorsTab = collectErrors(err);
                return res.status(400).send({ msg: errorsTab });
            }
            if (err instanceof sequelize_1.ForeignKeyConstraintError) {
                const errorsTab = collectErrors(err);
                return res.status(400).send({ msg: errorsTab });
            }
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ msg: msg });
        });
    });
};
