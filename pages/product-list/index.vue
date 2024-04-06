<template>
  <div class="plp">
    <div class="plp-title">商品列表</div>
    <div class="plp-list">
      <div class="plp-list-item" v-for="item in prodList" :key="item.id">
        <el-card shadow="hover" class="card" @click="handleClick(item)">
          <template #header>{{ item.title }}</template>
          <img :src="item.imgUrl" style="width: 100%" />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
const prodList = [{
  id: '1',
  title: '商品1',
  imgUrl: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
},{
  id: '2',
  title: '商品2',
  imgUrl: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
},{
  id: '3',
  title: '商品3',
  imgUrl: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
}]

const handleClick = (item) => {
    navigateTo(`/product-detail/${item.id}`)
}
</script>

<style scoped lang="scss">
.plp {
  &-list {
    display: flex;
    flex-wrap: wrap;
    &-item {
      width: 33%;
      padding: 20px;
      box-sizing: border-box;
      .card {
        width: 100%;
        cursor: pointer;
      }
    }
  }
}
</style>
