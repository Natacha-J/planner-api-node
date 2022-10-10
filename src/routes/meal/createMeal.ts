import { Express, Request, Response } from "express"
const auth = require('../../auth/auth')
import { ValidationError } from 'sequelize'
const { collectErrors } = require('../../helpers/errorsTab')
import { MealInstance } from "../../types/modelsType"
const { MealModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.post('/api/meals', auth, (req: Request, res: Response) => {
        MealModel.create(req.body)
        .then((meal: MealInstance) => {
            const msg = `Le repas a bien été enregistré.`
            res.send({ msg: msg , meal: meal })
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