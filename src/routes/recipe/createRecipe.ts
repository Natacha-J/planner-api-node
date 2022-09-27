import { Express, Request, Response } from "express"
import { ValidationError } from 'sequelize'
import { RecipeIngredientsInstance, RecipeInstance } from "../../types/modelsType"
const { RecipeModel, RecipeIngredients, IngredientModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.post('/api/recipes', (req: Request, res: Response) => {
        if (req.body.ingredients === undefined || req.body.ingredients.lenght === 0) {
            const msg = `Vous devez renseigner au moins un ingrédient pour enregitrer la recette.`
           return res.status(400).send({ msg: msg })
        }
        RecipeModel.create({
            title: req.body.title
        })
        .then((recipe: RecipeInstance) => {
            req.body.ingredients.map((ingredient: RecipeIngredientsInstance) => {
                RecipeIngredients.create({
                    RecipeId: recipe.id,
                    IngredientId: ingredient.IngredientId,
                    quantity: ingredient.quantity
                })
            })
            const msg = `La recette ${ recipe.title } a bien été créée.`
            res.send({ msg: msg, recipe: recipe })
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