<template>
<div class="componext-login">
    <van-nav-bar
      title="账号登陆"
      left-text="返回"
      left-arrow
    >
    <!--   { pattern:/^[a-z0-9_-]{5,8}$/,message:$toast('用户名格式5-8位的字母和数字'),trigger:'onBlur'}]" -->
    <template #left><van-icon name="arrow-left" @click="$router.back()" /></template></van-nav-bar>
    <!-- 表单 -->
    <van-form @submit="onSubmit">
    <van-field
        v-model="username"
        name="username"
        placeholder="请输入账号"

    />
    <van-field
        v-model="password"
        name="password"
        type="password"
        placeholder="请输入密码"

    />
    <div style="margin: 16px;">
        <van-button  block  native-type="submit" color="#1cb676">登录</van-button>
    </div>
</van-form>
<p class="footText" @click="$router.push('/register')">还没哟账号，去注册~</p>
</div>
</template>

<script>
import { userLogin } from '@/api/user'

export default {
  created () {},
  data () {
    return {
      username: '',
      password: '',
      pattern: /[a-z0-9]{5,8}/

    }
  },
  methods: {
    onSubmit (values) {
      console.log(values)
      if (values.username === '' || values.password === '') {
        this.$toast('请输入账号或密码')
      } else if (!this.pattern.test(values.bank)) {
        return this.$toast('用户名格式5-8位的字母和数字')
      } else {
        this.loginInfo(values)
      }
    },
    async loginInfo (values) {
      const res = await userLogin(values)
      console.log(res)
      this.$store.commit('setToken', res.data.body)
      if (res.data.status !== 200) {
        this.$toast.fail('登陆失败')
      } else {
        this.$router.push('/my')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.componext-login{
    .footText{
        font-size: 12px;
        color: #666666;
        text-align: center;
    }
}
</style>
