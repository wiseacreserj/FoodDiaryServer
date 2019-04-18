const Sequelize = require('sequelize');
const sequelize = require("./db")

const User = sequelize.define("user", {
    login: Sequelize.STRING,
    password: Sequelize.STRING,
    gender: Sequelize.ENUM("male", "female"),
    caloriesNorm: Sequelize.INTEGER,
    age: Sequelize.INTEGER,
    role: Sequelize.ENUM("user", "admin"),
    height: Sequelize.INTEGER,
    weight: Sequelize.INTEGER,
    activityLevel: Sequelize.ENUM("1", "2", "3", "4", "5", "6", "7")
    
});

module.exports = User





