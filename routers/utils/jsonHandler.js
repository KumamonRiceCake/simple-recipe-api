const data = require('../../data.json');

// Return list of recipe names
const getRecipeList = () => {
    const recipes = [];
    data.recipes.forEach((recipe) => {
        recipes.push(recipe.name);
    });

    return recipes;
};

// Return recipe details if given recipe name exists in data
const getRecipeDetails = (recipeName) => { return data.recipes.find((recipe) => recipe.name === recipeName); };

// Add new recipe in data if it does not already exist. Return true if succeed, otherwise return false.
const addRecipe = (newRecipe) => {
    const existingRecipe = data.recipes.find((recipe) => recipe.name === newRecipe.name);

    if (existingRecipe) { return false; }

    data.recipes.push(newRecipe);

    return data;
};

// Update existing recipe in data if it exists. Return true if succeed, otherwise return false.
const updateRecipe = (update) => {
    console.log('length', data.recipes)
    for (let i=0; i<data.recipes.length; i++) {
        if (data.recipes[i].name === update.name) {
            data.recipes[i] = update;
            console.log('found', data.recipes[i], update.name)
            return true;
        }
    }
    console.log('not found')
    return false;
};

module.exports = {
    getRecipeList,
    getRecipeDetails,
    addRecipe,
    updateRecipe
};