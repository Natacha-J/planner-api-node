"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const { UserModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.get('/api/users', auth, (req, res) => {
        UserModel.findAll({
            attributes: [
                'id',
                'pseudo',
                'email'
            ]
        })
            .then((users) => {
            const msg = `Voici la liste des utilisateurs.`;
            res.send({ msg: msg, users: users });
        })
            .catch((err) => {
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ error: msg });
        });
    });
};
