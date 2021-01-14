module.exports = {


  friendlyName: 'Update recipe',


  description: '',


  inputs: {

    id: {
      type: 'string',
      required: true
    },

    recipeName: {
      type: 'string'
    },
    imagePath: {
      type: 'string',
      isURL: true
    },
    description: {
      type: 'string'
    }

  },


  exits: {

    success: {
      statusCode: 200
    },
    invalid:{
      statusCode: 500
    }

  },


  fn: async function (inputs, exits) {

    try {

      await Recipes.update({ id : inputs.id}, _.omit(inputs, ['id']));

      return exits.success({message: 'Record updated!', success: true});

    } catch (error) {

      return exits.invalid({message: 'Unable to updated record',error, success: false});
    }

  }


};
