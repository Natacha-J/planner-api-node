"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require('cors');
const db = require('./database/dbInit');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app
    .use(express.json())
    .use(cors());
db.initDb();
app.get('/api', (req, res) => {
    const msg = `Bienvenue dans l'api`;
    res.send({ msg: msg });
});
// Recipe endpoints
require('./routes/recipe/createRecipe')(app);
require('./routes/recipe/findAllRecipes')(app);
require('./routes/recipe/findByPkRecipe')(app);
require('./routes/recipe/updateRecipe')(app);
require('./routes/recipe/deleteRecipe')(app);
// Ingredient endpoints
require('./routes/ingredient/createIngredient')(app);
require('./routes/ingredient/findAllIngredients')(app);
require('./routes/ingredient/updateIngredient')(app);
require('./routes/ingredient/deleteIngredient')(app);
// Category endpoint
require('./routes/category/createCategory')(app);
require('./routes/category/findAllCategories')(app);
require('./routes/category/findByPkCategory')(app);
require('./routes/category/updateCategory')(app);
require('./routes/category/deleteCategory')(app);
// Measure endpoints
require('./routes/measure/createMeasure')(app);
require('./routes/measure/deleteMeasure')(app);
require('./routes/measure/findAllMeasures')(app);
require('./routes/measure/updateMeasure')(app);
// ShoppingList endpoints
require('./routes/shoppingList/createShoppingList')(app);
require('./routes/shoppingList/deleteShoppingList')(app);
require('./routes/shoppingList/findByPkShoppingList')(app);
// User endpoints
require('./routes/user/createUser')(app);
require('./routes/user/deleteUser')(app);
require('./routes/user/findAllUser')(app);
require('./routes/user/findByPkUser')(app);
require('./routes/user/updateUser')(app);
// Stock endpoints
require('./routes/stock/createStock')(app);
require('./routes/stock/deleteStock')(app);
require('./routes/stock/findByPkStock')(app);
//login endpoint
require('./routes/login')(app);
app.listen(port, () => console.log(`serveur démarré sur le port ${port}`));
