"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const private_key = require('./private_key');
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        const msg = `Il manque un jeton d'authentification.`;
        return res.status(401).send({ msg: msg });
    }
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, private_key, (err, decodedToken) => {
        if (err) {
            const msg = `Accès refusé.`;
            return res.status(403).json({ msg: msg });
        }
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            const msg = `L'identifiant est invalide.`;
            res.status(401).send({ msg: msg });
        }
        else {
            next();
        }
    });
};
