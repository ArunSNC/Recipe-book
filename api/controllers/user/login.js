const Utilservice = require("../../services/Utilservice");

module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


  inputs: {

    username: {
      type: 'string',
      required: true
    },
    password:{
      type: 'string',
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
    },
    unauthorized: {
      statuscode: 404
    },
    serverError: {
      statusCode: 500
    }
  },

  fn: async function (inputs, exits) {

    const {username, password } = inputs;

    const user = await Registration.findOne({
      username
    });

    if(!user) return exits.invalid({message: 'user notfound, please register user', success: false});

    const passwordMatched = await Utilservice.comparePassword(password,user.password);

    if(!passwordMatched) return exits.unauthorized({message: 'Unauthorized', success: false});

    const loggedUser = await Login.create({
      username,
      password: user.password,
      userId: user.id,
    }).fetch();

    if(!loggedUser) return exits.serverError({message: 'Unable to Login user..', success: false});

    const token = JWTservice.sign({id: loggedUser.userId}, '1 days');

    const decoded = JWTservice.decode(token);

    return exits.success({
      message: "successfully Loggedin..",
       token ,
       id : decoded.id,
       iat: decoded.iat,
       exp: decoded.exp,
       success: true});
  }
};
