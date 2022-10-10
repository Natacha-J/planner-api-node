import { Sequelize } from 'sequelize'

let sequelize: Sequelize;

if (process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize('jzsrf298z1nrfzd4', 'stfouz9a22ror01g', 'zomqoo2lurmgp8ga', {
        host: 'iu51mf0q32fkhfpl.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    })
} else {
    sequelize = new Sequelize('planner', 'root', '', {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false    
    })
}

sequelize.authenticate()
    .then( () => console.log('connexion réussie'))
    .catch( (err: Error) => console.log(`connexion échouée : ${ err }`))

export default sequelize