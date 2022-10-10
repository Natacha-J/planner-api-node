"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const sequelize_1 = require("sequelize");
const { collectErrors } = require('../../helpers/errorsTab');
const { CategoryModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.put('/api/categories/:id', auth, (req, res) => {
        CategoryModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
            .then(() => {
            CategoryModel.findByPk(req.params.id)
                .then((category) => {
                if (category === null) {
                    const msg = `La catégorie ${req.params.id} n'existe pas.`;
                    return res.status(404).send({ error: msg });
                }
                const msg = `La catégorie ${category.name} a bien été modifiée.`;
                res.send({ msg: msg, category: category });
            });
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
