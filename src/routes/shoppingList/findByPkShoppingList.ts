import { Express, Request, Response } from "express"
import { ValidationError } from "sequelize"
import { ShoppingListInstance } from "../../types/modelsType"
const auth = require('../../auth/auth')
const { collectErrors } = require('../../helpers/errorsTab')
const { ShoppingListModel, IngredientModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.get('/api/shoppingLists/:id', auth, (req: Request, res: Response) => {
        ShoppingListModel.findAll({
            where: {
                id: req.params.id
            },    
            include: [
                {
                    model: IngredientModel,
                    attributes: [ 'id', "name", "CategoryId", "MeasureId"],
                    through: { attributes: ['quantity'] }
                }
            ]
        })
        .then((lists: ShoppingListInstance[]) => {
            if(lists === null){
                const msg = `Il n'y a pas de liste de course.`;
                return res.status(400).send({ error: msg });    
            }
            const msg = `Voici la liste de courses ${ req.params.id }.`;
            return res.send({ msg: msg, shoppingList: lists});
        })
        .catch((err : Error) => {
            if( err instanceof ValidationError){
                const errorsTab = collectErrors(err)
                return res.status(400).send({ error: errorsTab });
            }
            const msg = `Une erreur est survenue : ${ err }`;
            res.status(500).send({ error: msg });
        })
    })
}