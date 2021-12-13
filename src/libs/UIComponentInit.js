// 其它UI组件库应该在这里集成
function loadVant() {
  const vantLoadPromise = (() => import("vant"))();
  (() => import("vant/lib/index.css"))();
  vantLoadPromise.then((vantModule) => {
    self.globalApp.use(vantModule);
  });
}

function loadAntD() {
  const vantLoadPromise = (() => import("ant-design-vue"))();
  (() => import("ant-design-vue/dist/antd.css"))();
  vantLoadPromise.then((vantModule) => {
    self.globalApp.use(vantModule);
  });
}

loadAntD();
loadVant();
