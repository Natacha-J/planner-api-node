import { Express, Request, Response } from "express"
const auth = require('../../auth/auth')
import { RecipeInstance } from "../../types/modelsType"
const { RecipeModel, IngredientModel, UserModel, MeasureModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.get('/api/recipes', auth, (req:Request, res: Response) => {
        RecipeModel.findAll({
            attributes: [
                'id',
                'title',
            ],
            include: [
                {
                    model: UserModel,
                    attributes: ['id','pseudo']
                },
                {
                    model: IngredientModel,
                    attributes: ['name'],
                    through: {
                        attributes: ['quantity']
                    },
                    include: {
                        model: MeasureModel,
                        attributes: ['id', 'name']
                    }
                }
            ]
        })
            .then((recipes: RecipeInstance[]) => {
                if (recipes.length === 0) {
                    const msg = `Il n'y a pas de recettes à afficher.`;
                    return res.status(404).send({ error: msg });
                }
                const msg = `Voici la liste des recettes.`
                res.send({ msg: msg, recipes: recipes })
            })
            .catch((err: Error) => {
                const msg = `Une erreur est survenue : ${ err }`
                res.status(500).send({ error: msg});
            })
    })
}
