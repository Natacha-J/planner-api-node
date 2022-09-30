import { Express, Request, Response } from "express"
const auth = require('../../auth/auth')
import { ValidationError } from 'sequelize'
const { collectErrors } = require('../../helpers/errorsTab')
import { MeasureInstance } from "../../types/modelsType"
const { MeasureModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.post('/api/measures', auth, (req: Request, res: Response) => {
        MeasureModel.create({
            name: req.body.name,
        })
        .then((measure: MeasureInstance) => {
            const msg = `L'unité de mesure ${ measure.name } a bien été créée.`
            res.send({ msg: msg, measure: measure })
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