module.exports = {


  friendlyName: 'Store recipes',


  description: 'Storing recipes in the database',


  inputs: {

    name: {
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
      const { name, imagePath, description, ingredients } = inputs;

      const userId = env.req.user;

      let storedRecipes = await sails.helpers.modelCreate(Recipes,{name, imagePath, description,
        userId
      })

      const storedIngredients = await sails.helpers.modelCreate(Ingredients,{ingredientsName: ingredients,recipeId: storedRecipes.id,
        userId
      });

      storedRecipes = await Recipes.update({ id: storedRecipes.id},{ ingredientsId: storedIngredients.id }).fetch();

      if(!storedRecipes) return exits.invalid({message:'Recipe not saved', statusCode: 401, success: false});

      return exits.success({message: 'Recipes saved!', storedRecipes, storedIngredients, success: true});
    } catch (error) {
      return exits.invalid({message: 'Invalid error', error, success: false});
    }

  }


};
