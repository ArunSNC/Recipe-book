module.exports = {


  friendlyName: 'Read recipes',


  description: 'Read Recipes from the Database',


  inputs: {

    id:{
      type: 'string',
      required: true
    }

  },


  exits: {

    success: {
      statusCode: 200
    },
    invalid:{
      statusCode: 404
    }

  },


  fn: async function (inputs, exits, env) {

    try {
      const recipe = await Recipes.findOne({ id: inputs.id }).populate('ingredientsId');

      if(!recipe) return exits.invalid({message: 'Not Found', success: false});

      return exits.success({message: 'Recipe Found',recipe, success: true});
    } catch (error) {

      return exits.invalid({message: 'Not Found', success: false});
    }
  }


};
