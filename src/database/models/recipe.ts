import { RecipeInstance } from '../../types/modelsType'
import sequelize  from '../dbAccess'
import { DataTypes } from 'sequelize'

const Recipe = sequelize.define<RecipeInstance>(
    "Recipe",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: 'true',
                msg : `Une recette utilise déjà ce titre.`
            },
            validate: {
                len: {
                    args: [3,60],
                    msg: `Le titre doit contenir entre 3 et 60 caractères.`
                },
                notNull: { msg: `Un titre est obligatoire.`}
            }
        }
    }, { timestamps: false }
)

module.exports = ( Recipe )