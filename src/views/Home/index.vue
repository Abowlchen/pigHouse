<template>
<div>
     <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
       <van-swipe-item v-for="item in swiperImg" :key="item.id">
          <img :src="`http://liufusong.top:8080${item.imgSrc}`" alt="" class="swiper">
       </van-swipe-item>
     </van-swipe>
  <div class="topBox">
      <van-search
        show-action
        placeholder="请输入搜索关键词"
        background="transparent"
        class="searchTop"
      >
        <template #label>
          <span @click="onCity">{{city}}</span>
        </template>
        <template #action>
          <van-icon size="20px" color='#fff' name="flag-o" />
        </template>
      </van-search>
  </div>
    <van-grid :column-num="4" :border="false">
      <van-grid-item  text="整租" @click="$router.push('/find')">
        <template #icon>
          <span class="iconBgc">
            <van-icon name="wap-home-o" />
          </span>
        </template>
      </van-grid-item>
      <van-grid-item  text="合租" >
        <template #icon>
          <span class="iconBgc">
          <van-icon name="friends-o" />
          </span>
        </template>
      </van-grid-item>
      <van-grid-item  text="地图找房" >
        <template #icon>
          <span class="iconBgc">
            <van-icon name="flag-o" />
          </span>
        </template>
      </van-grid-item>
      <van-grid-item  text="去出租" @click="$router.push('/release')">
        <template #icon>
          <span class="iconBgc">
            <van-icon name="home-o" />
          </span>
        </template>
      </van-grid-item>

  </van-grid>
  <div class="cenBox">
    <div class="title">
      <h5>租房小组</h5>
      <span>更多</span>
    </div>
    <van-row type="flex" justify="space-around">
      <van-card
      :desc="item.desc"
      :title="item.title"
      span='8'
      v-for="item in HomeGroupsInfo" :key="item.id"
    >
    <template #thumb>
      <img class="imgComm" :src="`http://liufusong.top:8080${item.imgSrc}`" alt="" >
    </template>
    </van-card>

    </van-row>

  </div>
</div>
</template>

<script>
import { getswiper } from '@/api/home'
import { getHomeGroups } from '@/api/ctiy'
export default {
  name: 'home',
  created () {
    this.getSwiperImg()
    this.city = this.$store.state.cityName.label ? this.$store.state.cityName.label : '北京'
    this.getHomeGroupsInfo(this.$store.state.cityName.value)
  },
  data () {
    return {
      swiperImg: [],
      city: '',
      HomeGroupsInfo: []
    }
  },
  methods: {
    // 获取轮播图信息
    async getSwiperImg () {
      const { data } = await getswiper()
      this.swiperImg = data.body
      console.log(data)
      console.log(this.swiperImg)
    },
    // 跳转城市列表
    onCity () {
      this.$router.push('/city')
    },
    // 租房小组
    async getHomeGroupsInfo (id) {
      const { data } = await getHomeGroups(id)
      console.log('租房小组')
      console.log(data)
      this.HomeGroupsInfo = data.body
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.swiper{
  width: 100%;
  height: 212px;
}
.topBox{
  position: absolute;
  top: 0;
  width: 100%;
  .van-search__label{
    span{
      padding: 0 15px 0 0;
      border-right: 1px solid #ccc;
    }
  }
  .searchTop{
    width: 100%;
    background-color: transparent;
  }
}
.iconBgc{
  display: inline-block;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #f2fbf7;
  text-align: center;
  line-height: 60px;
  margin-bottom: 7px;
  font-size: 28px;
  color: #00ae66;
}
.cenBox{
  height: 188px;
  background-color: #f6f5f6;
  .title{
    display: flex;
    justify-content: space-between;
    padding: 0 8px;
    h5{
      margin: 15px 0 15px 10px;
      font-size: 15px;
    }
    span{
      font-size: 14px;
      line-height: 50px;
      color: #787d82;
    }
  }
  .van-row{
    display: flex;
    flex-direction: row;
    .van-card{
      height: 60px;
      background-color: #fff;
      margin: 3px;
      min-width: 175px!important;
      .van-card__thumb{
        width: 50px;
        height: 50px;
      }
      .imgComm{
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>
