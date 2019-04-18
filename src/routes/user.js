const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")
const {getCaloriesNorm} = require("../utils/utils")


router.post("/login", async (req, res) => {
   
    let { login, password } = req.body

    let user = await User.findOne({
        where: {
            login: login,
        }
    })
    if (user) {
        bcrypt.compare(password, user.password, async(err, result) => {
            if(result) {
                let modifiedUser = JSON.parse(JSON.stringify(user))
                delete modifiedUser.password;
                req.session.user = modifiedUser;
                
               
                res.end(JSON.stringify(req.session.user))
            } else {
            
        res.end("Invalid login or password")
            } 
          });
    } else {
        
        res.end("Неверный логин или пароль")
    }
})

router.post("/user", async (req, res) => {
    

    if (Object.keys(req.body).length === 0) {
        res.end("Request has empty body!")
        return
    }

    let existUser = await User.findAll({where:{
        login: req.body.login
    }})

    if (existUser.length > 0){
       
      res.status(404).end(JSON.stringify({message: "Пользователь с таким именем уже существует!"}))
        return
    }
    
    await bcrypt.hash(req.body.password, 10, async (err, hash) => {
        await User.create({
            login: req.body.login,
            password: hash,
            gender: req.body.gender,
            age: req.body.age,
            height: req.body.height,
            weight: req.body.weight,
            activityLevel: req.body.activityLevel,
            caloriesNorm: getCaloriesNorm(req.body.gender, req.body.weight, req.body.height, req.body.age, req.body.activityLevel),
            role: req.body.role === "admin" ? "admin" : "user"
           
        }).then(r => res.send(JSON.stringify(r)))
    })



})

router.post("/user/:id", async(req,res) =>{
 
    if (String(req.params.id) === String(req.session.user.id)){
        await bcrypt.hash(req.body.password, 10, async (err, hash) => {
           
            let user = await User.findByPk(req.session.user.id)
          
            await user.update({
                password: hash,
                gender: req.body.gender,
                age: req.body.age,
                height: req.body.height,
                weight: req.body.weight,
                activityLevel: req.body.activityLevel,
                caloriesNorm: getCaloriesNorm(req.body.gender, req.body.weight, req.body.height, req.body.age, req.body.activityLevel),               
            }).then(r => res.sendStatus(200))
        })

    } else {
        res.sendStatus(403)
    }
    
})

router.get("/logout", async (req, res) => {
    req.session = null
    res.end(JSON.stringify(req.session))
})

router.post("/login2", async(req, res) => {
    let { login, password } = req.body

    let user = await User.findOne({
        where: {
            login: login,
        }
    })

    if (user) {
        bcrypt.compare(password, user.password, async(err, result) => {
            if(result) {
                let modifiedUser = JSON.parse(JSON.stringify(user))
                delete modifiedUser.password;
                req.session.user = modifiedUser;
                
                res.end(JSON.stringify(req.session.user))
            } else {
            
             
        res.end("Invalid login or password")
            } 
          });
    }
})

router.get("/users", async (req, res) => {
    
    await User.findAll().then(r => res.end(JSON.stringify(r)))
})


module.exports = router


