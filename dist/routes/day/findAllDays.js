"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const { DayModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.get('/api/days', auth, (req, res) => {
        DayModel.findAll()
            .then((days) => {
            const msg = `Voici la liste des jours.`;
            res.send({ msg: msg, days: days });
        })
            .catch((err) => {
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ error: msg });
        });
    });
};
