import { Express, Request, Response } from "express"
const auth = require('../../auth/auth')
import { ForeignKeyConstraintError, ValidationError } from 'sequelize'
const { collectErrors } = require('../../helpers/errorsTab')
import { RecipeIngredientsInstance, RecipeInstance } from "../../types/modelsType"
const { RecipeModel, RecipeIngredients, IngredientModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.post('/api/recipes', auth, (req: Request, res: Response) => {
        if (req.body.ingredients === undefined || req.body.ingredients.lenght === 0) {
            const msg = `Vous devez renseigner au moins un ingrédient pour enregitrer la recette.`
           return res.status(400).send({ msg: msg })
        }
        RecipeModel.create({
            title: req.body.title,
            UserId: req.body.UserId
        })
        .then((recipe: RecipeInstance) => {
            req.body.ingredients.map((ingredient: RecipeIngredientsInstance) => {
                RecipeIngredients.create({
                    RecipeId: recipe.id,
                    IngredientId: ingredient.IngredientId,
                    quantity: ingredient.quantity
                })
            })
            const msg = `La recette a bien été créée.`
            res.send({ msg: msg, recipe: {id: recipe.id, title: recipe.title} })
        })
        .catch((err : Error) => {
            if( err instanceof ValidationError){
                const errorsTab = collectErrors(err)
                return res.status(400).send({ msg: errorsTab });
            } else if(err instanceof ForeignKeyConstraintError){
                const errorsTab = collectErrors(err)
                return res.status(400).send({ msg : errorsTab })
            }
            const msg = `Une erreur est survenue : ${ err }`;
            res.status(500).send({ msg: msg });
        })
    })
}