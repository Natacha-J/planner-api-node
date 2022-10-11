import { Express, Request, Response } from "express"
const auth = require('../../auth/auth')
import { ValidationError } from "sequelize"
import { MeasureInstance } from "../../types/modelsType"
const { collectErrors } = require('../../helpers/errorsTab')
const { MeasureModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.put('/api/measures/:id', auth, (req: Request, res: Response) => {
        MeasureModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            MeasureModel.findByPk(req.params.id, {
                attributes: [
                    'id',
                    'name'
                ]   
            })
            .then((measure: MeasureInstance) => {
                if(measure === null){
                    const msg = `L'unité de mesure ${ req.params.id } n'existe pas.`;
                    return res.status(404).send({ error: msg });
                }
                const msg = `L'unité de mesure a bien été modifiée.`;
                res.send({ msg: msg, measure: measure });
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