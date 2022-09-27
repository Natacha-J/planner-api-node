import { Express, Request, Response } from 'express'
import { CategoryInstance } from '../../types/modelsType'
const { CategoryModel } = require('../../database/dbInit') 
module.exports = (app: Express) => {
    app.get('/api/categories/:id', (req: Request, res: Response) => {
        CategoryModel.findByPk(req.params.id, {
            attributes: [
                'id',
                'name'
            ]
        })
        .then((category: CategoryInstance) => {
            if (category === null) {
                const msg = `Il n'y a pas de catégorie à afficher.`;
                return res.status(404).send({ msg: msg });
            }
            const msg = `Voici la liste des catégories.`
            res.send({ msg: msg, category: category })
        })
        .catch((err: Error) => {
            res.status(500).send({ msg: `Une erreur est survenue : ${ err }`});
        })

    })
}