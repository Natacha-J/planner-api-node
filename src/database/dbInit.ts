import sequelize  from './dbAccess'
import { DataTypes } from 'sequelize'
import { CategoryInstance, IngredientInstance, MeasureInstance, RecipeInstance } from '../types/modelsType';

//model init
const RecipeModel = require('./models/recipe');
const IngredientModel = require('./models/ingredient')
const CategoryModel = require('./models/category')
const MeasureModel = require('./models/measure')
const StockModel = require('./models/stock')
const ShoppingListModel = require('./models/shoppingList')
const UserModel = require('./models/user')


//datas initialization
const { ingredients } = require('./datasInit')
const { categories } = require('./datasInit')
const { recipes } = require('./datasInit')
const { measures } = require('./datasInit')

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
            notNull: { msg : `Une quantité est obligatoire.` }
        }
    }
})

const StockIngredients = sequelize.define('StockIngredients', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg : `Une quantité est obligatoire.` }
        }
    }    
})

//**entities associations**//
//Recipes associations
RecipeModel.belongsToMany(IngredientModel, {
     through: 'RecipeIngredients',
    })
RecipeModel.belongsTo(UserModel, {
    foreignKey: {
        fieldName: 'UserId',
        allowNull: false,
        validate: {
            notNull: { msg : `Une recette doit avoir un auteur.`}
        }
    }
})

//Ingredient associations
IngredientModel.belongsToMany(RecipeModel, {
    through: 'RecipeIngredients'
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
    through: 'ShoppingListIngredients'
})

//Category associations
CategoryModel.hasMany(IngredientModel)

//User associations
UserModel.hasMany(RecipeModel)
UserModel.hasOne(StockModel)
UserModel.hasOne(ShoppingListModel)

//Measure associations
MeasureModel.hasMany(IngredientModel)


const initDb = () => {
    return sequelize.sync({force: true})
     .then(() => {
        measures.map((measure: MeasureInstance) => {
            MeasureModel.create({
                name: measure.name
            })
        })
    })
    .then(() => {
        categories.map((category: CategoryInstance) => {
            CategoryModel.create({
                name: category.name
            })
        })
    })
/*    .then(() => {
        ingredients.map((ingredient: IngredientInstance) => {
            IngredientModel.create({
                name: ingredient.name,
                CategoryId: ingredient.CategoryId
            })
        })
    })
    .then(() => {
        recipes.map((recipe: any) => {
            RecipeModel.create({
                title: recipe.title
            })
            .then((data: any) => {
                recipes.map((recipe:any) => {
                    if (data.title === recipe.title) {
                        recipe.ingredients.map((ingredient:any) => {
                            RecipeIngredients.create({ 
                                quantity: ingredient.quantity,
                                IngredientId: ingredient.IngredientId,
                                RecipeId: data.id
                            })

                        })
                    }
                })
            })
        })
    }) */
}

module.exports = { initDb, RecipeModel, IngredientModel, CategoryModel, MeasureModel, StockModel, ShoppingListModel, UserModel, RecipeIngredients, StockIngredients, ShoppingListIngredients}