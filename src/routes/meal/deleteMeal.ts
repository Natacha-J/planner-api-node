import { Express, Request, Response } from "express"
const auth = require('../../auth/auth')
import { MealInstance } from "../../types/modelsType"
const { MealModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.delete('/api/meals/:id', auth, (req: Request, res: Response) => {
        MealModel.findByPk(req.params.id)
        .then((meal: MealInstance) => {
            if(meal === null){
                const msg = `Le repas ${req.params.id} n'existe pas.`;
                return res.status(404).send({ error: msg });
            }
            MealModel.destroy({
                where: {
                    id: meal.id
                }
            })
            .then(() => {
                const msg = `Le repas ${meal.id} a bien été supprimée.`;
                res.send({ msg: msg, meal: meal });

            })
        })
        .catch((err: Error) => {
            const msg = `Une erreur est survenue : ${ err }`;
            res.status(500).send({ error: msg });
        })
    })
}