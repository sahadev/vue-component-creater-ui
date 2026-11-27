  <style scoped>.layout {   border: 1px solid #d7dde4;   background: #f5f7f9;   position: relative;   border-radius: 4px;   overflow: hidden; } .layout-logo {   width: 100px;   height: 30px;   background: #5b6270;   border-radius: 3px;   float: left;   position: relative;   top: 15px;   left: 20px; } .layout-nav {   width: 420px;   margin: 0 auto;   margin-right: 20px; }</style>
  <template lc_id="mtiOWDSR7m">
      <div lc_id="mHOww+6KUe">
          <div lc_id="yTTd5+IsZe">
              <div class="demonstration" lc_id="J+E1chI2Z5">Layout 布局:</div>
              <layout lc-mark lc_id="clcjiFcei7">
                  <header lc_id="CXo5I3y7OJ">
                      <menu mode="horizontal" theme="dark" active-name="1" lc_id="UrsP6y3RAG">
                          <div class="layout-logo" lc_id="P+pCb1XPb/"></div>
                          <div class="layout-nav" lc_id="OWnn5NtWH7">
                              <menuitem name="1" lc_id="2o4S+hAi9m">
Item 1                                  <icon type="ios-navigate" lc_id="Cold2CaaAr"></icon>
                              </menuitem>
                              <menuitem name="2" lc_id="r6IVNQ0sS3">
Item 2                                  <icon type="ios-keypad" lc_id="WlGWHEQlpq"></icon>
                              </menuitem>
                              <menuitem name="3" lc_id="BRKu+cqXze">
Item 3                                  <icon type="ios-analytics" lc_id="UHUTuqLclo"></icon>
                              </menuitem>
                              <menuitem name="4" lc_id="czc6+jsF6C">
Item 4                                  <icon type="ios-paper" lc_id="YXvdRW3cuQ"></icon>
                              </menuitem>
                          </div>
                      </menu>
                  </header>
                  <layout lc_id="DCtS7wd9tE">
                      <sider hide-trigger :style="{ background: '#fff' }" lc_id="ObOKTmrvEF">
                          <menu active-name="1-2" theme="light" width="auto" :open-names="['1']" lc_id="4EsFQ/CD4X">
                              <submenu name="1" lc_id="pnJ7BaN9ph">
                                  <template slot="title" lc_id="fZ4J1m2daU">
Item 1                                      <icon type="ios-navigate" lc_id="pb3H/G2WQj"></icon>
                                  </template>
                                  <menuitem name="1-1" lc_id="qsZNwMycKv">Option 1</menuitem>
                                  <menuitem name="1-2" lc_id="iZF1bpyqfR">Option 2</menuitem>
                                  <menuitem name="1-3" lc_id="EIl9NLWGi0">Option 3</menuitem>
                              </submenu>
                              <submenu name="2" lc_id="PwyDFfHfgr">
                                  <template slot="title" lc_id="4r9Pslg27y">
Item 2                                      <icon type="ios-keypad" lc_id="vFIIoKXXgW"></icon>
                                  </template>
                                  <menuitem name="2-1" lc_id="AhWEMADI1w">Option 1</menuitem>
                                  <menuitem name="2-2" lc_id="ptCjMlVHr0">Option 2</menuitem>
                              </submenu>
                              <submenu name="3" lc_id="H2p3hSwPkq">
                                  <template slot="title" lc_id="M32DgPfKcS">
Item 3                                      <icon type="ios-analytics" lc_id="RStCSSoo23"></icon>
                                  </template>
                                  <menuitem name="3-1" lc_id="oGmWjQRZaY">Option 1</menuitem>
                                  <menuitem name="3-2" lc_id="Y5fILu753g">Option 2</menuitem>
                              </submenu>
                          </menu>
                      </sider>
                      <layout :style="{ padding: '0 24px 24px' }" lc_id="GvTQuA8e6I">
                          <breadcrumb :style="{ margin: '24px 0' }" lc_id="EDNdPa38PK">
                              <breadcrumbitem lc_id="Eq01E8/Gbm">Home</breadcrumbitem>
                              <breadcrumbitem lc_id="E7/yVo6wc2">Components</breadcrumbitem>
                              <breadcrumbitem lc_id="lhrP3T4tUx">Layout</breadcrumbitem>
                          </breadcrumb>
                          <content :style="{ padding: '24px', minHeight: '280px', background: '#fff' }" lc_id="CvDwQ89ny8">Content</content>
                      </layout>
                  </layout>
              </layout>
          </div>
      </div>
  </template>
  <script>
export default {
  data() {
    return {};
  },
  methods: {},
};  </script>
