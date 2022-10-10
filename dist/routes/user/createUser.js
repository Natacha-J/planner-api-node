"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcrypt = require('bcrypt');
const auth = require('../../auth/auth');
const { collectErrors } = require('../../helpers/errorsTab');
const { UserModel, ShoppingListModel, StockModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.post('/api/users', auth, (req, res) => {
        bcrypt.hash(req.body.password, 10)
            .then((pass) => {
            UserModel.create({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: pass
            })
                .then((user) => {
                StockModel.create({ UserId: user.id });
                ShoppingListModel.create({ UserId: user.id });
                const msg = `L'utilisateur ${user.pseudo} a bien été créée.`;
                res.send({
                    msg: msg,
                    user: {
                        id: user.id,
                        pseudo: user.pseudo,
                        email: user.email,
                    }
                });
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
