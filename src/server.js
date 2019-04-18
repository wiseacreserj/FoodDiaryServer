const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
var app = express()
const sequelize = require("./models/db")

const {fillDB} = require("./seed")

const userRouter = require("./routes/user")
const mealRouter = require("./routes/meal")
const foodRouter = require("./routes/food")

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))

//Enable CORS
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

//ROUTING

app.use(userRouter)
app.use(mealRouter)
app.use(foodRouter)


//DB connection test

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });



fillDB()

app.listen(4000, (req, res) => {
    console.log("Server listen on 4000 port")
})

