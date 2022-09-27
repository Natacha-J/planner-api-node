import { Express, Request, Response } from "express"
import { IngredientInstance } from "../../types/modelsType"
const { IngredientModel, CategoryModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.get('/api/ingredients', (req: Request, res: Response) => {
        if(req.query.category){
            return IngredientModel.findAll({
                include: [{
                    model: CategoryModel,
                    where: {
                        name: req.query.category
                    }
                }]
            })
            .then((ingredients: IngredientInstance[]) => {                
                if (ingredients.length === 0) {
                    const msg = `Il n'y a aucun ingrédient dans la catégorie ${ req.query.category }.`
                    return res.status(404).send({ msg: msg })                        
                }
                const msg = `Voici la liste des ingrédients de la catégorie ${ req.query.category }.`
                res.send({ msg: msg, ingredients: ingredients })
            })
        }
        IngredientModel.findAll()
            .then((ingredients: IngredientInstance) => {
                const msg = `Voici la liste des ingrédients.`
                res.send({ msg: msg, ingredients: ingredients })
            })
            .catch((err: Error) => {
                const msg = `Une erreur est survenue : ${ err }`;
                res.status(500).send({msg: msg });
            })
    })
}