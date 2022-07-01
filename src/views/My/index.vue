<template>
<div>
   <div class="topBox" v-if="getToken">
      <img class="topImage" :src="imgSrc" />
      <div class="user">
        <van-image
        class="userImage"
        round
        :src="imgSrc"
        />
        <span>{{userName}}</span>
        <button @click="exit">退出</button>
      </div>
   </div>
    <div class="topBox" v-else>
      <img class="topImage" src="@/assets/bg.png" />
      <div class="user">
        <van-image
        class="userImage"
        round
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <span>游客</span>
        <button @click="$router.push('/login')">去登陆</button>
      </div>
   </div>
   <div class="centerBox">
    <van-grid :border="false" clickable :column-num="3">
          <van-grid-item icon="star-o" text="我的收藏" />
          <van-grid-item icon="wap-home-o" text="我的出租" />
          <van-grid-item icon="clock-o" text="看房记录" />
          <van-grid-item icon="debit-pay" text="成为房主" />
          <van-grid-item icon="contact" text="个人资料" />
          <van-grid-item icon="service-o" text="联系我们" />
    </van-grid>
   </div>
   <div class="foolBox">
    <img src="@/assets/join.png" class="foolImg">
   </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { userInfo } from '@/api/user.js'
export default {
  name: 'my',
  created () {
    this.getUserInfo()
  },
  data () {
    return {
      imgSrc: '',
      userName: ''
    }
  },
  methods: {
    async getUserInfo () {
      const { data } = await userInfo()
      if (data.status === 200) {
        this.imgSrc = 'http://liufusong.top:8080' + data.body.avatar
        this.userName = data.body.nickname
      }
    },
    exit () {
      this.$store.commit('removeToken')
    }
  },
  computed: {
    ...mapState(['getToken'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.topBox{
    width: 100%;
    height: 300px;
    // background-color: pink;
    position: relative;
    .topImage{
        width: 100%;
        background-size: contain;
    }
    .user{
        position: absolute;
        display: flex;
        bottom: 0;
        left: 27px;
        width: 318px;
        height: 165px;
        background-color: #fff;
        box-shadow: 0px 3.5px 20px 1px #ccc;
        font-size: 12px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      /deep/  .userImage{
            position: absolute;
            top: -35px;
            left: 124px;
            width: 70px;
            height: 70px;
            border-radius: 35px;
            background-color: rgb(17, 192, 246);
        }
        button{
            width: 69px;
            height: 30px;
            color: #fff;
            border-radius: 5px;
            font-size: 13px;
            border: 0px;
            background-color: #21b97a;
            margin-top: 15px;
        }
    }
}
.centerBox{
    margin-top: 14px;
}
.foolBox{
    text-align: center;
    .foolImg{
        width: 345px;
        height: 85px;
        margin-top: 13px;
    }
}
</style>
