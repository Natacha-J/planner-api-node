import { Express, Request, Response } from "express"
const auth = require('../../auth/auth')
import { DayInstance } from "../../types/modelsType"
const { DayModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.get('/api/days', auth, (req: Request, res: Response) => {
        DayModel.findAll()
            .then((days: DayInstance) => {
                const msg = `Voici la liste des jours.`
                res.send({ msg: msg, days: days })
            })
            .catch((err: Error) => {
                const msg = `Une erreur est survenue : ${ err }`;
                res.status(500).send({ error: msg });
            })
    })
}