const express = require('express')
const router = express.Router()
const { getCalories, getProtein, getFat, getCarbohydrate } = require("../utils/utils")
const Meal = require("../models/Meal")
const Food = require("../models/Food")
const moment = require("moment")

router.get("/meal", async (req, res) => {
    let {rangeFrom, rangeTo} = req.query
    if (rangeFrom === "undefined" || rangeTo === "undefined" ){   
        rangeFrom = moment().subtract(1000, "year").startOf("day").format("YYYY-MM-DD")
        rangeTo = moment().endOf("day").format("YYYY-MM-DD")
    }
  

    let id = req.session.user.id
    let meals = await Meal.findAll({
        order:[ 
            ["createdAt", 'DESC']
        ],
        where: {
            userId: id,
            createdAt:  {$and :[
                {$gte: moment(rangeFrom).startOf("day") },
                {$lte: moment(rangeTo).endOf("day") }
            ] },
        },
        include: [{
            model: Food
        }]
    })

    res.end(JSON.stringify(meals))

})

router.get("/meal1", async (req, res) => {
    await Meal.findOne().then(meal => console.log(meal.name))
})

router.post("/meal", async (req, res) => {
   
    let { name, note } = req.body.meal
    let foods = req.body.foods
    
    let calories = 0
    let protein = 0
    let fat = 0
    let carbohydrate = 0

    foods.forEach(foodElem => {
        Food.findByPk(foodElem.foodId)
            .then(food => {
                calories += getCalories(food.calories, foodElem.portion)
                protein += getProtein(food.protein, foodElem.portion)
                fat += getFat(food.fat, foodElem.portion)
                carbohydrate += getCarbohydrate(food.carbohydrate, foodElem.portion)
            })
    })
    
    let newMeal = await Meal.create()
        .then(meal => {
            foods.forEach(food => {
                meal.addFood(food.foodId, { through: {portion: food.portion}})
            })
            return meal
        })

    await newMeal.update({
        name: name,
        note: note,
        caloriesReceived: calories,
        proteinReceived: protein,
        fatReceived: fat,
        carbohydrateReceived: carbohydrate,
    })
    await Meal.update({ createdAt:req.body.createdAt},{where:{id: newMeal.id}})
    await newMeal.setUser(req.session.user.id)
    res.end(JSON.stringify(newMeal))
})

router.post("/meal/:mealId", async(req, res) => {
    
    let {mealId} = req.params 
    let { name, note } = req.body.meal
    let foods = req.body.foods
    let oldFoods = req.body.oldFoods

    let calories = 0
    let protein = 0
    let fat = 0
    let carbohydrate = 0
 
    foods.forEach(foodElem => {
        Food.findByPk(foodElem.foodId)
            .then(food => {
                calories += getCalories(food.calories, foodElem.portion)
                protein += getProtein(food.protein, foodElem.portion)
                fat += getFat(food.fat, foodElem.portion)
                carbohydrate += getCarbohydrate(food.carbohydrate, foodElem.portion)
            })
    })

    let meal = await Meal.findByPk(mealId)
    await meal.removeFood(oldFoods)
    
     await  foods.forEach(food => {
        meal.addFood(food.foodId, { through: {portion: food.portion}})  
    })
   
    await meal.update({
        name: name,
        note: note,
        caloriesReceived: calories,
        proteinReceived: protein,
        fatReceived: fat,
        carbohydrateReceived: carbohydrate
    })
  
    res.sendStatus(200)
})

router.delete("/meal/:mealId", async(req, res) => {
    let {mealId} = req.params
     await Meal.destroy({where:{
         id: mealId
     }})
     res.sendStatus(200)
} )

router.get("/chart", async(req, res) => {

   let data = []
    for (let count = 0; count < 22; count++){
        let meal = await Meal.findAll({
            where:{
                userId: req.session.user.id,
                createdAt:{
                    $and: [
                        {$gte:moment().subtract(count, "day").startOf("day")},
                        {$lte:moment().subtract(count, "day").endOf("day")}
                    ]
                },
            }
        })
      
       if (meal.length === 0) {
           meal = [{caloriesReceived:0,
            proteinReceived:0, 
            fatReceived:0,
            carbohydrateReceived:0,
            createdAt: moment().subtract(count, "day").startOf("day").format("MM.DD")}]
       }
       data.push(meal)
    }
    
    let chartData = data.map((elem, index) => {
     
        let calories = 0
        let protein = 0
        let fat = 0
        let carbohydrate = 0
        elem.forEach((elem) => {
            calories += elem.caloriesReceived
            protein += elem.proteinReceived
            fat += elem.fatReceived
            carbohydrate += elem.carbohydrateReceived
        }) 
        return  {calories: calories, caloriesNorm: req.session.user.caloriesNorm, protein:protein, fat: fat, carbohydrate: carbohydrate, date: moment(elem[0].createdAt).format("DD.MM")}
    })
  
    res.send(chartData)
})

module.exports = router