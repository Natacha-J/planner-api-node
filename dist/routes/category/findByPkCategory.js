"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const { CategoryModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.get('/api/categories/:id', auth, (req, res) => {
        CategoryModel.findByPk(req.params.id)
            .then((category) => {
            if (category === null) {
                const msg = `Il n'y a pas de catégorie à afficher.`;
                return res.status(404).send({ error: msg });
            }
            const msg = `Voici la liste des catégories.`;
            res.send({ msg: msg, category: category });
        })
            .catch((err) => {
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ error: msg });
        });
    });
};
