const Sequelize = require('sequelize');
const sequelize = require("./db")
const moment = require("moment")

const Meal = sequelize.define("meal", {
  name: Sequelize.STRING,
  note: Sequelize.STRING,
  caloriesReceived: Sequelize.FLOAT(6, 2),
  proteinReceived: Sequelize.FLOAT(6, 2),
  fatReceived: Sequelize.FLOAT(6, 2),
  carbohydrateReceived: Sequelize.FLOAT(6, 2),
 createdAt:{ type: Sequelize.DATE, defaultValue: moment().format("YYYY-MM-DD")}
})

module.exports = Meal

/* '_customGetters',
  '_customSetters',
  'validators',
  '_hasCustomGetters',
  '_hasCustomSetters',
  'rawAttributes',
  'attributes',
  '_isAttribute',
  'getUser',
  'setUser',
  'createUser',
  'getFood',
  'countFood',
  'hasFood',
  'setFood',
  'addFood',
  'removeFood',
  'createFood' ] */