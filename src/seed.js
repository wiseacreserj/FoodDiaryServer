const sequelize = require("./models/db")
const Food = require("./models/Food")


async function fillDB() {
    await sequelize.sync({
        force: true
    })
    
let foods = [
    {   name: "Бренди", calories: 225, protein: 0, fat: 0, carbohydrate: 1, category: "Алкогольные напитки"},
    {   name: "Вино десертное", calories: 175, protein: 0.5, fat: 0, carbohydrate: 20, category: "Алкогольные напитки"},
    {   name: "Водка", calories: 234, protein: 0, fat: 0, carbohydrate: 0.1, category: "Алкогольные напитки"},
    {   name: "Пиво 3%", calories: 37, protein: 0.6, fat: 0, carbohydrate: 3.5, category: "Алкогольные напитки"},
    {   name: "Пиво темное", calories: 39, protein: 0.2, fat: 0, carbohydrate: 4, category: "Алкогольные напитки"},
    {   name: "Ром", calories: 217, protein: 0, fat: 0, carbohydrate: 0, category: "Алкогольные напитки"},

    {   name: "Апельсиновый сок", calories: 36, protein: 0.9, fat: 0.1, carbohydrate: 8.4, category: "Безалкогольные напитки"},
    {   name: "Квас хлебный", calories: 26, protein: 0.2, fat: 0, carbohydrate: 0.5, category: "Безалкогольные напитки"},
    {   name: "Кофе с молоком", calories: 56, protein: 0.8, fat: 1, carbohydrate: 11, category: "Безалкогольные напитки"},
    {   name: "Морковный сок", calories: 31, protein: 1, fat: 0.1, carbohydrate: 6.5, category: "Безалкогольные напитки"},

    {   name: "Белые свежие", calories: 32, protein: 3.3, fat: 1.5 , carbohydrate: 3.4, category: "Грибы"},
    {   name: "Шампиньоны свежие", calories: 29, protein: 4.3, fat: 0.9 , carbohydrate: 1.4, category: "Грибы"},
    {   name: "Лисички сушеные", calories: 268, protein: 22, fat: 7.2 , carbohydrate: 2.4, category: "Грибы"},
    {   name: "Белые сушеные", calories: 277, protein: 23.8, fat: 6.8 , carbohydrate: 30.2, category: "Грибы"},

    {   name: "Гречневая каша", calories: 137, protein: 4.5, fat: 1.6 , carbohydrate: 27.4, category: "Каши"},
    {   name: "Овсяная каша", calories: 93, protein: 3.2, fat: 1.8 , carbohydrate: 15.4, category: "Каши"},
    {   name: "Рисовая каша", calories: 79, protein: 1.5, fat: 0.2 , carbohydrate: 17.3, category: "Каши"},
    {   name: "Перловая каша", calories: 102, protein: 3.2, fat: 0.5 , carbohydrate: 22.7, category: "Каши"},

    {   name: "Салями", calories: 576, protein: 21.3, fat: 53.6 , carbohydrate: 1.1, category: "Колбаса/колбасные изделия"},
    {   name: "Колбаса Докторская", calories: 257, protein: 13.4, fat: 22.9 , carbohydrate: 0, category: "Колбаса/колбасные изделия"},
    {   name: "Колбаски охотничьи", calories: 325, protein: 27.1, fat: 24.6 , carbohydrate: 0, category: "Колбаса/колбасные изделия"},
    {   name: "Колбаса Московская", calories: 402, protein: 19.1, fat: 36.1 , carbohydrate: 0, category: "Колбаса/колбасные изделия"},

    {   name: "Йогурт 1.5%", calories: 65, protein: 4.3, fat: 1.5 , carbohydrate: 8.4, category: "Молочные продукты"},
    {   name: "Кефир 1%", calories: 37, protein: 2.8, fat: 1.0 , carbohydrate: 4.0, category: "Молочные продукты"},
    {   name: "Молоко 3.2%", calories: 58, protein: 2.8, fat: 3.2 , carbohydrate: 4.6, category: "Молочные продукты"},
    {   name: "Сыр голландский", calories: 352, protein: 26.4, fat: 26.5 , carbohydrate: 0, category: "Молочные продукты"},
    {   name: "Сыр сулугуни", calories: 293, protein: 20, fat: 24.2 , carbohydrate:0, category: "Молочные продукты"},

    {   name: "Баранина", calories: 201, protein: 16.2, fat: 15.3 , carbohydrate:0, category: "Мясо, птица"},
    {   name: "Говядина", calories: 191, protein: 18.7, fat: 12.6 , carbohydrate:0, category: "Мясо, птица"},
    {   name: "Кролик", calories: 197, protein: 20.6, fat: 12.8 , carbohydrate:0, category: "Мясо, птица"},
    {   name: "Курица", calories: 161, protein: 20.4, fat: 8.6 , carbohydrate:0.8, category: "Мясо, птица"},

    {   name: "Капуста белокачанная", calories: 31, protein: 1.9, fat: 0 , carbohydrate:5.7, category: "Овощи"},
    {   name: "Лук порей", calories: 38, protein: 3.2, fat: 0 , carbohydrate:7.1, category: "Овощи"},
    {   name: "Морковь", calories: 29, protein: 1.3, fat: 0.1 , carbohydrate:6.3, category: "Овощи"},
    {   name: "Картофель молодой", calories: 57, protein: 2.2, fat: 0.3 , carbohydrate:12.5, category: "Овощи"},

    {   name: "Карась", calories: 84, protein: 17.5, fat: 1.6 , carbohydrate:0, category: "Рыба и морепродукты"},
    {   name: "Креветка", calories: 85, protein: 18, fat: 0.9 , carbohydrate:0, category: "Рыба и морепродукты"},
    {   name: "Сельдь", calories: 248, protein: 17.3, fat: 19.9 , carbohydrate:0, category: "Рыба и морепродукты"},
    {   name: "Треска", calories: 76, protein: 17.7, fat: 0.5 , carbohydrate:0, category: "Рыба и морепродукты"},

    {   name: "Абрикосы", calories: 44, protein: 0.7, fat: 0 , carbohydrate:10.1, category: "Фрукты и ягоды"},
    {   name: "Виноград", calories: 73, protein: 0.5, fat: 0 , carbohydrate:17.8, category: "Фрукты и ягоды"},
    {   name: "Киви", calories: 46, protein: 1, fat: 0.7 , carbohydrate:9.7, category: "Фрукты и ягоды"},
    {   name: "Яблоки", calories: 48, protein: 0.5, fat: 0 , carbohydrate:11.4, category: "Фрукты и ягоды"},

    {   name: "Хлеб ржаной", calories: 210, protein: 4.7, fat: 0.6 , carbohydrate:49.5, category: "Хлебобулочные изделия"},
    {   name: "Лаваш армянский", calories: 239, protein: 7.7, fat: 1.1 , carbohydrate:47.8, category: "Хлебобулочные изделия"},
    {   name: "Булочка", calories: 218, protein: 7.4, fat: 1.8 , carbohydrate:43.7, category: "Хлебобулочные изделия"},

    {   name: "Омлет", calories: 181, protein: 9.7, fat: 15.5 , carbohydrate:1.7, category: "Яйца"},
    {   name: "Яйцо куриное", calories: 153, protein: 12.7, fat: 11.1 , carbohydrate:0.6, category: "Яйца"},
    {   name: "Яйцо перепелиное", calories: 170, protein: 11.9, fat: 13.3 , carbohydrate:0.8, category: "Яйца"},



    
]

 foods.forEach(async (food) => await Food.create(food))
 console.log("SEED SUCCESS!")

}

module.exports = {fillDB}