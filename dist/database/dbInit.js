"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbAccess_1 = require("./dbAccess");
const bcrypt = require('bcrypt');
const sequelize_1 = require("sequelize");
//model init
const RecipeModel = require('./models/recipe');
const IngredientModel = require('./models/ingredient');
const CategoryModel = require('./models/category');
const MeasureModel = require('./models/measure');
const StockModel = require('./models/stock');
const ShoppingListModel = require('./models/shoppingList');
const UserModel = require('./models/user');
const DayModel = require('./models/day');
const TypeMealModel = require('./models/typeMeal');
const WeekModel = require('./models/week');
const MealModel = require('./models/meal');
//datas initialization
const { users } = require('./datasInit');
const { days } = require('./datasInit');
const { typeMeals } = require('./datasInit');
const { weeks } = require('./datasInit');
const { categories } = require('./datasInit');
//transition tables
const RecipeIngredients = dbAccess_1.default.define('RecipeIngredients', {
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: `Une quantité est obligatoire.` }
        }
    }
}, { timestamps: false });
const ShoppingListIngredients = dbAccess_1.default.define('ShoppingListIngredients', {
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: `Une quantité est obligatoire.` },
            min: {
                args: [1],
                msg: `Le nom de la catégorie doit contenir entre 3 et 40 caractères.`
            }
        }
    }
}, { timestamps: false });
const StockIngredients = dbAccess_1.default.define('StockIngredients', {
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: `Une quantité est obligatoire.` }
        }
    }
}, { timestamps: false });
const MealIngredients = dbAccess_1.default.define('MealIngredients', {
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: `Une quantité est obligatoire.` }
        }
    }
}, { timestamps: false });
const MealRecipes = dbAccess_1.default.define('MealRecipes', {}, { timestamps: false });
//**entities associations**//
//Recipes associations
RecipeModel.belongsToMany(IngredientModel, {
    through: 'RecipeIngredients',
});
RecipeModel.belongsTo(UserModel, {
    foreignKey: {
        fieldName: 'UserId',
        allowNull: true,
        validate: {
            notNull: { msg: `Une recette doit avoir un auteur.` }
        }
    }
});
RecipeModel.belongsToMany(MealModel, {
    through: 'MealRecipes'
});
//Ingredient associations
IngredientModel.belongsToMany(RecipeModel, {
    through: 'RecipeIngredients',
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
IngredientModel.belongsTo(MeasureModel, {
    foreignKey: {
        fieldName: 'MeasureId',
        allowNull: false,
        validate: {
            notNull: { msg: `L'ingrédient doit être relié à une mesure.` }
        }
    }
});
IngredientModel.belongsToMany(StockModel, {
    through: 'StockIngredients'
});
IngredientModel.belongsToMany(ShoppingListModel, {
    through: 'ShoppingListIngredients',
});
IngredientModel.belongsToMany(MealModel, {
    through: 'MealIngredients'
});
//Category association
CategoryModel.hasMany(IngredientModel);
//User associations
UserModel.hasMany(RecipeModel);
UserModel.hasOne(StockModel);
UserModel.hasOne(ShoppingListModel);
//Measure association
MeasureModel.hasMany(IngredientModel);
//Stock associations
StockModel.belongsToMany(IngredientModel, {
    through: 'StockIngredients'
});
StockModel.belongsTo(UserModel);
//ShoppingList associations
ShoppingListModel.belongsToMany(IngredientModel, {
    through: 'ShoppingListIngredients',
});
ShoppingListModel.belongsTo(UserModel);
//Day association
DayModel.hasMany(MealModel);
//TypeMeal association
TypeMealModel.hasMany(MealModel);
//Week association
WeekModel.hasMany(MealModel);
//Meal associations
MealModel.belongsTo(DayModel);
MealModel.belongsTo(TypeMealModel);
MealModel.belongsTo(WeekModel);
MealModel.belongsToMany(IngredientModel, {
    through: 'MealIngredients'
});
MealModel.belongsToMany(RecipeModel, {
    through: 'MealRecipes'
});
const initDb = () => {
    return dbAccess_1.default.sync({ force: true })
        .then(() => {
        days.map((day) => {
            DayModel.create({
                name: day.name
            });
        });
    })
        .then(() => {
        typeMeals.map((type) => {
            TypeMealModel.create({
                name: type.name
            });
        });
    })
        .then(() => {
        weeks.map((week) => {
            WeekModel.create({
                name: week.name
            });
        });
    })
        .then(() => {
        categories.map((category) => {
            CategoryModel.create({
                name: category.name
            });
        });
    })
        .then(() => {
        users.map((user) => {
            bcrypt.hash(user.password, 10)
                .then((hash) => {
                UserModel.create({
                    pseudo: user.pseudo,
                    email: user.email,
                    password: hash
                });
            });
        });
    });
};
module.exports = {
    initDb,
    RecipeModel,
    IngredientModel,
    CategoryModel,
    MeasureModel,
    StockModel,
    ShoppingListModel,
    UserModel,
    DayModel,
    TypeMealModel,
    WeekModel,
    MealModel,
    RecipeIngredients,
    StockIngredients,
    ShoppingListIngredients,
    MealIngredients
};
