"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const { UserModel, ShoppingListModel, StockModel } = require('../../database/dbInit');
module.exports = (app) => {
    app.delete('/api/users/:id', auth, (req, res) => {
        UserModel.findByPk(req.params.id)
            .then((user) => {
            if (user === null) {
                const msg = `L'utilisateur ${req.params.id} n'existe pas.`;
                return res.status(404).send({ msg: msg });
            }
            ShoppingListModel.destroy({
                where: { UserId: user.id }
            });
            StockModel.destroy({
                where: { UserId: user.id }
            })
                .then(() => {
                UserModel.destroy({
                    where: { id: user.id }
                });
            })
                .then(() => {
                const msg = `L'utilisateur ${user.pseudo} a bien été supprimé.`;
                res.send({
                    msg: msg,
                    user: {
                        pseudo: user.pseudo,
                        email: user.email
                    }
                });
            });
        })
            .catch((err) => {
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ error: msg });
        });
    });
};
