import { Express, Request, Response } from "express"
import { UserInstance } from "../../types/modelsType"
const auth = require('../../auth/auth')
const { UserModel, StockModel, ShoppingListModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.get('/api/users/:id', auth, (req:Request, res: Response) => {
        UserModel.findByPk(req.params.id,{
            attributes: [
                'id',
                'pseudo',
                'email'
            ],
            include: [
                {
                    model: StockModel,
                    attributes: [ 'id'],
                },
                {
                    model: ShoppingListModel,
                    attributes: [ 'id'],
                }
            ]
        })
        .then((user: UserInstance) => {
            if (user === null) {
                const msg = `Il n'y a pas d'utilisateur avec l'identifiant ${ req.params.id }.`;
                return res.status(404).send({ msg: msg });
            }
            const msg = `Voici l'utilisateur ${ req.params.id }.`
            res.send({ msg: msg, user: user })
        })
        .catch((err: Error) => {
            res.status(500).send({ msg: `Une erreur est survenue : ${ err }`});
        })
    })
}
