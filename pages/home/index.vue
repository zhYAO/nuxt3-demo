<template>
  <div class="block text-center">
    <el-carousel height="auto" autoplay>
      <el-carousel-item style="height: 400px">
        <h3 class="small justify-center" text="2xl">1</h3>
      </el-carousel-item>
      <el-carousel-item style="height: 400px">
        <h3 class="small justify-center" text="2xl">2</h3>
      </el-carousel-item>
      <el-carousel-item style="height: 400px">
        <h3 class="small justify-center" text="2xl">3</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.carousel-item {
  color: #475669;
  opacity: 0.75;
  margin: 0;
  text-align: center;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  display: flex;
  align-items: center;
  margin: 0;
  text-align: center;
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
