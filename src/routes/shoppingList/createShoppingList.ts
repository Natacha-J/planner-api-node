import { Express, Request, Response } from "express"
import { ValidationError } from "sequelize"
import { ShoppingListIngredientsInstance, ShoppingListInstance } from "../../types/modelsType"
const auth = require('../../auth/auth')
const { collectErrors } = require('../../helpers/errorsTab')
const { ShoppingListModel, ShoppingListIngredients, IngredientModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.post('/api/shoppingLists/:id', auth, (req: Request, res: Response) => {
        ShoppingListIngredients.findAll({
            where: {
                ShoppingListId: req.params.id
            }
        })
        .then((listIngredients: ShoppingListIngredientsInstance[]) => {
            //remove shoppingList's ingredient not in user's request
            if (listIngredients.length > 0) {      
                listIngredients.map((ingredientInList: ShoppingListIngredientsInstance) => {
                    ShoppingListIngredients.destroy({
                        where: {
                            IngredientId: ingredientInList.IngredientId,
                            ShoppingListId: req.params.id
                        }
                    })
                })
            }
            //add request's ingredients
            req.body.ingredients.map((ingredientInRequest: any) => {
                ShoppingListIngredients.create({
                    IngredientId: ingredientInRequest.IngredientId,
                    ShoppingListId: req.params.id,
                    quantity: ingredientInRequest.quantity
                })
            })
        })
        .then(() => {
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
                const msg = `La liste de courses ${ req.params.id } a bien été mise à jour.`;
                return res.send({ msg: msg });
            })
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