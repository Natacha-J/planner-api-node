import { Express, Request, Response } from 'express'
import { UserInstance } from '../types/modelsType'
const { UserModel } = require('../database/dbInit')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const private_key: string = require('../auth/private_key')

module.exports = (app: Express) => {
    app.post('/api/login',(req: Request, res:Response) => {
        UserModel.findOne({
            where: {
                pseudo: req.body.pseudo
            }
        })
        .then((user: UserInstance) => {
            if(!user){
                const msg = `L'utilisateur ${ req.body.pseudo } n'existe pas.`
                return res.status(400).send({ msg: msg })
            }
            
            bcrypt.compare(req.body.password, user.password)
            .then((isPasswordValid: boolean)=> {
                if(!isPasswordValid){
                    const msg = `Le mot de passe est incorrect.`
                    return res.status(400).send({ msg: msg })
                }
                //JWT
                const token = jwt.sign(
                    { userId: user.id },
                    private_key,
                    { expiresIn: '24h'}
                )
                const msg = `L'utilisateur ${ user.pseudo } est bien connecté.`
                return res.send({ msg: msg, user: token })            
            })
        })
        .catch((err : Error) => {
            const msg = `Une erreur est survenue : ${ err }`;
            res.status(500).send({ msg: msg });
        })
    })
}