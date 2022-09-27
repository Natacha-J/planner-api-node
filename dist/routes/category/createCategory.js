"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { CategoryModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.post('/api/categories', (req, res) => {
        CategoryModel.create({
            name: req.body.name,
        })
            .then((category) => {
            const msg = `La catégorie ${category.name} a bien été créée.`;
            res.send({ msg: msg, category: category });
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
