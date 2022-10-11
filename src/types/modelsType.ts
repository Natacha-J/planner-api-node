import { Model, Optional } from "sequelize";
//**models**/
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
        CategoryId: number,
        MeasureId: number
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

//Day Model
interface DayAttributes {
    id: number,
    name: string
}
interface DayCreationAttributes extends Optional<DayAttributes, 'id'> {}

interface DayInstance extends Model<DayAttributes, DayCreationAttributes>,
    DayAttributes {
        createdAt?: Date,
        updatedAt?: Date
    }

//TypeMeal Model
interface TypeMealAttributes {
    id: number,
    name: string
}
interface TypeMealCreationAttributes extends Optional<TypeMealAttributes, 'id'> {}

interface TypeMealInstance extends Model<TypeMealAttributes, TypeMealCreationAttributes>,
    TypeMealAttributes {
        createdAt?: Date,
        updatedAt?: Date
    }

//Week Model
interface WeekAttributes {
    id: number,
    name: string
}
interface WeekCreationAttributes extends Optional<WeekAttributes, 'id'> {}

interface WeekInstance extends Model<WeekAttributes, WeekCreationAttributes>,
    WeekAttributes {
        createdAt?: Date,
        updatedAt?: Date
    }

//Meal Model
interface MealAttributes {
    id: number,
}
interface MealCreationAttributes extends Optional<MealAttributes, 'id'> {}

interface MealInstance extends Model<MealAttributes, MealCreationAttributes>,
    MealAttributes {
        DayId: number,
        TypeMealId: number,
        WeekId: number,
        createdAt?: Date,
        updatedAt?: Date
    }

//**associations tables**/
//RecipeIngredients Model
interface RecipeIngredientsAttributes {
    quantity: number,
}
interface RecipeIngredientsInstance extends Model<RecipeIngredientsAttributes>,
    RecipeIngredientsAttributes {
        RecipeId: number,
        IngredientId: number,
        UserId: number
    }

//ShoppingListIngredients Model
interface ShoppingListIngredientsAttributes {
    quantity: number,
    ListId: number,
    IngredientId: number,
}
interface ShoppingListIngredientsInstance extends Model<ShoppingListIngredientsAttributes>,
    ShoppingListIngredientsAttributes {
        createdAt?: Date,
        updatedAt?: Date,
    }

//StockIngredients Model
interface StockIngredientsAttributes {
    quantity: number,
    StockId: number,
    IngredientId: number,
}
interface StockIngredientsInstance extends Model<StockIngredientsAttributes>,
    StockIngredientsAttributes {
        createdAt?: Date,
        updatedAt?: Date,
    }

export {
    RecipeInstance,
    IngredientInstance,
    RecipeIngredientsInstance,
    CategoryInstance,
    MeasureInstance,
    StockInstance,
    ShoppingListInstance,
    UserInstance,
    DayInstance,
    TypeMealInstance,
    WeekInstance,
    MealInstance,
    ShoppingListIngredientsInstance,
    StockIngredientsInstance
}
