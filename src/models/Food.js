const Sequelize = require('sequelize');
const sequelize = require("./db")


const Food = sequelize.define('food', {
    name: Sequelize.STRING,
    calories: Sequelize.FLOAT(6, 2),
    protein: Sequelize.FLOAT(6, 2),
    fat: Sequelize.FLOAT(6, 2),
    carbohydrate: Sequelize.FLOAT(6, 2),
    category: Sequelize.STRING,
    isActive: {type: Sequelize.BOOLEAN, defaultValue: true}
})

module.exports = Food



/*[ '_customGetters',
  '_customSetters',
  'validators',
  '_hasCustomGetters',
  '_hasCustomSetters',
  'rawAttributes',
  'attributes',
  '_isAttribute',
  'getMeals',
  'countMeals',
  'hasMeal',
  'hasMeals',
  'setMeals',
  'addMeal',
  'addMeals',
  'removeMeal',
  'removeMeals',
  'createMeal' ]*/