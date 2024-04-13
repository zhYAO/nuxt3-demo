# Nuxt 3 Minimal Starter

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

**注**：prettierrc的优先级高于eslint。 如果修改了.prettierrc的配置选项，会发现 eslint 和 prettier又冲突了，这是因为vscode插件缓存没有及时更新，重启下vscode即可。

#### .editorconfig - 在不同的编辑器和IDE之间定义和维护一致的编码样式规范
#### .stylelintrc.js - 格式化css规则



TODO
request
跳转url前 拦截 中间件
登录页、弹窗
响应式
* 骨架屏