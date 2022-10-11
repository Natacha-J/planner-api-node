import { Express, Request, Response } from "express"
const auth = require('../../auth/auth')
import { WeekInstance } from "../../types/modelsType"
const { WeekModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.get('/api/weeks', auth, (req: Request, res: Response) => {
        WeekModel.findAll()
            .then((weeks: WeekInstance) => {
                const msg = `Voici la liste des semaines.`
                res.send({ msg: msg, weeks: weeks })
            })
            .catch((err: Error) => {
                const msg = `Une erreur est survenue : ${ err }`;
                res.status(500).send({ error: msg });
            })
    })
}