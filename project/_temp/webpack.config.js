const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const sassVariables = [
    ''
];

module.exports = (env = {}, argv = {}) => {

    const isProdBuild = argv.mode === 'production';
    const isDevBuild = !isProdBuild;

    const extractMainCSS = new ExtractTextPlugin('main.css');
    const clientBundleConfig = {
        mode: argv.mode || 'development', // we default to development when no 'mode' arg is passed
        entry: {
            main: [
                './js/main.js',
                './styles/mainstyles.js'
            ]
        },
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, '../wwwroot/dist'),
            publicPath: "/dist/"
        },
        module: {
            rules: [
                {
                    test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)(\?|$)/,
                    use: 'url-loader?limit=100000'
                },
                {
                    test: /\.woff |\.woff2 |\.svg |.eot |\.ttf /,
                    use: 'url?prefix=font/&limit=10000'
                },
                {
                    test: /\.css(\?|$)/,
                    use:
                        extractMainCSS.extract({
                            use: isDevBuild ?
                                'css-loader'
                                :
                                'css-loader?minimize'
                        })
                },
                {
                    test: /\.scss$/,
                    use: extractMainCSS.extract({
                        use: isDevBuild ?
                            [{
                                loader: 'css-loader'
                            }, {
                                loader: 'sass-loader',
                                options: {
                                    data: sassVariables
                                }

                            }]
                            :
                            [{
                                loader: 'css-loader?minimize'
                            }, {
                                loader: 'sass-loader',
                                options: {
                                    data: sassVariables
                                }
                            }]
                    })
                }
            ]
        },
        externals: {
            $: "jQuery",
            jQuery: "jQuery",
            WOW: "WOW",
            Flickity: "Flickity",
            jQueryBridget: "jQueryBridget"
        },
        plugins: [
            extractMainCSS
        ]
    }

    return clientBundleConfig
};

//,
//new webpack.DllReferencePlugin({
//    context: __dirname,
//    manifest: require('./wwwroot/dist/vendor-manifest.json')
//})

//html2canvas: "html2canvas",
//    THREE: "THREE"