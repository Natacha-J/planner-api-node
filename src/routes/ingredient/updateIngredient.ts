import { Express, Request, Response } from "express"
const auth = require('../../auth/auth')
import { ForeignKeyConstraintError, ValidationError } from 'sequelize';
const { collectErrors } = require('../../helpers/errorsTab')
import { IngredientInstance } from "../../types/modelsType"
const { IngredientModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.put('/api/ingredients/:id', auth,(req: Request, res: Response) => {
        IngredientModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            IngredientModel.findByPk(req.params.id)
            .then((ingredient: IngredientInstance) => {
                if(ingredient === null){
                    const msg = `L'ingrédient ${ req.params.id } n'existe pas.`;
                    return res.status(404).send({ msg: msg });
                }
                const msg = `L'ingrédient ${ ingredient.name } a bien été modifiée.`;
                res.send({ 
                    msg: msg,
                    ingredient: {
                        id: ingredient.id,
                        name: ingredient.name,
                        CategoryId: ingredient.CategoryId,
                        MeasureId: ingredient.MeasureId
                    }
                });
            })
        })
        .catch((err : Error) => {
            if( err instanceof ValidationError){
                const errorsTab = collectErrors(err)
                return res.status(400).send({ msg: errorsTab });
            }
            if( err instanceof ForeignKeyConstraintError){
                const errorsTab = collectErrors(err)
                return res.status(400).send({ msg: errorsTab });
            }
            const msg = `Une erreur est survenue : ${ err }`;
            res.status(500).send({ msg: msg });
        })
    })
}