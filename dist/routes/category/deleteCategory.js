"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const { CategoryModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.delete('/api/categories/:id', auth, (req, res) => {
        CategoryModel.findByPk(req.params.id)
            .then((category) => {
            if (category === null) {
                const msg = `La catégorie ${req.params.id} n'existe pas.`;
                return res.status(404).send({ msg: msg });
            }
            CategoryModel.destroy({
                where: { id: category.id }
            })
                .then(() => {
                const msg = `La catégorie ${category.name} a bien été supprimée.`;
                res.send({ msg: msg, category: category });
            });
        })
            .catch((err) => {
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ msg: msg });
        });
    });
};
