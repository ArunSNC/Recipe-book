const Utilservice = require("../../services/Utilservice");

module.exports = {

  friendlyName: 'Register',
  description: 'Register user.',

  inputs: {

    name:{
      type: 'string',
      required: true
    },
    username:{
      type:'string',
      required: true
    },
    email:{
      type:'string',
      required: true
    },
    password:{
      type:'string',
      required: true
    }
  },

  exits: {
    invalid: {
      statusCode: 409,
      description: 'user create error' // this will not go in response
    },
    success: {
      statusCode: 200,
      description: 'Success'
    }
 },

  fn: async  (inputs, exits)  => {

    try {

      const { name, username, email, password } = inputs;

      const encryptedPassword = await Utilservice.hashPassword(password);

      const registered = await Registration.create({
        username, name, email,
         password : encryptedPassword
      }).intercept('E_UNIQUE', (err)=>{
        return exits.invalid({
          message: "user already exists, try login",
          success: false
        })
      }).fetch();

      if(!registered) return exits.invalid({
        message: "registration failed..! , please try again",
        success: false
      })

      return exits.success({
        message: "user successfully registered",
        success: true
      });
    } catch (error) {
      return exits.invalid({
        message: error,
        success: false
      });
    }
  }
};
