import { Express, Request, Response } from "express"
import { RecipeInstance } from "../../types/modelsType"
const { RecipeModel, IngredientModel, RecipeIngredients } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.get('/api/recipes', (req:Request, res: Response) => {
        RecipeModel.findAll({
            attributes: [
                'id',
                'title'
            ],
            include: [
                {
                    model: IngredientModel,
                    attributes: [ 'name'],
                    through: {
                        attributes: ['quantity']
                    }
                },
            ]
        })
            .then((recipes: RecipeInstance[]) => {
                if (recipes.length === 0) {
                    const msg = `Il n'y a pas de recettes à afficher.`;
                    return res.status(404).send({ msg: msg });
                }
                const msg = `Voici la liste des recettes.`
                res.send({ msg: msg, recipes: recipes })
            })
            .catch((err: Error) => {
                res.status(500).send({ msg: `Une erreur est survenue : ${ err }`});
            })
    })
}
