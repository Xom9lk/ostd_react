var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = Object.assign({}, require("./webpack.config.root"));

// ENV production
config.definePlugin.NODE_ENV = "'production'";
config.definePlugin["process.env.NODE_ENV"] = "'production'";
config.definePlugin["process.env"] = {
    NODE_ENV: "'production'"
};

// Остается только babel-loader
config.reactLoader.loaders = ["babel"];

config.module.loaders = config.module.loaders.concat([
    //React Loader
    config.reactLoader,
    //CSS файлы в строку
    {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract(config.cssToFileLoader)
    }
]);

config.plugins = config.plugins.concat([
    //Константы для прекомпиляции
    new webpack.DefinePlugin(config.definePlugin),
    //Минификация
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        sourceMap: false,
        output: {
            comments: false
        }
    }),
    //Исключение дублей
    new webpack.optimize.DedupePlugin(),
    //CSS в файл
    new ExtractTextPlugin("styles.css")
]);

module.exports = config;