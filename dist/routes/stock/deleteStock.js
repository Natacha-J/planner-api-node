"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../../auth/auth');
const { StockIngredients } = require('../../database/dbInit');
module.exports = (app) => {
    app.delete('/api/stocks/:id', auth, (req, res) => {
        StockIngredients.findAll({
            where: {
                StockId: req.params.id
            }
        })
            .then((lists) => {
            if (lists.length == 0) {
                const msg = `Le stock ${req.params.id} est vide.`;
                return res.status(404).send({ msg: msg });
            }
            lists.map((list) => {
                StockIngredients.destroy({
                    where: {
                        StockId: list.StockId,
                    }
                });
            });
            const msg = `Le stock ${req.params.id} a été vidé.`;
            res.send({ msg: msg, stock: lists });
        })
            .catch((err) => {
            const msg = `Une erreur est survenue : ${err}`;
            res.status(500).send({ error: msg });
        });
    });
};
