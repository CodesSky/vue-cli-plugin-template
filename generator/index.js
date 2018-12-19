var fs = require('fs');

module.exports = (api, options) => {
    if (options.fileName){
        const files = fs.readdirSync(api.resolve('public'));
        const htmlFile = files.filter((f) => {
            return f.indexOf('.html') !== -1;
        });
        const pageConfig = {};

        htmlFile.push(options.fileName + '.html');
        api.render({
            './src/router/page-name.js': './template/src/router/page-name.js',
            './src/store/page-name.js': './template/src/store/page-name.js',
            './public/page-name.html': './template/public/page-name.html',
            './src/page/page-name/index.vue': './template/src/page/page-name/index.vue',
            './src/view/page-name/main.js': './template/src/view/page-name/main.js',
            './src/view/page-name/App.vue': './template/src/view/page-name/App.vue',
            './src/index.html': './template/src/index.html'
        }, {fileName: htmlFile,pageName:options.fileName});
        if (options.operation.indexOf('add') !== -1 && !options.isHandle){
            api.render({'./src/page/page-name/component/add.vue': './template/src/page/page-name/component/add.vue'});
        }
        if (options.operation.indexOf('edit') !== -1 && !options.isHandle){
            api.render({'./src/page/page-name/component/edit.vue': './template/src/page/page-name/component/edit.vue'});
        }
        if (options.isHandle){
            api.render({'./src/page/page-name/component/handle.vue': './template/src/page/page-name/component/handle.vue'});
        }
        if (options.operation.indexOf('search') !== -1){
            api.render({'./src/page/page-name/component/search.vue': './template/src/page/page-name/component/search.vue'});
        }
        if (options.operation.indexOf('view') !== -1){
            api.render({'./src/page/page-name/component/view.vue': './template/src/page/page-name/component/view.vue'});
        }
        pageConfig[options.fileName] = `src/view/${options.fileName}/main.js`;
        api.extendPackage({
            vue: {
                pages: pageConfig
            }
        });

        api.onCreateComplete(()=>{
            fs.rename(`${api.resolve('public')}/page-name.html`,
                `${api.resolve('public')}/${options.fileName}.html`); 
            fs.rename(`${api.resolve('src')}/page/page-name`,
                `${api.resolve('src')}/page/${options.fileName}`);   
            fs.rename(`${api.resolve('src')}/view/page-name`,
                `${api.resolve('src')}/view/${options.fileName}`);
            fs.rename(`${api.resolve('src')}/router/page-name.js`,
                `${api.resolve('src')}/router/${options.fileName}.js`);    
            fs.rename(`${api.resolve('src')}/store/page-name.js`,
                `${api.resolve('src')}/store/${options.fileName}.js`);   
        });
    }
};
