<template>
  <div class="pdp">
    <el-card
      class="pdp-section"
      body-style="padding: 0; display: flex;"
      shadow="never"
    >
      <div class="carousel">
        <el-carousel height="450px">
          <el-carousel-item v-for="item in 4" :key="item">
            <p class="small justify-center" text="2xl">{{ item }}</p>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="sku">
        <SkuSelect :stateType="stateType" :canUseSku="skuStock" />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();

const id = ref(route.params.id);
const stateType = ref([
  ["男裤", "女裤"],
  ["黑色", "白色"],
  ["S", "L"],
  ["大", "中"],
]);

const skuStock = ref([
  {
    stock: 10,
    skuName: ["男裤", "黑色", "S", "中"],
  },
  {
    stock: 0,
    skuName: ["男裤", "黑色", "L", "中"],
  },
  {
    stock: 1,
    skuName: ["男裤", "白色", "L", "大"],
  },
  {
    stock: 13,
    skuName: ["男裤", "白色", "L", "中"],
  },
  {
    stock: 15,
    skuName: ["女裤", "黑色", "L", "中"],
  },
  {
    stock: 17,
    skuName: ["女裤", "白色", "L", "大"],
  },
  {
    stock: 19,
    skuName: ["女裤", "白色", "L", "中"],
  },
]);
</script>

<style scoped lang="scss">
.pdp {
  display: flex;
  flex-direction: column;
  align-items: center;
  &-section {
    display: flex;
    &-card {
      padding: 0;
    }
    .carousel {
      width: 450px;
      height: 450px;
      .demonstration {
        color: var(--el-text-color-secondary);
      }

      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }

      .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
      }
    }
    .sku {
      width: 450px;
      padding: 60px;
    }
  }
}
</style>
