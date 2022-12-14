"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const auth = require('../../auth/auth');
const { collectErrors } = require('../../helpers/errorsTab');
const { UserModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.put('/api/users/:id', auth, (req, res) => {
        UserModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
            .then(() => {
            UserModel.findByPk(req.params.id, {
                attributes: [
                    'id',
                    'pseudo',
                    'email',
                ]
            })
                .then((user) => {
                if (user === null) {
                    const msg = `L'utilisateur ${req.params.id} n'existe pas.`;
                    return res.status(404).send({ error: msg });
                }
                const msg = `L'utilisateur ${user.pseudo} a bien été modifié.`;
                res.send({ msg: msg, user: user });
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
