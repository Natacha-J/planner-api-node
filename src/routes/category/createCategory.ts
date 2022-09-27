import { Express, Request, Response } from "express"
import { ValidationError } from 'sequelize'
import { CategoryInstance } from "../../types/modelsType"
const { CategoryModel } = require('../../database/dbInit')

module.exports = (app: Express) => {
    app.post('/api/categories', (req: Request, res: Response) => {
        CategoryModel.create({
            name: req.body.name,
        })
            .then((category: CategoryInstance) => {
                const msg = `La catégorie ${ category.name } a bien été créée.`
                res.send({ msg: msg, category: category })
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
                res.status(500).send({msg: msg });
            })
    })
}