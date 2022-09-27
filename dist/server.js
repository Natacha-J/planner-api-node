"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('./database/dbInit');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
db.initDb();
app.get('/api', (req, res) => {
    const msg = `Bienvenue dans l'api`;
    res.send({ msg: msg, port: process.env });
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
require('./routes/category/findAllCategories')(app);
require('./routes/category/createCategory')(app);
app.listen(port, () => console.log(`serveur démarré sur le port ${port}`));
