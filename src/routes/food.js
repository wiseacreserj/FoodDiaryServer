const express = require('express')
const router = express.Router()
const Food = require("../models/Food")
const Meal = require("../models/Meal")



router.post("/food", async (req, res) => {
    let { name, description, calories, protein, fat, carbohydrate } = req.body
    await Food.create({
        name,
        description,
        calories,
        protein,
        fat,
        carbohydrate
    }).then(r => res.end(JSON.stringify(r)))
})

router.get("/food/:mealId", async (req, res) => {
    let { mealId } = req.params
    let result = await Food.findAll({
        include: [{
            model: Meal,
            where: {
                id: mealId
            },
            attributes: ["name"],
            through: { attributes: ["meal_food"], attributes: ["portion"] }
        }
        ]
    })
    let result1 = result.map((elem, index) => {
        let modifiedElem = JSON.parse(JSON.stringify(elem))
        delete modifiedElem.meals
        modifiedElem.portion = elem.meals[0]["meal_food"].portion
        return modifiedElem
    })
    res.end(JSON.stringify(result1))
})

router.get("/foods", async (req, res) => {
    if (Object.keys(req.session.user) === 0 ){
        res.sendStatus(403)
        return
    }
   
    let result;
    let {category, sort} = req.query
    if (category === "all" && sort !== "category" && sort !== "name") {
        result = await Food.findAll({
            order:[
                [sort, "DESC"],                
            ],
            attributes: ["name", "category", "id","calories", "protein", "fat", "carbohydrate"]
        })
    } else if (sort === "category" && category === "all"){
        result = await Food.findAll({
            order:[
                [sort, "ASC"],                
            ],
            attributes: ["name", "category", "id","calories", "protein", "fat", "carbohydrate"]
        })
    } else if (sort === "name" && category === "all") {
        result = await Food.findAll({
            order:[
                [sort, "ASC"],                
            ],
            attributes: ["name", "category", "id","calories", "protein", "fat", "carbohydrate"]
        })
    }
    else {
        result = await Food.findAll({
            where:{
                category: category
            },
            order:[
                [sort, "DESC"],                
            ],
            attributes: ["name", "category", "id","calories", "protein", "fat", "carbohydrate"]
        })
    }
    res.end(JSON.stringify(result))
})

router.post("/foods", async (req, res) => {
    let { category } = req.body
    let result = await Food.findAll({
        where: { category: category },
        attributes: ["name", "id","calories", "protein", "fat", "carbohydrate", "category"]
    })
    res.end(JSON.stringify(result))
})

router.get("/category", async (req, res) => {
    let category = await Food.findAll({
        attributes: ["category"],
        order:[
            ["category", "ASC"]
        ],
        group: ["category"]
    })
    res.end(JSON.stringify(category))
})



module.exports = router