"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const { TypeMealModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.get('/api/typeMeals', auth, (req, res) => {
        TypeMealModel.findAll()
            .then((typeMeals) => {
            const msg = `Voici la liste des types de repas.`;
            res.send({ msg: msg, typeMeals: typeMeals });
        })
            .catch((err) => {
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ error: msg });
        });
    });
};
