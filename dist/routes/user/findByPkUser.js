"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const { UserModel, StockModel, ShoppingListModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.get('/api/users/:id', auth, (req, res) => {
        UserModel.findByPk(req.params.id, {
            attributes: [
                'id',
                'pseudo',
                'email'
            ],
            include: [
                {
                    model: StockModel,
                    attributes: ['id'],
                },
                {
                    model: ShoppingListModel,
                    attributes: ['id'],
                }
            ]
        })
            .then((user) => {
            if (user === null) {
                const msg = `Il n'y a pas d'utilisateur avec l'identifiant ${req.params.id}.`;
                return res.status(404).send({ error: msg });
            }
            const msg = `Voici l'utilisateur ${req.params.id}.`;
            res.send({ msg: msg, user: user });
        })
            .catch((err) => {
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ error: msg });
        });
    });
};
