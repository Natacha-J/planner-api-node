import { Express, Request, Response } from "express"
import { ValidationError } from 'sequelize'
import { UserInstance } from "../../types/modelsType"
const bcrypt = require('bcrypt')
const auth = require('../../auth/auth')
const { collectErrors } = require('../../helpers/errorsTab')
const { UserModel, ShoppingListModel, StockModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.post('/api/users', auth, (req: Request, res: Response) => {
        bcrypt.hash(req.body.password, 10)
        .then((pass: string) => {
            UserModel.create({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: pass
            })
            .then((user: UserInstance) => {
                StockModel.create({ UserId: user.id })
                ShoppingListModel.create({ UserId: user.id })
                const msg = `L'utilisateur ${ user.pseudo } a bien été créée.`
                res.send({ 
                    msg: msg,
                    user: {
                        id: user.id,
                        pseudo: user.pseudo,
                        email: user.email,
                    }
                })
            })
        })
        .catch((err : Error) => {
            if( err instanceof ValidationError){
                const errorsTab = collectErrors(err)
                return res.status(400).send({ error: errorsTab });
            }
            const msg = `Une erreur est survenue : ${ err }`;
            res.status(500).send({ error: msg });
        })
    })
}