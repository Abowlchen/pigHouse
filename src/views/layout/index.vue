<template>
<div>
    <router-view></router-view>
  <van-tabbar route>
    <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/find" icon="search">找房</van-tabbar-item>
    <van-tabbar-item to="/info" icon="newspaper-o">咨询</van-tabbar-item>
    <van-tabbar-item to="/my" icon="manager-o">我的</van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
export default {
  name: 'Layout',
  created () {},
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-tabbar {
 z-index: -1;
}
</style>
