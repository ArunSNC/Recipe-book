module.exports = {


  friendlyName: 'Read all recipes',


  description: '',


  inputs: {

  },


  exits: {
    success: {
      statusCode: 200
    },
    invalid:{
      statusCode: 404
    }
  },


  fn: async function (inputs,exits) {

    try {
      const recipes = await Recipes.find();
      return exits.success({message: 'Recipes Found',recipes, success: true});
    } catch (error) {
      return exits.invalid({message: 'Not Found', success: false});
    }

  }


};
