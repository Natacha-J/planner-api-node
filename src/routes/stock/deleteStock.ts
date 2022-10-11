import { Express, Request, Response } from "express"
import { StockInstance } from "../../types/modelsType"
const auth = require('../../auth/auth')
const { StockIngredients } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.delete('/api/stocks/:id', auth, (req: Request, res: Response) => {
        StockIngredients.findAll({
            where: {
                StockId : req.params.id
            }
        })
        .then((lists: StockInstance[]) => {
            if(lists.length == 0){
                const msg = `Le stock ${req.params.id} est vide.`;
                return res.status(404).send({ msg: msg });
            }
            lists.map((list: any) => {
                StockIngredients.destroy({
                    where: {
                        StockId: list.StockId,
                    }
                })
            })
            const msg = `Le stock ${ req.params.id } a été vidé.`;
            res.send({ msg: msg, stock: lists });
        })
        .catch((err: Error) => {
            const msg = `Une erreur est survenue : ${ err }`;
            res.status(500).send({ error: msg });
        })
    })
}