"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbAccess_1 = require("./dbAccess");
const sequelize_1 = require("sequelize");
//model init
const RecipeModel = require('./models/recipe');
const IngredientModel = require('./models/ingredient');
const CategoryModel = require('./models/category');
//datas initialization
const { ingredients } = require('./datasInit');
const { categories } = require('./datasInit');
const { recipes } = require('./datasInit');
//entities associations with transition table
const RecipeIngredients = dbAccess_1.default.define('RecipeIngredients', {
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: `Une quantité est obligatoire.` }
        }
    }
}, { timestamps: false });
RecipeModel.belongsToMany(IngredientModel, {
    through: 'RecipeIngredients',
});
IngredientModel.belongsToMany(RecipeModel, {
    through: 'RecipeIngredients'
});
IngredientModel.belongsTo(CategoryModel, {
    foreignKey: {
        fieldName: 'CategoryId',
        allowNull: false,
        validate: {
            notNull: { msg: `L'ingrédient doit être relié à une catégorie.` }
        }
    }
});
CategoryModel.hasMany(IngredientModel);
const initDb = () => {
    return dbAccess_1.default.sync();
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
};
module.exports = { initDb, RecipeModel, IngredientModel, CategoryModel, RecipeIngredients };
