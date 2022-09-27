"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { IngredientModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.put('/api/ingredients/:id', (req, res) => {
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
                    return res.status(404).send({ msg: msg });
                }
                const msg = `L'ingrédient ${ingredient.name} a bien été modifiée.`;
                res.send({ msg: msg, ingredient: ingredient });
            });
        })
            .catch((err) => {
            if (err instanceof sequelize_1.ValidationError) {
                let errorsTab = [];
                err.errors.map((e) => {
                    errorsTab.push(e.message);
                });
                return res.status(400).send({ msg: errorsTab });
            }
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ msg: msg });
        });
    });
};
