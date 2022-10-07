import { Express, Request, Response } from "express"
const auth = require('../../auth/auth')
import { ValidationError, ForeignKeyConstraintError } from 'sequelize'
const { collectErrors } = require('../../helpers/errorsTab')
import { IngredientInstance } from "../../types/modelsType"
const { IngredientModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.post('/api/ingredients', auth,(req: Request, res: Response) => {
        IngredientModel.create(req.body)
            .then((ingredient: IngredientInstance) => {
                const msg = `L'ingrédient ${ ingredient.name } a bien été créée.`
                res.send({ 
                    msg: msg,
                    ingredient: {
                        id: ingredient.id,
                        name: ingredient.name,
                        CategoryId: ingredient.CategoryId,
                        MeasureId: ingredient.MeasureId
                } })
            })
        .catch((err : Error) => {
            if( err instanceof ValidationError){
                const errorsTab = collectErrors(err)
                return res.status(400).send({ error: errorsTab });
            }
            if(err instanceof ForeignKeyConstraintError){
                const errorsTab = collectErrors(err)
                return res.status(400).send({error : errorsTab})
            }
            const msg = `Une erreur est survenue : ${ err }`;
            res.status(500).send({ error: msg });
        })
    })
}