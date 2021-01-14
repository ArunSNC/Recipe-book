module.exports = {


  friendlyName: 'Store recipes',


  description: 'Storing recipes in the database',


  inputs: {

    recipeName: {
      type: 'string',
      required: true
    },
    imagePath: {
      type: 'string',
      isURL: true,
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    ingredients: {
      type: 'json',
      columnType: 'array',
      required: true
    }

  },


  exits: {

    success:{
      statusCode: 200,
      description:'Returns when success'
    },
    invalid: {
      description: 'Returns when invalid'
    }

  },


  fn: async (inputs, exits, env) => {

    try {
      const { recipeName, imagePath, description, ingredients } = inputs;

      const userId = env.req.user;

      const storedRecipes = await sails.helpers.modelCreate(Recipes,{recipeName, imagePath, description,userId})

      const storedIngredients = await sails.helpers.modelCreate(Ingredients,{ingredientsName: ingredients,recipeId: storedRecipes.id,
        userId});

      if(!storedIngredients) return exits.invalid({message:'Recipe not saved', statusCode: 401, success: false});

      return exits.success({message: 'Recipes saved!', storedRecipes, storedIngredients, success: true});
    } catch (error) {
      return exits.invalid({message: 'Invalid error', error, success: false});
    }

  }


};
