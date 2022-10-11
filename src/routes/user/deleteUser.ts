import { Express, Request, Response } from "express"
import { UserInstance } from "../../types/modelsType"
const auth = require('../../auth/auth')
const { UserModel, ShoppingListModel, StockModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.delete('/api/users/:id', auth, (req: Request, res: Response) => {
        UserModel.findByPk(req.params.id)
        .then((user: UserInstance) => {
            if(user === null){
                const msg = `L'utilisateur ${ req.params.id } n'existe pas.`;
                return res.status(404).send({ msg: msg });
            }
            ShoppingListModel.destroy({
                 where: { UserId: user.id }
            })
            StockModel.destroy({
                where: { UserId: user.id }
            })
            .then(() => {
                UserModel.destroy({
                    where: { id: user.id }
                })
            })
            .then(() => {
                const msg = `L'utilisateur ${ user.pseudo } a bien été supprimé.`;
                res.send({
                    msg: msg,
                    user: {
                        pseudo: user.pseudo,
                        email: user.email
                    }
                });

            })
        })
        .catch((err: Error) => {
            const msg = `Une erreur est survenue : ${ err }`;
            res.status(500).send({ error: msg });
        })
    })
}