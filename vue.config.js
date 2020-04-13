
const path = require('path');
const defaultSettings = require('./settings.js');

function resolve(dir) {
    return path.join(__dirname, dir);
}
const name = defaultSettings.title || 'vue Admin Template'; // page title
const port = process.env.port || process.env.npm_config_port || 9528; // dev port
const vueConfig = {
    publicPath: '/',
    outputDir: 'dist',
    // 配置打包之后输出的目录
    assetsDir: '',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port,
        open: true,
        overlay: {
            warnings: false,
            errors: true,
        },
    },
    pluginOptions: {
        lintStyleOnBuild: process.env.NODE_ENV === 'development',
        stylelint: {
            fix: process.env.NODE_ENV === 'development', // boolean (default: true)
        },
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name,
        resolve: {
            alias: {
                '@': resolve('src'),
            },
        },
    },
    chainWebpack: (config) => {
        config.plugins.delete('preload'); // TODO: need test
        config.plugins.delete('prefetch'); // TODO: need test
        // 设置 public 目录别名
        config.resolve.alias.set('#', resolve('public'));
        // 解决 vue-layer 使用时报错问题
        config.resolve.alias.set('vue$', 'vue/dist/vue.js');
        // set preserveWhitespace
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap((options) => {
                options.compilerOptions.preserveWhitespace = true;
                return options;
            })
            .end();
        // https://webpack.js.org/configuration/devtool/#development
        config
            .when(process.env.NODE_ENV === 'development',
                (config2) => config2.devtool('cheap-source-map'));

        config
            .when(process.env.NODE_ENV !== 'development',
                (config3) => {
                    config3
                        .plugin('ScriptExtHtmlWebpackPlugin')
                        .after('html')
                        .use('script-ext-html-webpack-plugin', [{
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            inline: /runtime\..*\.js$/,
                        }])
                        .end();
                    config3
                        .optimization.splitChunks({
                            chunks: 'all',
                            cacheGroups: {
                                libs: {
                                    name: 'chunk-libs',
                                    test: /[\\/]node_modules[\\/]/,
                                    priority: 10,
                                    chunks: 'initial', // only package third parties that are initially dependent
                                },
                                elementUI: {
                                    name: 'chunk-elementUI', // split elementUI into a single package
                                    priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
                                },
                                commons: {
                                    name: 'chunk-commons',
                                    test: resolve('src/components'), // can customize your rules
                                    minChunks: 3, //  minimum common number
                                    priority: 5,
                                    reuseExistingChunk: true,
                                },
                            },
                        });
                    config3.optimization.runtimeChunk('single');
                });
    },
};
// 开发环境配置 webpack-dev-server
if (process.env.VUE_APP_API_MOCK) {
    // eslint-disable-next-line global-require
    vueConfig.devServer.before = require('./mock/mock-server.js');
}
if (!process.env.VUE_APP_API_MOCK && process.env.NODE_ENV === 'development') {
    vueConfig.devServer.proxy = {
        [process.env.VUE_APP_BASE_API]: {
            target: process.env.VUE_APP_TARGET_API,
            changeOrigin: true,
            pathRewrite: {
                [`^${process.env.VUE_APP_BASE_API}`]: '',
            },
        },
    };
}
module.exports = vueConfig;
