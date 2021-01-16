/**
 * Ingredients.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  datastore: 'default',

  attributes: {

    ingredientsName: { type: 'json', columnType: 'array' , required: true},

    recipeId: {
      model: 'Recipes',
      columnName: 'recipeId',
      required: true
    },

    // userId: {
    //   model: 'Recipes',
    //   columnName: 'userId',
    //   required: true
    // }


  },

};

