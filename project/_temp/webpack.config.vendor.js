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

    const extractVendorCSS = new ExtractTextPlugin('vendor.css');
    const vendorBundleConfig = {
        mode: argv.mode || 'development', // we default to development when no 'mode' arg is passed
        entry: {
            vendor: [
                //vendor
                './_vendor/js/vendor.js',

                //dev_vendor

                //styles
                './_vendor/styles/vendorstyles.js'
            ]
        },
        output: {
            filename: 'vendor.js',
            path: path.resolve(__dirname, '../wwwroot/dist'),
            publicPath: "/dist/"
        },
        module: {
            rules: [
                {
                    test: require.resolve('jquery'),
                    use: [{ loader: 'expose-loader', options: 'jQuery' }, { loader: 'expose-loader', options: '$' }]
                },
                {
                    test: require.resolve('jquery-bridget'),
                    use: [{ loader: 'expose-loader', options: 'jQueryBridget' }]
                },
                {
                    test: require.resolve('flickity'),
                    use: [{ loader: 'expose-loader', options: 'Flickity' }]
                },
                {
                    test: require.resolve('wowjs'),
                    use: [{ loader: 'expose-loader', options: 'WOW' }]
                },
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
                        extractVendorCSS.extract({
                            use: isDevBuild ?
                                'css-loader'
                                :
                                'css-loader?minimize'
                        })
                },
                {
                    test: /\.scss$/,
                    use: extractVendorCSS.extract({
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
        plugins: [
            extractVendorCSS

        ]
    }


    return vendorBundleConfig;
};


//,
//new webpack.DllPlugin({
//    path: path.join(__dirname, 'wwwroot', 'dist', 'vendor-manifest.json'),
//    name: 'vendor_[hash]'
//})

//{ test: require.resolve('html2canvas'), use: [{ loader: 'expose-loader', options: 'html2canvas' }] },
//{ test: require.resolve('three'), use: [{ loader: 'expose-loader', options: 'THREE' }] },