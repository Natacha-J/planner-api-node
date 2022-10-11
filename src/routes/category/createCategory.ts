import { Express, Request, Response } from "express"
const auth = require('../../auth/auth')
import { ValidationError } from 'sequelize'
const { collectErrors } = require('../../helpers/errorsTab')
import { CategoryInstance } from "../../types/modelsType"
const { CategoryModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.post('/api/categories', auth, (req: Request, res: Response) => {
        CategoryModel.create({
            name: req.body.name,
        })
            .then((category: CategoryInstance) => {
                const msg = `La catégorie ${ category.name } a bien été créée.`
                res.send({ msg: msg, category: category })
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