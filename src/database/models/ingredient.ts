import { IngredientInstance } from '../../types/modelsType'
import sequelize  from '../dbAccess'
import { DataTypes } from 'sequelize'

const Ingredient = sequelize.define<IngredientInstance>(
    "Ingredient",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: { name: 'true', msg: `Cet ingrédient est déjà présent dans la liste.`},
            validate: {
                len: {
                    args: [3,40],
                    msg: `Le nom doit contenir entre 3 et 40 caractères.`
                },
                notNull: { msg: `Un nom est obligatoire.`}
            }
        }
    }, { timestamps: false }
)

module.exports = ( Ingredient )