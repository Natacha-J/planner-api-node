import { Express, Request, Response } from "express"
const auth = require('../../auth/auth')
import { ValidationError } from 'sequelize'
const { collectErrors } = require('../../helpers/errorsTab')
import { MealInstance } from "../../types/modelsType"
const { MealModel, DayModel, TypeMealModel, WeekModel, IngredientModel, RecipeModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.put('/api/meals/:id', auth, (req: Request, res: Response) => {
        MealModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            MealModel.findByPk(req.params.id, {
                include: [
                    {
                        model: DayModel,
                        attributes: [ 'id', 'name']
                    },
                    {
                        model: TypeMealModel,
                        attributes: [ 'id', 'name']
                    },
                    {
                        model: WeekModel,
                        attributes: [ 'id', 'name']
                    },
                    {
                        model: IngredientModel,
                        attributes: [ 'id', 'name', 'MeasureId'],
                        through: {
                            attributes: [ 'quantity' ]
                        }
                    },
                    {
                        model: RecipeModel,
                        attributes: [ 'id', 'title'],
                        include: {
                            model: IngredientModel,
                            attributes: ['id', 'name'],
                            through: {
                                attributes: [ 'quantity' ]
                            }
                        }
                    }
    
                ]
            })
        })
        .then((meal: MealInstance) => {
            const msg = `Le repas a bien été mis à jour.`
            res.send({ msg: msg, meal: meal })
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