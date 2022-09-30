import { Express, Request, Response } from "express"
const auth = require('../../auth/auth')
import { RecipeInstance } from "../../types/modelsType"
const { RecipeModel, IngredientModel, UserModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.get('/api/recipes/:id', auth, (req:Request, res: Response) => {
        RecipeModel.findByPk(req.params.id,{
            attributes: [
                'id',
                'title'
            ],
            include: [
                {
                    model: UserModel,
                    attributes: ['id', 'pseudo']
                },
                {
                    model: IngredientModel,
                    attributes: [ 'name'],
                    through: {
                        attributes: ['quantity']
                    }
                },
            ]
        })
            .then((recipe: RecipeInstance) => {
                if (recipe === null) {
                    const msg = `Il n'y a pas de recettes à afficher.`;
                    return res.status(404).send({ msg: msg });
                }
                const msg = `Voici la recette ${ req.params.id }.`
                res.send({ msg: msg, recipe: recipe })
            })
            .catch((err: Error) => {
                res.status(500).send({ msg: `Une erreur est survenue : ${ err }`});
            })
    })
}
