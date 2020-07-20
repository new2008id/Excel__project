const path = require('path')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Определяем в каком режиме разработки находимся сейчас через переменную 

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

const jsLoaders = () =>  {
    // функция будет возвращать babel по умолчанию
    const loaders = [
        {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-class-properties']
            }
        }
        
    ]

    if (isDev) {
        loaders.push('eslint-loader')
        // если мы находимся в режиме разработки, добавляем loader  для скриптов 
    }

    return loaders
}

console.log('IS PROD', isProd); // false
console.log('IS DEV', isDev);   // true



module.exports = {
    context: path.resolve(__dirname, 'src'), // данный параметр отвечает за все исходники приложения
    mode: 'development',
    entry: ['@babel/polyfill', './index.js'], // основные настройки, наш главный файл с которого всё начинается
    // добавил polyfill должны работать async/await
    output: {
        filename: filename('js'), // к bundle добавляю hash чтобы избежать проблем с кэшем
        path: path.resolve(__dirname, 'dist') // куда необходимо всё складывать
    },
    resolve: { // введены некоторое количество настроек
        extensions: ['.js'], // extensions по умолчнию будут загружены файлы .js
        alias: { // чтобы не писать относительные пути
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core'),
        }
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
        port: 3000,
        hot: isDev
    },
    plugins: [
        new CleanWebpackPlugin(), // Плагин будет чистить папку dist
        new HTMLWebpackPlugin({
            template: 'index.html', // параметр указывает, откуда взять шаблон html, чтобы не было генерации
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            }
        }),
        new CopyPlugin({ // плагин используется для переноса favicon
            patterns: [{
                from: path.resolve(__dirname, 'src/favicon.ico'),
                to: path.resolve(__dirname, 'dist') // перемещать в dist
            }],
        }),
        new MiniCssExtractPlugin({
            filename: filename('css') // только один параметр, указать в каком файле всё поместить
        }),
    ],
    module: {
        rules: [{ // описываем loaders какие будут в проекте
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true
                        }
                    }, // находится в статической переменной
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders(),
                
            }
        ],

    }

}