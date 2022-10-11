"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const sequelize_1 = require("sequelize");
const { collectErrors } = require('../../helpers/errorsTab');
const { IngredientModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.put('/api/ingredients/:id', auth, (req, res) => {
        IngredientModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
            .then(() => {
            IngredientModel.findByPk(req.params.id)
                .then((ingredient) => {
                if (ingredient === null) {
                    const msg = `L'ingrédient ${req.params.id} n'existe pas.`;
                    return res.status(404).send({ error: msg });
                }
                const msg = `L'ingrédient ${ingredient.name} a bien été modifiée.`;
                res.send({ msg: msg, ingredient: ingredient });
            });
        })
            .catch((err) => {
            if (err instanceof sequelize_1.ValidationError) {
                const errorsTab = collectErrors(err);
                return res.status(400).send({ error: errorsTab });
            }
            if (err instanceof sequelize_1.ForeignKeyConstraintError) {
                const errorsTab = collectErrors(err);
                return res.status(400).send({ error: errorsTab });
            }
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ error: msg });
        });
    });
};
