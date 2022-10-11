import { TypeMealInstance } from "../../types/modelsType";
import sequelize from "../dbAccess";
import { DataTypes } from 'sequelize'

const TypeMeal = sequelize.define<TypeMealInstance>(
    "TypeMeal",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: { name: 'true', msg: `Ce type de repas est déjà présent dans la liste.`}    
        }
    }, { timestamps: false }
)

module.exports = ( TypeMeal )