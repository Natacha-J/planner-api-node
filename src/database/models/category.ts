import { CategoryInstance } from '../../types/modelsType'
import sequelize  from '../dbAccess'
import { DataTypes } from 'sequelize'

const Category = sequelize.define<CategoryInstance>(
    "Category",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [3,40],
                    msg: `Le nom de la catégorie doit contenir entre 3 et 40 caractères.`
                },
                notNull: { msg: `Un nom de catégorie est obligatoire.`}
            }
        },
    }
)

module.exports = ( Category )