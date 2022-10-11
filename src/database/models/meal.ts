import { DataTypes } from "sequelize";
import { MealInstance } from "../../types/modelsType";
import sequelize from "../dbAccess";

const Meal = sequelize.define<MealInstance>(
    "Meal",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, { timestamps: false }
)

module.exports = ( Meal )