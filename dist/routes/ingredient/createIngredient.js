"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { IngredientModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.post('/api/ingredients', (req, res) => {
        IngredientModel.create({
            name: req.body.name,
            CategoryId: req.body.CategoryId
        })
            .then((ingredient) => {
            const msg = `L'ingrédient ${ingredient.name} a bien été créée.`;
            res.send({ msg: msg, ingredient: ingredient });
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
