/**
 * This file includes router about recipes
 */

const express = require('express');
const { getRecipeList, getRecipeDetails, addRecipe, updateRecipe } = require('./utils/jsonHandler');

const router = new express.Router();

// GET route that returns all recipe names
router.get('/recipes', (req, res) => { res.json({ recipeNames: getRecipeList() }); });

// GET route that takes a recipe name as a string param and returns the ingredients and the number of steps in the recipe as JSON
router.get('/recipes/details/:recipe', (req, res) => {
    const details = getRecipeDetails(req.params.recipe);

    if (!details) {
        return res.json({});
    }

    res.json({
        details: {
            ingredients: details.ingredients,
            numSteps: details.instructions.length
        }
    });
});

//POST route that can add additional recipes in the existing format to the backend with support for the above routes.
//Error Response: If the recipe already exists
router.post('/recipes', (req, res) => {
    if (addRecipe(req.body)) { return res.status(201).send(); }

    res.status(400).json({ error: 'Recipe already exists' });
});

//PUT route that can update existing recipes.
//Error Response: If the recipe doesn't exist:
router.put('/recipes', (req, res) => {
    if (updateRecipe(req.body)) { return res.status(204).send(); }

    res.status(404).json({ error: 'Recipe does not exist' });
});

module.exports = router;