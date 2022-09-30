import { Express, Request, Response } from "express"
import { ValidationError } from "sequelize"
import { UserInstance } from "../../types/modelsType"
const auth = require('../../auth/auth')
const { collectErrors } = require('../../helpers/errorsTab')
const { UserModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.put('/api/users/:id', auth, (req: Request, res: Response) => {
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
            .then((user: UserInstance) => {
                if(user === null){
                    const msg = `L'utilisateur ${ req.params.id } n'existe pas.`;
                    return res.status(404).send({ msg: msg });
                }
                const msg = `L'utilisateur ${ user.pseudo } a bien été modifié.`;
                res.send({ msg: msg, user: user });
            })
        })
        .catch((err : Error) => {
            if( err instanceof ValidationError){
                const errorsTab = collectErrors(err)
                return res.status(400).send({ msg: errorsTab });
            }
            const msg = `Une erreur est survenue : ${ err }`;
            res.status(500).send({ msg: msg });
        })
    })
}