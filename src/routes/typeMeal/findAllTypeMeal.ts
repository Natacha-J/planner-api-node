import { Express, Request, Response } from "express"
const auth = require('../../auth/auth')
import { TypeMealInstance } from "../../types/modelsType"
const { TypeMealModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.get('/api/typeMeals', auth, (req: Request, res: Response) => {
        TypeMealModel.findAll()
            .then((typeMeals: TypeMealInstance) => {
                const msg = `Voici la liste des types de repas.`
                res.send({ msg: msg, typeMeals: typeMeals })
            })
            .catch((err: Error) => {
                const msg = `Une erreur est survenue : ${ err }`;
                res.status(500).send({ error: msg });
            })
    })
}