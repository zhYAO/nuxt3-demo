declare namespace SkuSelect {
  interface ICanUseSkuItem {
    stock: number;
    skuName: string[];
  }

  type ICanUseSku = ICanUseSkuItem[];
}
