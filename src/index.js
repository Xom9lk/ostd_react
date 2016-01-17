/**
 * Created by Игорь on 03.01.2016.
 */
/* Входная точка приложения */
// Стили
require("normalize.css");
require("./scss/index.scss");

// js
try {
    require("./js/app.js");
} catch (e) {
    console.error(e);
}
