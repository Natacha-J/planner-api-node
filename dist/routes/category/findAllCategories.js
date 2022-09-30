"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const { CategoryModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.get('/api/categories', auth, (req, res) => {
        if (req.query.category) {
            return CategoryModel.findAll()
                .then((categories) => {
                if (categories.length === 0) {
                    const msg = `Il n'y a aucune catégorie ${req.query.category}.`;
                    return res.status(404).send({ msg: msg });
                }
                const msg = `Voici la liste de la catégorie ${req.query.category}.`;
                res.send({ msg: msg, categories: categories });
            });
        }
        CategoryModel.findAll({
            attributes: [
                'id',
                'name'
            ]
        })
            .then((categories) => {
            const msg = `Voici la liste des catégories.`;
            res.send({ msg: msg, categories: categories });
        })
            .catch((err) => {
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ msg: msg });
        });
    });
};
