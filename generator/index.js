module.exports = (api, options) => {
  api.extendPackage({
    scripts: {
      test: 'vue-cli-service test'
    }
  })

  // 复制并用 ejs 渲染 `./template` 内所有的文件
  api.render('./template');
  console.log(options);
}