import sequelize  from './dbAccess'
const bcrypt = require('bcrypt')
import { DataTypes } from 'sequelize'
import { CategoryInstance, IngredientInstance, MeasureInstance, RecipeInstance, UserInstance } from '../types/modelsType';

//model init
const RecipeModel = require('./models/recipe');
const IngredientModel = require('./models/ingredient')
const CategoryModel = require('./models/category')
const MeasureModel = require('./models/measure')
const StockModel = require('./models/stock')
const ShoppingListModel = require('./models/shoppingList')
const UserModel = require('./models/user')


//datas initialization
const { users } = require('./datasInit') 

//transition tables
const RecipeIngredients = sequelize.define('RecipeIngredients', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg : `Une quantité est obligatoire.` }
        }
    }
}, { timestamps: false })

const ShoppingListIngredients = sequelize.define('ShoppingListIngredients', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg : `Une quantité est obligatoire.` },
            min: {
                args: [1],
                msg: `Le nom de la catégorie doit contenir entre 3 et 40 caractères.`
            }
        }       
    }
}, { timestamps: false })

const StockIngredients = sequelize.define('StockIngredients', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg : `Une quantité est obligatoire.` }
        }
    }    
}, { timestamps: false })

//**entities associations**//
//Recipes associations
RecipeModel.belongsToMany(IngredientModel, {
     through: 'RecipeIngredients',
    })
RecipeModel.belongsTo(UserModel, {
    foreignKey: {
        fieldName: 'UserId',
        allowNull: true,
        validate: {
            notNull: { msg : `Une recette doit avoir un auteur.`}
        }
    }
})

//Ingredient associations
IngredientModel.belongsToMany(RecipeModel, {
    through: 'RecipeIngredients',
})
IngredientModel.belongsTo(CategoryModel, {
    foreignKey: {
        fieldName: 'CategoryId',
        allowNull: false,
        validate: {
            notNull: { msg: `L'ingrédient doit être relié à une catégorie.`}
        }
    }
})
IngredientModel.belongsTo(MeasureModel, {
    foreignKey: {
        fieldName: 'MeasureId',
        allowNull: false,
        validate: {
            notNull: { msg: `L'ingrédient doit être relié à une mesure.`}
        }
    }    
})
IngredientModel.belongsToMany(StockModel, {
    through: 'StockIngredients'
})
IngredientModel.belongsToMany(ShoppingListModel, {
    through: 'ShoppingListIngredients',
})

//Category association
CategoryModel.hasMany(IngredientModel)

//User associations
UserModel.hasMany(RecipeModel)
UserModel.hasOne(StockModel)
UserModel.hasOne(ShoppingListModel)

//Measure association
MeasureModel.hasMany(IngredientModel)

//Stock associations
StockModel.belongsToMany(IngredientModel, {
    through: 'StockIngredients'
})
StockModel.belongsTo(UserModel)

//ShoppingList associations
ShoppingListModel.belongsToMany(IngredientModel, {
    through: 'ShoppingListIngredients',
})
ShoppingListModel.belongsTo(UserModel)

const initDb = () => {
    return sequelize.sync()
/*     .then(() => {
        users.map((user: UserInstance) => {
            bcrypt.hash(user.password, 10)
            .then((hash: string) => {
                UserModel.create({
                    pseudo: user.pseudo,
                    email: user.email,
                    password: hash
                })
            })
        })
    }) */
}

module.exports = { initDb, RecipeModel, IngredientModel, CategoryModel, MeasureModel, StockModel, ShoppingListModel, UserModel, RecipeIngredients, StockIngredients, ShoppingListIngredients}