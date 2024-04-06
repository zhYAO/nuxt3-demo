<template>
  <div class="sku-select">
    <h3>SKU 展示模版</h3>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPrime, PathFinder, descartes } from "./sku-select";

const props = withDefaults(
  defineProps<{
    stateType: string[][];
    canUseSku: SkuSelect.ICanUseSku;
  }>(),
  {
    stateType: () => [],
    canUseSku: () => [],
  },
);

const selected = ref<string[]>([]);
const unDisabled = ref<string[]>([]);
const valueInLabel = ref<any>({});
const pathFinder = ref();

onMounted(async () => {
  const types: string[] = props.stateType.flat();
  const prime = await getPrime(types.length);
  const reValueInLabel: any = {};
  types.forEach((item, index) => {
    reValueInLabel[item] = prime[index];
  });

  const way = props.stateType.map((i) => {
    return i.map((ii) => reValueInLabel[ii]);
  });

  const reCanUseSku: SkuSelect.ICanUseSku = props.canUseSku.filter(
    (item) => item.stock,
  );

  pathFinder.value = new PathFinder(
    way,
    reCanUseSku.map((item) => item.skuName.map((ii) => reValueInLabel[ii])),
  );

  unDisabled.value = pathFinder.value.getWay().flat();
  valueInLabel.value = reValueInLabel;
});

const onSelTypeClick = (type: string, prime: number, primeIndex: number) => {
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

const isSelected = (type: string) => selected.value.includes(type);
const isUnDisabled = (prime: string) => unDisabled.value.includes(prime);
</script>

<style lang="scss" scoped>
.sku-select {
  // 添加样式
}
</style>
