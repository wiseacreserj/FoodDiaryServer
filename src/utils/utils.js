function  getCalories (caloriesByFood, portion) {
    return caloriesByFood / 100  * portion
}

function  getProtein (proteinByFood, portion) {
    return proteinByFood / 100  * portion
}

function  getFat (fatByFood, portion) {
    return fatByFood / 100  * portion
}

function  getCarbohydrate (carbohydrateByFood, portion) {
    return carbohydrateByFood / 100  * portion
}

function getCaloriesNorm(gender, weight, height, age, activityLevel) {

    let genderModifier;
    let activityMultiplier;

    switch (gender) {
        case "male": genderModifier = 5;
        break;
        case "female": genderModifier = -161;
        break;
    }

    switch (activityLevel){
        case "1":  activityMultiplier = 1.2;
        break;
        case "2":  activityMultiplier = 1.375;
        break;
        case "3":  activityMultiplier = 1.4625;
        break;
        case "4":  activityMultiplier = 1.55;
        break;
        case "5":  activityMultiplier = 1.6375;
        break;
        case "6":  activityMultiplier = 1.725;
        break;
        case "7":  activityMultiplier = 1.9;
        break;
    }
  
  
    return (9.99 * weight + 6.25 * height - 4.92 * age + genderModifier) * activityMultiplier
    
    
    


}

module.exports = {getCalories, getProtein, getFat, getCarbohydrate, getCaloriesNorm}