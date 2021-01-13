/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


    //Authentication
    'POST /api/user/register' : 'user/register',
    'POST /api/user/login'    : 'user/login',

    //Testing
    // 'GET /api/test' : 'test/test'


};
