import { Express, Request, Response } from "express"
const auth = require('../../auth/auth')
import { MeasureInstance } from "../../types/modelsType"
const { MeasureModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.get('/api/measures', auth, (req: Request, res: Response) => {
        MeasureModel.findAll({
            attributes: [
                'id',
                'name'
            ]
        })
            .then((measures: MeasureInstance) => {
                const msg = `Voici la liste des unités de mesure.`
                res.send({ msg: msg, measures: measures })
            })
            .catch((err: Error) => {
                const msg = `Une erreur est survenue : ${ err }`;
                res.status(500).send({ error: msg });
            })
    })
}