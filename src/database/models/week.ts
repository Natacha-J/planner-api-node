import { DataTypes } from "sequelize";
import { WeekInstance } from "../../types/modelsType";
import sequelize from "../dbAccess";

const Week = sequelize.define<WeekInstance>(
    "Week",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: { name: 'true', msg: `Ce nom est déjà présent dans la liste.`},
            validate: {
                notNull: { msg: `Un nom est obligatoire.`}
            }
        }
    }, { timestamps: false }
)

module.exports = ( Week )