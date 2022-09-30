import { UserInstance } from '../../types/modelsType'
import sequelize  from '../dbAccess'
import { DataTypes } from 'sequelize'

const User = sequelize.define<UserInstance>(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pseudo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: 'true',
                msg : `Ce pseudo est déjà pris.`,
            },
            validate: {
                len: {
                    args: [3,60],
                    msg: `Le pseudo doit contenir entre 3 et 60 caractères.`
                },
                notNull: { msg: `Un pseudo est obligatoire.`}
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: 'true',
                msg : `Cet e-mail est déjà enregistré.`,
            },
            validate: {
                notNull: { msg: `Un e-mail doit être renseigné.`}
            }
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: { msg: `Un mot de passe est obligatoire.`}
            }
        }
    }
)

module.exports = ( User )