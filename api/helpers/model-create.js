module.exports = {


  friendlyName: 'Model create',


  description: 'Stores Model into database',


  inputs: {

    ModelName: {
      type: 'ref',
      required: true
    },
    ModelParams: {
      type: 'ref',
      required: true
    }

  },


  exits: {

    success:{
      description: 'All done'
    },

    invalid: {
      description: 'Not done.',
    },

  },


  fn: async (inputs,exits) => {
    try{
    const data = await inputs.ModelName.create(inputs.ModelParams).fetch()
    return exits.success(data);
  }catch (error){
    return exits.invalid({statusCode: 400});
  }

  }


};

