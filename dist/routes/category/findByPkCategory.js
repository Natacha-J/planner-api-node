"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { CategoryModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.get('/api/categories/:id', (req, res) => {
        CategoryModel.findByPk(req.params.id, {
            attributes: [
                'id',
                'name'
            ]
        })
            .then((category) => {
            if (category === null) {
                const msg = `Il n'y a pas de catégorie à afficher.`;
                return res.status(404).send({ msg: msg });
            }
            const msg = `Voici la liste des catégories.`;
            res.send({ msg: msg, category: category });
        })
            .catch((err) => {
            res.status(500).send({ msg: `Une erreur est survenue : ${err}` });
        });
    });
};
