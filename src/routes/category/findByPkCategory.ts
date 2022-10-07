import { Express, Request, Response } from 'express'
const auth = require('../../auth/auth')
import { CategoryInstance } from '../../types/modelsType'
const { CategoryModel } = require('../../database/dbInit') 
module.exports = (app: Express) => {
    app.get('/api/categories/:id', auth, (req: Request, res: Response) => {
        CategoryModel.findByPk(req.params.id)
        .then((category: CategoryInstance) => {
            if (category === null) {
                const msg = `Il n'y a pas de catégorie à afficher.`;
                return res.status(404).send({ error: msg });
            }
            const msg = `Voici la liste des catégories.`
            res.send({ msg: msg, category: category })
        })
        .catch((err: Error) => {
            const msg = `Une erreur est survenue : ${ err }`
            res.status(500).send({ error: msg});
        })

    })
}