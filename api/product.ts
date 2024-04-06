export default () => ({
  getDetailAsync(id: string) {
    return useGet(`/rest/zh_cn/V1/catalog/product/?identifier=${id}`)
  },
})
