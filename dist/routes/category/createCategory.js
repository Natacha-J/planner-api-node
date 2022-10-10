"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const sequelize_1 = require("sequelize");
const { collectErrors } = require('../../helpers/errorsTab');
const { CategoryModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.post('/api/categories', auth, (req, res) => {
        CategoryModel.create({
            name: req.body.name,
        })
            .then((category) => {
            const msg = `La catégorie ${category.name} a bien été créée.`;
            res.send({ msg: msg, category: category });
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
