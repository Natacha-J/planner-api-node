"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { UserModel } = require('../database/dbInit');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const private_key = require('../auth/private_key');
module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        UserModel.findOne({
            where: {
                pseudo: req.body.pseudo
            }
        })
            .then((user) => {
            if (!user) {
                const msg = `L'utilisateur ${req.body.pseudo} n'existe pas.`;
                return res.status(400).send({ error: msg });
            }
            bcrypt.compare(req.body.password, user.password)
                .then((isPasswordValid) => {
                if (!isPasswordValid) {
                    const msg = `Le mot de passe est incorrect.`;
                    return res.status(400).send({ error: msg });
                }
                //JWT
                const token = jwt.sign({ userId: user.id }, private_key, { expiresIn: '24h' });
                const msg = `L'utilisateur ${user.pseudo} est bien connecté.`;
                return res.send({ msg: msg, user: token });
            });
        })
            .catch((err) => {
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ error: msg });
        });
    });
};
