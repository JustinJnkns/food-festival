const path = require("path")
const webpack = require("webpack")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
module.exports = {
    // shows webpack where to start the bundle of dependancies
    entry: {
        app: './assets/js/script.js',
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js"
    },
    output: {
        // name of each attribute in the entry object will be used in place of [name] in each bundle.js created
        // output will put written into dist folder
        filename: "[name].bundle.js",
        path: __dirname + "/dist",
    },
    module: {
        rules: [{
            test: /\.jpg$/i,
            use: [{
                    // user file-loader,before image-webpack-loader so image webpack loader can optimize emitted files.
                    loader: 'file-loader',
                    options: {
                        name(file) {
                            return "[path][name].[ext]"
                        },
                        publicPath: function(url) {
                            return url.replace("../", "assets/")
                        }
                    }
                },
                {
                    loader: 'image-webpack-loader'
                }
            ]
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
        })
    ],
    mode: 'development'
}