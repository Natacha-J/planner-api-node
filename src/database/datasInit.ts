const categories = [
    {
        name: 'légumes'
    },
    {
        name: 'féculents'
    },
    {
        name: 'produits laitiers'
    },
    {
        name: 'fruits'
    },
    {
        name: 'viandes et oeufs'
    },
    {
        name: 'matières grasses'
    },
    {
        name: 'poissons'
    }
]
const ingredients = [
    {
        name: 'carotte',
        CategoryId: 1
    },
    {
        name: 'pomme de terre',
        CategoryId: 1
    },
    {
        name: 'fromage râpé',
        CategoryId: 3
    },
    {
        name: 'sauce tomate',
        CategoryId: 1
    },
    {
        name: 'steack haché',
        CategoryId: 5
    },
    {
        name: 'béchamel',
        CategoryId: 6
    },
    {
        name: 'jambon',
        CategoryId: 5
    },
    {
        name: 'pâtes',
        CategoryId: 2
    },
    {
        name: 'riz',
        CategoryId: 2
    },
    {
        name: 'blé',
        CategoryId: 2
    },
]

const recipes = [
    {
        title: 'purée de carottes',
        ingredients: [
            {
                quantity: 2,
                IngredientId: 2
            },
            {
                quantity: 2,
                IngredientId: 1
            }
        ]
    }
/*     {
        title: 'lasagnes'
    },
    {
        title: 'pâtes à la bolognaise'
    },
    {
        title: 'pâtes à la carbonara'
    },
    {
        title: 'pâtes au saumon'
    },
    {
        title: 'poulet pané'
    },
    {
        title: 'fajitas au poulet'
    },
    {
        title: 'fajitas au steack haché'
    },
    {
        title: 'hachi parmentier'
    } */
]

module.exports = { categories, ingredients, recipes }