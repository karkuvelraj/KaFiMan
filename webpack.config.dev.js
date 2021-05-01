// eslint-disable-next-line no-unused-vars
const webpack = require("webpack");
const fs = require("fs");
const path = require('path')
const HtmlWebplugin=require("html-webpack-plugin")

process.env.NODE_ENV = 'development'

module.exports={
    mode: "development",
    target : "web",
    devtool : "cheap-module-source-map",
    entry: "./src/index",
    output:{
        path:path.resolve(__dirname,"build"),
        publicPath:'/',
        filename:'bundle.js',
        chunkFilename: '[name].chunk.js',
    },
    devServer:{
        stats:'minimal',
        overlay:true,
        historyApiFallback: true,
        disableHostCheck :true,
        headers: {"Access-Control-Allow-Origin":"*"},
        
        https: {
            key: fs.readFileSync('private.key'),
            cert: fs.readFileSync('private.pem'),
            
        }
    },
    plugins:[
        new webpack.DefinePlugin({
                "process.env.API_URL":JSON.stringify("http://localhost:3001")
            }),
        new HtmlWebplugin({
            template:"src/index.html",
            favicon:"src/logo.png"
        })
    ],
    module:{
        rules:[
            {
                test: /\.(js|jsx)/,
                exclude:/node_modules/,
                use:["babel-loader","eslint-loader"]
            },
            {
                test: /\.css/,
                use:["style-loader","css-loader"]
            }, 
            {
                test: /\.scss/,
                use:["style-loader","css-loader","sass-loader"]
            }, 
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192,
                    }
                  }
                ]
              }
        ]
    }
}