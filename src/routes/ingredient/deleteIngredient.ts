import { Express, Request, Response } from "express"
import { ValidationError } from 'sequelize';
import { IngredientInstance } from "../../types/modelsType"
const { IngredientModel, CategoryModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.delete('/api/ingredients/:id', (req: Request, res: Response) => {
        IngredientModel.findByPk(req.params.id)
        .then((ingredient: IngredientInstance) => {
            if(ingredient === null){
                const msg = `L'ingrédient ${ req.params.id } n'existe pas.`;
                return res.status(404).send({ msg: msg });
            }
            IngredientModel.destroy({
                where: {
                    id: ingredient.id
                }
            })
            .then(() => {
                const msg = `L'ingrédient ${ ingredient.name } a bien été supprimé.`;
                res.send({ msg: msg, ingredient: ingredient });
            })
            .catch((err: Error) => {
                const msg = `Une erreur est survenue : ${ err }`;
                res.status(500).send({ msg: msg });            
            })
        })
    })
}