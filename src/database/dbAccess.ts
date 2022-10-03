import { Sequelize } from 'sequelize'

let sequelize: Sequelize;

if (process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize('DB_NAME', 'USERNAME', 'PASSWORD', {
        host: 'HOST',
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