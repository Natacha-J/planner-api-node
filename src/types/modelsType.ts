import { Model, Optional } from "sequelize";

//Recipe Model
interface RecipeAttributes {
    id: number,
    title: string
}
interface RecipeCreationAttributes extends Optional<RecipeAttributes, 'id'> {}

interface RecipeInstance extends Model<RecipeAttributes, RecipeCreationAttributes>,
    RecipeAttributes {
        createdAt?: Date,
        updatedAt?: Date
    }

//Ingredient Model
interface IngredientAttributes {
    id: number,
    name: string,
}
interface IngredientCreationAttributes extends Optional<IngredientAttributes, 'id'> {}

interface IngredientInstance extends Model<IngredientAttributes, IngredientCreationAttributes>,
    IngredientAttributes {
        createdAt?: Date,
        updatedAt?: Date,
        CategoryId: number
    }

//RecipeIngredients Model
interface RecipeIngredientsAttributes {
    quantity: number,
}
interface RecipeIngredientsInstance extends Model<RecipeIngredientsAttributes>,
    RecipeIngredientsAttributes {
        RecipeId: number,
        IngredientId: number
    }

//Category Model
interface CategoryAttributes {
    id: number,
    name: string,
}
interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

interface CategoryInstance extends Model<CategoryAttributes, CategoryCreationAttributes>,
    CategoryAttributes{
        createdAt?: Date,
        updatedAt?: Date,
    }

export { RecipeInstance, IngredientInstance, RecipeIngredientsInstance, CategoryInstance }
