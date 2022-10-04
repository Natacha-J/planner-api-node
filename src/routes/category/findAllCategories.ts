import { Express, Request, Response } from "express"
const auth = require('../../auth/auth')
import { CategoryInstance } from "../../types/modelsType"
const { CategoryModel, IngredientModel, MeasureModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.get('/api/categories', auth,(req: Request, res: Response) => {
        if(req.query.category){
            return CategoryModel.findAll()
            .then((categories: CategoryInstance[]) => {                
                if (categories.length === 0) {
                    const msg = `Il n'y a aucune catégorie ${ req.query.category }.`
                    return res.status(404).send({ msg: msg })                     
                }
                const msg = `Voici la liste de la catégorie ${ req.query.category }.`
                res.send({ msg: msg, categories: categories })
            })
        }
        CategoryModel.findAll({
            attributes: [
                'id',
                'name'
            ],
            include: [
                {
                    model: IngredientModel,
                    attributes: [ 'id', 'name'],
                    include: [
                        {
                            model: MeasureModel,
                            attributes: ['id', 'name']
                        }
                    ]
                }
            ]
        })
            .then((categories: CategoryInstance) => {
                const msg = `Voici la liste des catégories.`
                res.send({ msg: msg, categories: categories })
            })
            .catch((err: Error) => {
                const msg = `Une erreur est survenue : ${ err }`;
                res.status(500).send({msg: msg });
            })
    })
}