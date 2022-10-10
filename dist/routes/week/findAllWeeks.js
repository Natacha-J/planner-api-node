"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const { WeekModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.get('/api/weeks', auth, (req, res) => {
        WeekModel.findAll()
            .then((weeks) => {
            const msg = `Voici la liste des semaines.`;
            res.send({ msg: msg, weeks: weeks });
        })
            .catch((err) => {
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ error: msg });
        });
    });
};
