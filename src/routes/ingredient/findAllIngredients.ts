import { Express, Request, Response } from "express"
const auth = require('../../auth/auth')
import { IngredientInstance } from "../../types/modelsType"
const { IngredientModel, CategoryModel, MeasureModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.get('/api/ingredients', auth,(req: Request, res: Response) => {
        if(req.query.category){
            return IngredientModel.findAll({
                attributes: [
                    'id',
                    'name',
                ],
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
                    return res.status(404).send({ error: msg })                        
                }
                const msg = `Voici la liste des ingrédients de la catégorie ${ req.query.category }.`
                res.send({ msg: msg, ingredients: ingredients })
            })
        }
        IngredientModel.findAll({
            attributes: [
                'id',
                'name',
            ],
            include: [
                {
                model: CategoryModel,
                attributs: [ 'id', 'name']
                },
                {
                    model: MeasureModel,
                    attributs: [ 'id', 'name']
                }
            ]
        })
            .then((ingredients: IngredientInstance) => {
                const msg = `Voici la liste des ingrédients.`
                res.send({ msg: msg, ingredients: ingredients })
            })
            .catch((err: Error) => {
                const msg = `Une erreur est survenue : ${ err }`;
                res.status(500).send({error: msg });
            })
    })
}