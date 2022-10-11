import { Express, Request, Response } from "express"
import { ValidationError } from "sequelize"
import { StockInstance } from "../../types/modelsType"
const auth = require('../../auth/auth')
const { collectErrors } = require('../../helpers/errorsTab')
const { StockModel, IngredientModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.get('/api/stocks/:id', auth, (req: Request, res: Response) => {
        StockModel.findAll({
            where: {
                id: req.params.id
            },    
            include: [
                {
                    model: IngredientModel,
                    attributes: [ 'id', "name", "CategoryId", "MeasureId"],
                    through: { attributes: ['quantity'] }
                }
            ]
        })
        .then((lists: StockInstance[]) => {
            if(lists === null){
                const msg = `Il n'y a pas de stock.`;
                return res.status(400).send({ error: msg });    
            }
            const msg = `Voici le stock ${ req.params.id }.`;
            return res.send({ msg: msg, stock: lists});
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