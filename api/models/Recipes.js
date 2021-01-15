/**
 * Recipes.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    recipeName: { type: 'string' , required: true},

    imagePath: { type: 'string' , required: true, isURL: true},

    description: { type: 'string', required:true },

    userId: { model:'Login', columnName:'userID', required: true},

    ingredientsId: {
      model: 'Ingredients',
      columnName: 'ingredientsId'
    }


  },

};

