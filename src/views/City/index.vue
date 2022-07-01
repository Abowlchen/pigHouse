<template>
<div>
<van-nav-bar
  title="城市列表"
  left-arrow
  @click-left="$router.back()"
  fixed
  z-index="999"
/>
<!-- <div style="height:46px;width:10px"></div> -->
<van-index-bar :index-list="indexList" >
<van-index-anchor index="#" >当前城市</van-index-anchor>
    <van-cell :title="cityName ? cityName : '北京'" />
<span v-for="(objs,keys) in resultsCityInfo" :key="objs.value">
  <van-index-anchor :index="keys" >{{keys === '热' ? '热门城市':keys}}</van-index-anchor>
    <van-cell @click="toCity(item)" :title="item" v-for="(item, index1) in objs" :key="index1"/>
</span>

</van-index-bar>
</div>
</template>

<script>
import { getAllCity, getHotCity } from '@/api/ctiy'
import { uniq } from 'lodash'
export default {
  name: 'City',
  created () {
    this.getAllCtiyInfo(1)
    this.getHotCityInfo() // 热门城市
  },
  data () {
    return {
      allCityInfo: [], // 所有城市的信息
      indexList: [], // 索引字符列表
      resultsCityInfo: {}, // 存放最终遍历的信息 以 索引名：city
      hotCityInfo: [],
      newArr: [],
      indexArr: [],
      cityName: this.$store.state.cityName.label

    }
  },
  methods: {
    // 获取所有城市信息
    async getAllCtiyInfo (level) {
      const { data } = await getAllCity(level)
      this.allCityInfo = data.body
      // console.log('所有城市信息')
      // console.log(this.allCityInfo)
      // console.log(data)
      this.changeIndexInfo() // 索引
      this.changeCityInfo() // 所有城市
    },
    // 获取热门城市的信息
    async getHotCityInfo () {
      const { data } = await getHotCity()
      console.log('热门城市---------------------' + Date.now())
      console.log(data.body)
      this.changeHotCityInfo(data.body)
    },
    // 处理索引信息
    changeIndexInfo () {
      this.indexList = this.allCityInfo.map((item, index) => {
        // 将所有的城市的拼音首字母取出并转位大写
        return item.short.charAt(0).toUpperCase()
      })
      console.log('索引字符列表indexList')
      console.log(this.indexList)
      this.indexList = uniq(this.indexList)
      console.log('去重字符串列表')
      console.log(this.indexList)
      // console.log('数组排序获得最终索引信息')
      console.log(this.indexList.sort())
      // 将 #，热门放入索引
      this.indexList.unshift('热')
      console.log('索引信息处理完成' + Date.now())
      // console.log(this.indexList)
    },
    // 处理所有城市信息
    changeCityInfo () {
      // 循环每个索引值，筛选出首字母相同的内容，将其赋值给新数组
      this.indexList.forEach((indexVal) => {
        this.newArr = this.allCityInfo.filter((obj) => {
          return obj.short.charAt(0).toUpperCase() === indexVal
        })
        // console.log('筛选完的内容')
        // console.log(this.newArr)
        // 处理筛选出来的对象将需要的内容取出来 label
        const newArr2 = []
        this.newArr.forEach((obj) => {
          newArr2.push(obj.label)
        })
        console.log(newArr2)
        // 置空准备进入下一轮循环
        this.newArr = []
        // console.log(newArr2)//值已经进来了
        // this.resultsCityInfo.push({ [indexVal]: newArr2 })
        this.resultsCityInfo[indexVal] = newArr2
      })
      this.resultsCityInfo['热'] = this.hotCityInfo
      console.log(this.resultsCityInfo['热'])

      console.log('所有城市信息处理完成' + Date.now())
      // console.log('存着对象的对象')
      // console.log(this.resultsCityInfo)
      this.indexList.unshift('#')
    },
    // 处理热门城市信息
    changeHotCityInfo (objHot) {
      objHot.forEach((item) => {
        console.log(typeof this.resultsCityInfo['热'])
        this.hotCityInfo.push(item.label)
      })
    },
    // 点击城市跳转
    toCity (val) {
      this.allCityInfo.forEach((value) => {
        if (value.label === val) {
          this.$store.commit('setCityName', value)
          return value
        }
      })

      // this.cityName = val
      this.$router.back()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-index-bar__index{
  color: #ccc;

}
/deep/.van-index-anchor--sticky{
  top:46px
}
</style>
