## Vue+Webpack+ElementUI admin system
a simple admin template based on [vuejs2](http://vuejs.org/) and [element](http://element.eleme.io/#/).
### 强调：必须用webstorm 必须用webstorm 必须用webstorm
先用git命令`git clone git@github.com:qiuguixin/vue-cli-elementui.git`将示例模板下载到本地
### Usage

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli).

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8081
npm run dev

# build for production with minification
npm run build

# install 3 third lib
npm install somelibs

```
### 特性
* 组件化。包括es6、scss支持
* 利用 ElementUI提供的例如照片选择、预览组件等常用组件提高开发效率
* 利用webstorm内置的eslint插件对代码进行检查
* 代码压缩、合并、小图base64、文件名根据文件内容变更而改变最大化缓存利用
* 开发时热加载，在修改`/src/`内的文件后，浏览器自动刷新
* 可配置代理服务器，解决ajax跨域问题

### 如何配置？
1. 如何配置开发服务器端口号？
> 在`/config/index.js`中修改`dev`下`port`的值(默认8081)

2. 如何配置代理服务器以实现跨域？
> 在`/config/index.js`中修改`dev`下`proxyTable`的值
> 详细配置请看 [这里](https://vuejs-templates.github.io/webpack/proxy.html)
```
例如：将任何请求/management代理到http://123.56.131.197:8080/management
'/management': {
        target: 'http://123.56.131.197:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/management': '/management'
        }
      }
  ```

3. webstor需要进行那些配置？
  > 如何支持vue文件？<br>
  setting  -->  plugin 搜索 vue 安装，重启webstorm
  <br><br>
  > 如何在vue文件中使用的是es6语法？<br>
  settings --> languages& frameworks -- > javascript 修改内容区域的javascript language version: ECMAScript 6 即可。
  <br><br>
  > 如何在新建vue文件时自动生成预设模板?<br>
   settings  -->  file and code templates .在内容区域左侧点击vue file，修改对应的`模板内容`即可。(若没有vue file,则点击`+`添加一个vue类型的模板，注意扩展名是vue)
   <br><br>
  > 如何在webstorm中热加载?<br>
   settings  -->   Appearance and Behavir --> systerm settings .将use"safe write"(safe changes to a temporary file first)勾选掉
   <br><br>

   至此，webstorm已经支持vue文件代码高亮，es6和scss、新建自动生成模板、eslint代码风格检查、热加载

4. 模板内容：
    ```
    <template>

    </template>

    <script type="text/ecmascript-6">
      export default {
        data() {
          return {};
        },
        components: {}
      };
    </script>

    <style rel="stylesheet/scss" lang="scss" scoped>

    </style>
    ```
5. 如何进行调试？
> 可以安装Chrome插件 [vue Devtools](https://chrome.google.com/webstore/search/vue?utm_source=chrome-ntp-icon) 在chrome devtools中有一个vue选项，对vue组件进行调试。

6. 自定义模拟假数据太麻烦，怎么办？
> 有一个包叫 [mock.js](http://mockjs.com/examples.html) ,在`/src/mockdata/`下也有对应示例

7. vue语法、vue-router、vue-resource(axios)？
> 参考 <br>
>[vue简略教程(推荐先看着个)](https://github.com/keepfool/vue-tutorials)<br>
[vue官网](https://cn.vuejs.org/v2/guide/) <br>
[vue-router文档](http://router.vuejs.org/zh-cn/)<br>
[vue-resource文档](https://github.com/pagekit/vue-resource)<br>
[axios文档](https://github.com/mzabriskie/axios#handling-errors)<br>
