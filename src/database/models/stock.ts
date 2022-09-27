import { StockInstance } from '../../types/modelsType'
import sequelize  from '../dbAccess'
import { DataTypes } from 'sequelize'

const Stock = sequelize.define<StockInstance>(
    "Stock",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }
)

module.exports = ( Stock )