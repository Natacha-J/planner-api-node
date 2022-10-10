import { DayInstance } from "../../types/modelsType"
import sequelize from "../dbAccess"
import { DataTypes } from 'sequelize'

const Day = sequelize.define<DayInstance>(
    "Day",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: { name: 'true', msg: `Ce jour est déjà présent dans la liste.`}    
        }
    }, { timestamps: false }
)

module.exports = ( Day )