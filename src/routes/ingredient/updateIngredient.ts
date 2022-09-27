import { Express, Request, Response } from "express"
import { ValidationError } from 'sequelize';
import { IngredientInstance } from "../../types/modelsType"
const { IngredientModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.put('/api/ingredients/:id', (req: Request, res: Response) => {
        IngredientModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            IngredientModel.findByPk(req.params.id)
            .then((ingredient: IngredientInstance) => {
                if(ingredient === null){
                    const msg = `L'ingrédient ${ req.params.id } n'existe pas.`;
                    return res.status(404).send({ msg: msg });
                }
                const msg = `L'ingrédient ${ ingredient.name } a bien été modifiée.`;
                res.send({ msg: msg, ingredient: ingredient });
            })
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
            res.status(500).send({ msg: msg });
        })
    })
}