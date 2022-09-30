import { Express, Request, Response } from "express"
const auth = require('../../auth/auth')
import { ValidationError } from "sequelize"
import { RecipeIngredientsInstance, RecipeInstance } from "../../types/modelsType"
const { collectErrors } = require('../../helpers/errorsTab')
const { RecipeModel, IngredientModel, RecipeIngredients } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.put('/api/recipes/:id', auth, (req: Request, res: Response) => {
        RecipeModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            req.body.ingredients.map((ingredient: RecipeIngredientsInstance) => {
                RecipeIngredients.destroy({
                    where: {
                        RecipeId: req.params.id,
                    }       
                })
                .then(() => {
                    RecipeIngredients.create({
                        RecipeId: req.params.id,
                        IngredientId: ingredient.IngredientId,
                        quantity: ingredient.quantity
                    })
                })
            })
        })
        .then(() => {
            RecipeModel.findByPk(req.params.id, {
                attributes: [
                    'id',
                    'title'
                ],
                include: [
                    {
                        model: IngredientModel,
                        attributes: ['name'],
                        through: {
                            attributes: ['quantity']
                        }
                    },
                ]    
            })
            .then((recipe: RecipeInstance) => {
                if(recipe === null){
                    const msg = `La recette ${ req.params.id } n'existe pas.`;
                    return res.status(404).send({ msg: msg });
                }
                const msg = `La recette ${ recipe.title } a bien été modifiée.`;
                res.send({ msg: msg, recipe: {
                    id: recipe.id,
                    title: recipe.title,
                }});
            })
        })
        .catch((err : Error) => {
            if( err instanceof ValidationError){
                const errorsTab = collectErrors(err)
                return res.status(400).send({ msg: errorsTab });
            }
            const msg = `Une erreur est survenue : ${ err }`;
            res.status(500).send({ msg: msg });
        })
    })
}