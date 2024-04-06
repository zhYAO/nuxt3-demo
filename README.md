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

## 注意点

1. setup 执行 useFetch，虽然页面渲染正常，接口请求正常，但是控制台有报错信息：Hydration completed but contains mismatches，表明服务端和客户端渲染 内容不一致。可以通过添加 await 解决。
   或者通过在请求前添加`await nextTick()`。

```
<script lang="ts" setup>
  const fetch = async () => {
    const { data } = await useFetch()
    testData.value = data.value
  };
  await fetch() // 在这里添加 await
</script>
```

2. 服务端不执行 onMounted 内容，如果 onMounted 内需执行 useFetch，应该放在`await nextTick()`之后，否则会返回 null ；
   在 setup 内(onMounted 外)执行 useFetch，服务端和客户端都执行，为了避免渲染时 useFetch 未执行完毕，尽量使用 await 而不是 then 方法。

3. 需要注意 Nuxt3 中 useFetch 的缓存问题
   https://juejin.cn/post/7248118049583824952#heading-0

4. Hydration children mismatch in <div>: server rendered element contains more child nodes than client vdom.
   因服务端和客户端都会请求一次，又因为 useFetch 会缓存请求结果，所以导致第二次请求的值为空，从而导致有这个提示

TODO
request
跳转url前 拦截
登录页、弹窗
响应式
* 尺码颜色选择
* 骨架屏
* 漫游式引导