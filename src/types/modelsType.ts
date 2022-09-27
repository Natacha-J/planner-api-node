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
    name: string
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
    name: string
}
interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

interface CategoryInstance extends Model<CategoryAttributes, CategoryCreationAttributes>,
    CategoryAttributes{
        createdAt?: Date,
        updatedAt?: Date
    }

//Measure Model
interface MeasureAttributes {
    id: number,
    name: string
}
interface MeasureCreationAttributes extends Optional<MeasureAttributes, 'id'> {}

interface MeasureInstance extends Model<MeasureAttributes, MeasureCreationAttributes>,
    MeasureAttributes{
        createdAt?: Date,
        updatedAt?: Date
    }

//Stock Model
interface StockAttributes {
    id: number
}

interface StockCreationAttributes extends Optional<StockAttributes, 'id'> {}

interface StockInstance extends Model<StockAttributes, StockCreationAttributes>,
    StockAttributes{
        createdAt?: Date,
        updatedAt?: Date,
        UserId: number
    }

//ShoppingList Model
interface ShoppingListAttributes {
    id: number
}

interface ShoppingListCreationAttributes extends Optional<ShoppingListAttributes, 'id'> {}

interface ShoppingListInstance extends Model<ShoppingListAttributes, ShoppingListCreationAttributes>,
    ShoppingListAttributes{
        createdAt?: Date,
        updatedAt?: Date,
        UserId: number
    }    

//User Model
interface UserAttributes {
    id: number,
    pseudo: string,
    email: string,
    password: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes{
        createdAt?: Date,
        updatedAt?: Date,
        ShoppingListId: number,
        StockId: number
    }

export { RecipeInstance, IngredientInstance, RecipeIngredientsInstance, CategoryInstance, MeasureInstance, StockInstance, ShoppingListInstance, UserInstance}
