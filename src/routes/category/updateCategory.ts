import { Express, Request, Response } from "express"
const auth = require('../../auth/auth')
import { ValidationError } from "sequelize"
import { CategoryInstance } from "../../types/modelsType"
const { collectErrors } = require('../../helpers/errorsTab')
const { CategoryModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.put('/api/categories/:id', auth,(req: Request, res: Response) => {
        CategoryModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            CategoryModel.findByPk(req.params.id)
            .then((category: CategoryInstance) => {
                if(category === null){
                    const msg = `La catégorie ${ req.params.id } n'existe pas.`;
                    return res.status(404).send({ error: msg });
                }
                const msg = `La catégorie ${ category.name } a bien été modifiée.`;
                res.send({ msg: msg, category: category });
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