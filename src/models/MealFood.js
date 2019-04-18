const Sequelize = require('sequelize');
const sequelize = require("./db")


const MealFood = sequelize.define("meal_food", {
    portion: Sequelize.INTEGER,
    } 
)


module.exports = MealFood


