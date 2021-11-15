const request = require('supertest');
const app = require('../app');

/**
    A GET request to http://localhost:3000/recipes returns:
    Response body (JSON):
    {
        "recipeNames":
            [
                "scrambledEggs",
                "garlicPasta",
                "chai"
            ]
    }
    Status: 200
 */
test('Part1: should return all recipe names', async () => {
    const response = await request(app)
        .get('/recipes')
        .expect(200);

    expect(response.body).toMatchObject({
        'recipeNames': [
            'scrambledEggs',
            'garlicPasta',
            'chai'
        ]
    });
});

/**
    A GET request to http://localhost:3000/recipes/details/garlicPasta returns:
    If recipe exists: 
    Response body (JSON):
    {
        "details":
            {
                "ingredients": [
                    "500mL water",
                    "100g spaghetti",
                    "25mL olive oil",
                    "4 cloves garlic",
                    "Salt"
                ],
                "numSteps":5
            }
    }
    Status: 200
 */
test('Part2-1: should return the ingredients and the number of steps in the recipe as JSON', async () => {
    const response = await request(app)
        .get('/recipes/details/garlicPasta')
        .expect(200);

    expect(response.body).toMatchObject({
        'details': {
            'ingredients': [
                '500mL water',
                '100g spaghetti',
                '25mL olive oil',
                '4 cloves garlic',
                'Salt'
            ],
            'numSteps': 5
        }
    });
});

/**
    If recipe does NOT exist: 
    Response body (JSON): {}
    Status: 200
 */
test('Part2-2: should return no result if recipe does not exist', async () => {
    const response = await request(app)
        .get('/recipes/details/lasagna')
        .expect(200);

    expect(response.body).toMatchObject({});
});

/**
    A POST request to **http://localhost:3000/recipes** with body 
    {
        "name": "butteredBagel", 
            "ingredients": [
                "1 bagel", 
                "butter"
            ], 
        "instructions": [
            "cut the bagel", 
            "spread butter on bagel"
        ] 
    } 
    returns:
    **Response body: None**
    **Status:** 201
 */
test('Part3-1: should add additional recipes in the existing format to the backend', async () => {
    const response = await request(app)
        .post('/recipes')
        .send({
            'name': 'butteredBagel',
            'ingredients': [
                '1 bagel',
                'butter'
            ],
            'instructions': [
                'cut the bagel',
                'spread butter on bagel'
            ]
        })
        .expect(201);

    expect(response.body).toMatchObject({});

    const update = await request(app)
        .get('/recipes/details/butteredBagel')
        .expect(200);

    expect(update.body).toMatchObject({
        'details': {
            'ingredients': [
                '1 bagel',
                'butter'
            ],
            'numSteps': 2
        }
    });
});

/**
    Response body (JSON):
    {
        "error": "Recipe already exists"
    }
    Status: 400
 */
test('Part3-2: should not add additional recipes if the recipe already exists', async () => {
    const response = await request(app)
        .post('/recipes')
        .send({
            'name': 'scrambledEggs',
            'ingredients': [
                '1 bagel',
                'butter'
            ],
            'instructions': [
                'cut the bagel',
                'spread butter on bagel'
            ]
        })
        .expect(400);

    expect(response.body).toMatchObject({
        "error": "Recipe already exists"
    });
});

/**
    A PUT request to http://localhost:3000/recipes with body 
    {
        "name": "butteredBagel", 
            "ingredients": [
                "1 bagel", 
                "2 tbsp butter"
            ], 
        "instructions": [
            "cut the bagel", 
            "spread butter on bagel"
        ] 
    } returns:
    Response body: None
    Status: 204
    */
test('Part4-1: should update existing recipes', async () => {
    const response = await request(app)
        .put('/recipes')
        .send({
            'name': 'butteredBagel',
            'ingredients': [
                '1 bagel',
                '2 tbsp butter'
            ],
            'instructions': [
                'cut the bagel',
                'spread butter on bagel'
            ]
        })
        .expect(204);

    expect(response.body).toMatchObject({});

    const update = await request(app)
        .get('/recipes/details/butteredBagel')
        .expect(200);

    expect(update.body).toMatchObject({
        'details': {
            'ingredients': [
                '1 bagel',
                '2 tbsp butter'
            ],
            'numSteps': 2
        }
    });
});

/**
    Response body (JSON):
    {
        "error": "Recipe does not exist"
    }
    Status: 404
    */
test('Part4-2: should not update if the recipe does not exist', async () => {
    const response = await request(app)
        .put('/recipes')
        .send({
            'name': 'butter',
            'ingredients': [
                '1 bagel',
                '2 tbsp butter'
            ],
            'instructions': [
                'cut the bagel',
                'spread butter on bagel'
            ]
        })
        .expect(404);

    expect(response.body).toMatchObject({
        "error": "Recipe does not exist"
    });
});