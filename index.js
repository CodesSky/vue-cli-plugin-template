var fs = require('fs');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (api) => {
    var files = fs.readdirSync(api.resolve('public'));
    var htmlTemplate = files.filter((f)=>{
        return f.indexOf('.html') !== -1;
    });
    var scriptServer = {
        dev: '//staticadm.tcy365.org:1506/A', //开发版
        test: '//staticadm.tcy365.org:1507/A', //提测版
        testStable: '//staticadm.tcy365.org:1505/A', //测试稳定版
        pre: '//staticadm.tcy365.com:2505/A', //预发版
        official: '//staticadm.tcy365.com/A', //正式版
        docker: '//staticadm.tcy365.{domain_suffix}/A'
    };
    var text = {
        dev: '1506-develop',
        test: '1507-test',
        testStable: '1505-stable',
        pre: '2505-pre',
        official: '80-static',
        docker: 'docker'
    };
    var htmlPlugins = [];

    htmlTemplate.map((file)=>{
        var filename = file.split('.')[0];
        var options = {
            template: api.resolve('public') + '/' + file,
            inject: false,
            chunks: [filename],
            minify: false
        };

        Object.keys(scriptServer).forEach((env)=>{
            var server = scriptServer[env];
            
            options.src = server;
            options.title = filename;
            options.filename = path.resolve(`dist/html/${text[env]}/${file}`);
            htmlPlugins.push(new HtmlWebpackPlugin(options));
        });
    });
    api.chainWebpack(webpackConfig => {
    // 通过 webpack-chain 修改 webpack 配置
        webpackConfig.optimization.splitChunks().clear();
        webpackConfig.plugins.delete('named-chunks');
        webpackConfig.resolve.alias.set('vue$', 'vue/dist/vue.esm.js');
        htmlTemplate.forEach(filename => {
            webpackConfig.plugins.delete(`html-${filename.split('.')[0]}`);
            webpackConfig.plugins.delete(`prefetch-${filename.split('.')[0]}`);
            webpackConfig.plugins.delete(`preload-${filename.split('.')[0]}`);
        });
        webpackConfig.plugin('copy').tap(params=>{
            htmlTemplate.forEach(filename => {
                params[0][0].ignore.push(filename);
            });
            return params;
        });
    });
    api.configureWebpack(webpackConfig => {
    // 修改 webpack 配置
    // 或返回通过 webpack-merge 合并的配置对象
        if (process.env.NODE_ENV === 'production'){
            return {
                plugins: htmlPlugins
            };
        }
    });
};
