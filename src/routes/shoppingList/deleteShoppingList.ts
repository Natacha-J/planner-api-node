import { Express, Request, Response } from "express"
import { ShoppingListInstance } from "../../types/modelsType"
const auth = require('../../auth/auth')
const { ShoppingListIngredients } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.delete('/api/shoppingLists/:id', auth, (req: Request, res: Response) => {
        ShoppingListIngredients.findAll({
            where: {
                ShoppingListId : req.params.id
            }
        })
        .then((lists: ShoppingListInstance[]) => {
            if(lists.length == 0){
                const msg = `La liste de courses ${req.params.id} ne contient aucun ingrédient à supprimer.`;
                return res.status(404).send({ msg: msg });
            }
            lists.map((list: any) => {
                ShoppingListIngredients.destroy({
                    where: {
                        ShoppingListId: list.ShoppingListId,
                    } 
                })
            })
            const msg = `La liste de course ${ req.params.id } a été vidée.`;
            res.send({ msg: msg, shoppingList: lists });
        })
        .catch((err: Error) => {
            const msg = `Une erreur est survenue : ${ err }`;
            res.status(500).send({ error: msg });
        })
    })
}