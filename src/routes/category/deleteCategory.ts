import { Express, Request, Response } from "express"
const auth = require('../../auth/auth')
import { CategoryInstance } from "../../types/modelsType"
const { CategoryModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.delete('/api/categories/:id', auth, (req: Request, res: Response) => {
        CategoryModel.findByPk(req.params.id)
        .then((category: CategoryInstance) => {
            if(category === null){
                const msg = `La catégorie ${req.params.id} n'existe pas.`;
                return res.status(404).send({ msg: msg });
            }
            CategoryModel.destroy({
                where: { id: category.id }
            })
            .then(() => {
                const msg = `La catégorie ${category.name} a bien été supprimée.`;
                res.send({ msg: msg, category: category });

            })
        })
        .catch((err: Error) => {
            const msg = `Une erreur est survenue : ${ err }`;
            res.status(500).send({ msg: msg });
        })
    })
}