import { Express, Request, Response } from "express"
import { RecipeInstance } from "../../types/modelsType"
const { RecipeModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.delete('/api/recipes/:id', (req: Request, res: Response) => {
        RecipeModel.findByPk(req.params.id)
        .then((recipe: RecipeInstance) => {
            if(recipe === null){
                const msg = `La recette ${req.params.id} n'existe pas.`;
                return res.status(404).send({ msg: msg });
            }
            RecipeModel.destroy({
                where: {
                    id: recipe.id
                }
            })
            .then(() => {
                const msg = `La recette ${recipe.title} a bien été supprimée.`;
                res.send({ msg: msg, cookingDish: recipe });

            })
        })
        .catch((err: Error) => {
            const msg = `Une erreur est survenue : ${ err }`;
            res.status(500).send({ msg: msg });
        })
    })
}