import sequelize  from './dbAccess'
import { DataTypes } from 'sequelize'
import { CategoryInstance, IngredientInstance, RecipeInstance } from '../types/modelsType';

//model init
const RecipeModel = require('./models/recipe');
const IngredientModel = require('./models/ingredient')
const CategoryModel = require('./models/category')

//datas initialization
const { ingredients } = require('./datasInit')
const { categories } = require('./datasInit')
const { recipes } = require('./datasInit')

//entities associations with transition table
const RecipeIngredients = sequelize.define('RecipeIngredients', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg : `Une quantité est obligatoire.`}
        }
    }
}, { timestamps: false })

RecipeModel.belongsToMany(IngredientModel, {
     through: 'RecipeIngredients',
    })
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
CategoryModel.hasMany(IngredientModel)


const initDb = () => {
    return sequelize.sync()
/*     .then(() => {
        categories.map((category: CategoryInstance) => {
            CategoryModel.create({
                name: category.name
            })
        })
    })
    .then(() => {
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

module.exports = { initDb, RecipeModel, IngredientModel, CategoryModel, RecipeIngredients }