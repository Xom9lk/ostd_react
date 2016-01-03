// Если используется старая версия NodeJS, то для работы потребуются полифилы
require("babel-polyfill");

var path = require("path");
var webpack = require("webpack");
var autoprefixer = require('autoprefixer');

/* Общие глобальные переменные для JS и SCSS */
var jsonToSassVars = require("./webpackScripts/jsonToSassVars");
var prepend = path.join(__dirname, "./webpackScripts/prependLoader");

// Основные настройки
var config = {
    serverHost: "0.0.0.0",
    serverPort: "8085",
    entry: ["./src/index.js"],
    output: {
        path: path.join(__dirname, "build"),
        filename: "bundle.js",
        publicPath: "/build/"
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    module: {
        loaders: []
    },
    postcss: function () {
        return [autoprefixer];
    },
    plugins: [
        // Исключить все файлы с локализациями для уменьшения размера,
        // локализация должна загружаться отдельно
        new webpack.IgnorePlugin(/^\.\/locale$/),
        new webpack.IgnorePlugin(/^\.\/lang/)
    ],
    definePlugin: {
        GLOBALS_JS_CSS: {},
        GLOBALS: {}
    },
    reactLoader: {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, "src"),
        loaders: ["react-hot", "babel-loader"] // react-hot-loader, babel-loader
    }
};

// Формируется строка для глобальных переменных в SCSS
var sassGlobals = encodeURIComponent(jsonToSassVars(config.definePlugin.GLOBALS_JS_CSS));

for (var key in config.definePlugin.GLOBALS_JS_CSS) {
    if (config.definePlugin.GLOBALS_JS_CSS.hasOwnProperty(key)){
        config.definePlugin.GLOBALS_JS_CSS[key] = JSON.stringify(config.definePlugin.GLOBALS_JS_CSS[key]);
    }
}

// Настройки для css, sass лоадера
// Для продакшена стили будут собираться в файл style.css, для разработки - непосредственно в body документа
var cssLoaderString = "css!postcss!sass?" +
    "includePaths[]=" + (path.resolve(__dirname, "./bower_components")) +
    "&includePaths[]=" + (path.resolve(__dirname, "./node_modules")) +
    "!" + prepend + "?appendData=" + sassGlobals;

// Production; Строка для сохранения css в отдельный файл
config.cssToFileLoader = cssLoaderString;
// Dev; Строка для сохранения css в строку в index html
config.cssToStringLoader = "style!" + cssLoaderString;

module.exports = config;