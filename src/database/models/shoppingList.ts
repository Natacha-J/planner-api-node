import { ShoppingListInstance } from '../../types/modelsType'
import sequelize  from '../dbAccess'
import { DataTypes } from 'sequelize'

const ShoppingList = sequelize.define<ShoppingListInstance>(
    "ShoppingList",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }
)

module.exports = ( ShoppingList )