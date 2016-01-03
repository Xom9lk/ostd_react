var webpack = require("webpack");

var config = Object.assign({}, require("./webpack.config.root"));

config.definePlugin.NODE_ENV = "'development'";
config.definePlugin["process.env.NODE_ENV"] = "'development'";
config.definePlugin["process.env"] = {
    NODE_ENV: "'development'"
};

config.module.loaders = config.module.loaders.concat([
    //React Loader
    config.reactLoader,
    {
        test: /\.(css|scss)$/,
        loader: config.cssToStringLoader
    }
]);

config.plugins = config.plugins.concat([
    //Константы для прекомпиляции
    new webpack.DefinePlugin(config.definePlugin),
    //SourceMap
    new webpack.SourceMapDevToolPlugin({})
]);

// Для hot reload, dev-server
config.entry = [
    "webpack-dev-server/client?http://" + config.serverHost + ":" + config.serverPort,
    "webpack/hot/only-dev-server",
    "./src/index.js"
];

config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
]);

module.exports = config;