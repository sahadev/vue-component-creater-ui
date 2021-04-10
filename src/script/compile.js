const compiler = require("./compileComponent.js");

const glob = require("glob");
const path = require("path");
const process = require("process");

const componentsPath = path.join(process.cwd(), "src/rawComponents");

console.info(`当前正在读取${componentsPath}中的vue原始组件`);

// options is optional
glob(
  "**/*.vue",
  {
    cwd: componentsPath,
    absolute: true,
    ignore: ['**/element/index.vue', '**/vant/index.vue', '**/iview/index.vue']
  },
  function (er, files) {
    console.info(`正在对${files.length}个文件进行编译...`);
    files.forEach((filePath) => {
      console.info(`正在编译${filePath}`);
      
    });
  }
);