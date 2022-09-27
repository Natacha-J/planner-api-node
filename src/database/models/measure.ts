import { MeasureInstance } from '../../types/modelsType'
import sequelize  from '../dbAccess'
import { DataTypes } from 'sequelize'

const Measure = sequelize.define<MeasureInstance>(
    "Measure",
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
                    args: [1,10],
                    msg: `Le nom de la mesure doit contenir entre 1 et 10 caractères.`
                },
                notNull: { msg: `Un nom de mesure est obligatoire.`}
            }
        },
    }
)

module.exports = ( Measure )