const Sequelize = require('sequelize');

module.exports = new Sequelize('testdb', 'user', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    logging: false,

});


const User = require("./User")
const Meal = require("./Meal")
const Food = require("./Food")
const MealFood = require("./MealFood")


User.hasMany(Meal)
Meal.belongsTo(User)

Meal.belongsToMany(Food, {through:MealFood})
Food.belongsToMany(Meal, {through: MealFood})



