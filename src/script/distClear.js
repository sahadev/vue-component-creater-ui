const glob = require("glob");
const file = require("fs");

glob(
  "**/*.js",
  {
    cwd: "./dist/",
    absolute: true,
    ignore: ["**/*.min.*"],
  },
  function (er, files) {
    console.info(`正在清理多余文件...`);
    files.forEach((filePath) => {
      file.rm(filePath, function (er) {});
    });
  }
);
