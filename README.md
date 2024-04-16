# Nuxt 3 Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

# 目录说明
### pages
  * Nuxt的路由基于vue-router，根据pages/目录中创建的每个组件的文件名生成路由
    * 文件系统路由使用命名约定来创建动态和嵌套路由
    ```
    | pages/
    ---| about.vue
    ---| index.vue
    ---| product-detail/
    -----| [id].vue

    ======

    {
      "routes": [
        {
          "path": "/about",
          "component": "pages/about.vue"
        },
        {
          "path": "/",
          "component": "pages/index.vue"
        },
        {
          "path": "/product-detail/:id",
          "component": "pages/product-detail/[id].vue"
        }
      ]
    }
    ```
    * 路由参数
    ```
      <script setup lang="ts">
      const route = useRoute()

      // 当访问/posts/1时，route.params.id将为1
      console.log(route.params.id)
      </script>

    ```

### components
  * 约定式路由，无需手动引入，直接使用

### layouts
  * 布局是页面的包装器，包含了多个页面的共同用户界面，如页眉和页脚。布局是使用 <slot /> 组件来显示页面内容的 Vue 文件。layouts/default.vue 文件将被默认使用。自定义布局可以作为页面元数据的一部分进行设置。
  * https://nuxt.com.cn/docs/guide/directory-structure/layouts
```
  -| layouts/
  ---| default.vue
  ---| custom.vue

  <script setup lang="ts">
    definePageMeta({
      layout: 'custom'
    })
  </script>
```

### middleware
  * 路由中间件
  * 有三种类型的路由中间件：
    * 匿名（或内联）路由中间件，直接在使用它们的页面中定义。
    * 命名路由中间件，放置在middleware/目录中，当在页面中使用时，会通过异步导入自动加载。（注意：路由中间件名称会转换为短横线分隔命名，因此someMiddleware会变成some-middleware。）
    * 全局路由中间件，放置在middleware/目录中（使用.global后缀），将在每次路由更改时自动运行。

### composables
  * hooks文件夹，自动导入文件无需手动引入
  * hooks文档 https://nuxt.com.cn/docs/api/composables/use-app-config

# 规范

## eslint
### 规则 
eslint规则说明：https://www.wenjiangs.com/docs/eslint
  * vue规则：https://eslint.vuejs.org/rules/
### 文件说明
#### .eslintrc.js - eslint 规则配置
#### .eslintignore - 忽略特定的文件和目录
#### .prettierrc.js - 代码格式规则
#### .prettierignore - 忽略不想格式化的文件
#### .editorconfig - 在不同的编辑器和IDE之间定义和维护一致的编码样式规范
#### .stylelintrc.js - 格式化css规则

# 组件
  ### 多规格选择 SkuSelect
  ![替代文字](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad5fc81d76af4f8f8d587137ce60babb~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp "示例")

  ![替代文字](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ebef0fe0c67494e990198f9c3a86e3a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp "组件步骤")
