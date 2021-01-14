const readRecipes = require("./read-recipes");

module.exports = {


  friendlyName: 'Delete recipe',


  description: '',


  inputs: {

    id: {
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


  fn: async function (inputs, exits) {

    try {
      await Recipes.destroy({ id: inputs.id });
      return exits.success({message: 'Record Deleted..', success: true});
    } catch (error) {
      return exits.invalid({message: 'Record not deleted!', success: false});
    }

  }


};
