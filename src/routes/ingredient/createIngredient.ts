import { Express, Request, Response } from "express"
import { ValidationError } from 'sequelize'
import { IngredientInstance } from "../../types/modelsType"
const { IngredientModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.post('/api/ingredients', (req: Request, res: Response) => {
        IngredientModel.create({
            name: req.body.name,
            CategoryId: req.body.CategoryId
        })
            .then((ingredient: IngredientInstance) => {
                const msg = `L'ingrédient ${ ingredient.name } a bien été créée.`
                res.send({ msg: msg, ingredient: ingredient })
            })
            .catch((err: Error) => {
                if( err instanceof ValidationError){
                    let errorsTab: string[] = [];
                    err.errors.map( (e: any) => {
                        errorsTab.push(e.message);
                    })
                    return res.status(400).send({ msg: errorsTab });
                }
                const msg = `Une erreur est survenue : ${ err }`;
                res.status(500).send({msg: msg });
            })
    })
}