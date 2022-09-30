import { Express, Request, Response } from "express"
import { UserInstance } from "../../types/modelsType"
const auth = require('../../auth/auth')
const { UserModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.get('/api/users', auth, (req: Request, res: Response) => {
        UserModel.findAll({
            attributes: [
                'id',
                'pseudo',
                'email'
            ]
        })
            .then((users: UserInstance) => {
                const msg = `Voici la liste des utilisateurs.`
                res.send({ msg: msg, users: users })
            })
            .catch((err: Error) => {
                const msg = `Une erreur est survenue : ${ err }`;
                res.status(500).send({msg: msg });
            })
    })
}