<template>
<div>
<form action="/">
  <van-search
    v-model="value"
    show-action
    placeholder="请输入小区或地址"
    @search="onSearch"
    @cancel="$router.back()"
  />
  <van-cell clickable :title="item.communityName"  size="large" v-for="(item, index) in allCommunity" :key="index" @click="onCityInfo(item)"/>
</form>
</div>
</template>

<script>
import { getAreaCommunity } from '@/api/release'
export default {
  created () {},
  data () {
    return {
      value: '',
      allCommunity: [],
      allCity: []
    }
  },
  methods: {
    // 点击选项返回的数据
    onCityInfo (obj) {
      this.$store.commit('setcityInfo', obj)
      console.log('数据写入')
      this.$router.back()
    },
    // 敲下键盘发起请求
    onSearch (val) {
      console.log(val)
      this.getAreaCommunityInfo()
    },
    // 发起小区关键查询请求
    async getAreaCommunityInfo () {
      const { data } = await getAreaCommunity(this.city)
      this.allCity = data.body
      this.screenArr(this.allCity)
      console.log(data)
    },
    // 遍历筛选
    screenArr (arr) {
      arr.forEach(item => {
        const a = {
          communityName: item.communityName,
          community: item.community
        }
        this.allCommunity.push(a)
      })
    }
  },
  computed: {
    city () {
      return {
        name: this.value,
        id: this.$store.state.cityName.value
      }
    }
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>

</style>
