import { Express, Request, Response } from "express"
const auth = require('../../auth/auth')
import { MeasureInstance } from "../../types/modelsType"
const { MeasureModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.delete('/api/measures/:id', auth, (req: Request, res: Response) => {
        MeasureModel.findByPk(req.params.id)
        .then((measure: MeasureInstance) => {
            if(measure === null){
                const msg = `L'unité de mesure ${req.params.id} n'existe pas.`;
                return res.status(404).send({ error: msg });
            }
            MeasureModel.destroy({
                where: {
                    id: measure.id
                }
            })
            .then(() => {
                const msg = `L'unité de mesure ${measure.name} a bien été supprimée.`;
                res.send({ msg: msg, measure: measure });

            })
        })
        .catch((err: Error) => {
            const msg = `Une erreur est survenue : ${ err }`;
            res.status(500).send({ error: msg });
        })
    })
}