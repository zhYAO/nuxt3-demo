<template>
  <div class="sku-select">
    <h3>Vue3 SKU 展示模版</h3>
    <div>
      规格：
      <div
        v-for="(item, index) in props.stateType"
        :key="index"
        style="margin: 10px"
      >
        <el-button
          v-for="btn in item"
          :key="btn"
          style="margin: 0 10px"
          :type="isSelected(btn) ? 'primary' : ''"
          :disabled="!isUnDisabled(valueInLabel[btn])"
          @click="onSelTypeClick(btn, valueInLabel[btn], index)"
        >
          {{ btn }}
        </el-button>
      </div>
      可选的SKU：
      <el-button
        v-for="item in props.canUseSku"
        :key="item.skuName"
        style="margin: 0 10px"
      >
        {{ item.skuName }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPrime, PathFinder, descartes } from "./sku-select";

const props = withDefaults(defineProps(), {
  stateType: () => [
    ["男裤", "女裤"],
    ["黑色", "白色"],
    ["S", "L"],
    ["大", "中"],
  ],
  canUseSku: () => [],
});
console.log("prop??s", props);
const selected = ref([]);
const unDisabled = ref([]);
const valueInLabel: any = ref({});
const pathFinder = ref();

watch(
  () => props.stateType,
  (a, b) => {
    console.log("a", a, b);
  },
  {
    deep: true,
  },
);

onMounted(async () => {
  console.log("props", props, props.stateType);
  // const types = props.stateType.flat();
  // const prime = await getPrime(types.length);
  // const reValueInLabel = {};
  // types.forEach((item, index) => {
  //   reValueInLabel[item] = prime[index];
  // });

  // const way = props.stateType.map((i) => {
  //   return i.map(ii => reValueInLabel[ii]);
  // });

  // const sku = descartes(props.stateType).map((item) => {
  //   console.log('it===em',item)
  //   return {
  //     stock: Math.floor(Math.random() * 10) > 5 ? 0 : 1,
  //     skuName: item,
  //     skuPrime: item.map(ii => reValueInLabel[ii]),
  //   };
  // });

  // const reCanUseSku = sku.filter(item => item.stock);
  // pathFinder.value = new PathFinder(way, reCanUseSku.map(item => item.skuPrime));
  // props.canUseSku = reCanUseSku;
  // unDisabled.value = pathFinder.value.getWay().flat();
  // valueInLabel.value = reValueInLabel;
});

const onSelTypeClick = (type, prime, primeIndex) => {
  const index = selected.value.indexOf(type);
  const light = pathFinder.value.light;

  if (index > -1) {
    pathFinder.value.remove(prime);
    selected.value.splice(index, 1);
  } else if (light[primeIndex].includes(2)) {
    const removeType =
      props.stateType[primeIndex][light[primeIndex].indexOf(2)];
    const removePrime = valueInLabel.value[removeType];
    pathFinder.value.remove(removePrime);
    selected.value.splice(selected.value.indexOf(removeType), 1);
    pathFinder.value.add(prime);
    selected.value.push(type);
  } else {
    pathFinder.value.add(prime);
    selected.value.push(type);
  }

  unDisabled.value = pathFinder.value.getWay().flat();
};

const isSelected = (type) => selected.value.includes(type);
const isUnDisabled = (prime) => unDisabled.value.includes(prime);
</script>

<style lang="scss" scoped>
.sku-select {
  // 添加样式
}
</style>
