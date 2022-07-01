<template>
<div>
  <!-- 搜索 -->
    <van-search
        show-action
        placeholder="请输入搜索关键词"
        class="searchTop"
      >
        <template #left>
          <van-icon @click="$router.back()" class="topIcon" name="arrow-left" />
        </template>
        <template #label>
          <span @click="onCity">{{city}}</span>
        </template>
        <template #action>
          <van-icon size="20px" color='#fff' name="flag-o" />
        </template>
    </van-search>
  <!-- 筛选 -->

  <van-tabs v-model="active"  :class="{'tab':isActive === active}"  @click="onShow">
    <van-overlay :show="show"  @click="show = false" >
      <van-tab  title="区域">
        <template v-if="show">
            <van-picker
            v-model="value"
            show-toolbar
            :columns="columns1"
            toolbar-position='bottom'
            @confirm="onConfirm"
          />
        </template>
      </van-tab>
      <van-tab title="方式">
        <template v-if="show">
            <van-picker
            v-model="value"
            show-toolbar
            :columns="columns2"
            toolbar-position='bottom'
            @confirm="onConfirm"
          />
        </template>
      </van-tab>
      <van-tab title="租金">
        <template v-if="show">
            <van-picker
            v-model="value"
            show-toolbar
            :columns="columns3"
            toolbar-position='bottom'
            @confirm="onConfirm"
          />
        </template>
      </van-tab>
      <van-tab title="筛选">
        <template v-if="show">
            <van-popup @click.stop v-model="isShow" position="right" :style="{ height: '100%' }" class="Zindex">
              <div class="popTopBox"></div>
              <!-- 循环 -->
              <p>户型</p>
              <van-checkbox-group v-model="result">
                <van-checkbox :name="item.value" v-for="item in roomTypeInfo" :key="item.value">
                  <template #icon="props" >
                    <span class="checkSpan" :class="{inactive: props.checked}" >{{item.label}}</span>
                  </template>
                </van-checkbox>
              </van-checkbox-group>
              <!-- ！循环 -->
              <!-- 循环 -->
              <p>朝向</p>
              <van-checkbox-group v-model="result">
                <van-checkbox :name="item.value" v-for="item in orientedInfo" :key="item.value">
                  <template #icon="props" >
                    <span class="checkSpan" :class="{inactive: props.checked}" >{{item.label}}</span>
                  </template>
                </van-checkbox>
              </van-checkbox-group>
              <!-- ！循环 -->
              <!-- 循环 -->
              <p>楼层</p>
              <van-checkbox-group v-model="result">
                <van-checkbox :name="item.value" v-for="item in floorInfo" :key="item.value">
                  <template #icon="props" >
                    <span class="checkSpan" :class="{inactive: props.checked}" >{{item.label}}</span>
                  </template>
                </van-checkbox>
              </van-checkbox-group>
              <!-- ！循环 -->
              <!-- 循环 -->
              <p>房屋亮点</p>
              <van-checkbox-group v-model="result">
                <van-checkbox :name="item.value" v-for="item in characteristicInfo" :key="item.value">
                  <template #icon="props" >
                    <span class="checkSpan" :class="{inactive: props.checked}" >{{item.label}}</span>
                  </template>
                </van-checkbox>
              </van-checkbox-group>
              <!-- CHAR|76eb0532-8099-d1f4,FLOOR|1,AREA|88cff55c-aaa4-e2e0,ORIEN|61e99445-e95e-7f37,true -->
              <!-- ！循环 -->
            </van-popup>
              <div class="checkBottomBtn">
                <button class="checkBtnClear" @click.stop="OnClear">清除</button>
                <button class="checkBtnConfirm"  @click="OnIsShow">确定</button>
              </div>
        </template>
      </van-tab>
    </van-overlay>
  </van-tabs>

  <!-- 房屋信息列表 -->
  <van-card
    class="cardList"
    @click="onHomeInfo(item.houseCode)"
    v-for="item in ThisLocalityInfo" :key="item.houseCode"
  >
    <!-- 标题 -->
    <template #title>
      <h3>{{ item.title }}</h3>
    </template>
    <!-- 描述 -->
    <template #desc>
      <p>{{ item.desc }}</p>
    </template>
    <!-- 价格 -->
    <template #price>
      <span class="priSpan">{{ item.price }}</span>元/月
    </template>
    <!-- 图片 -->
    <template #thumb>
      <van-image
        class="thuImg"
        fit="cover"
        :src='`http://liufusong.top:8080${item.houseImg}`'
      />
    </template>
    <!-- 标签 -->
    <template #tags>
      <van-tag plain type="primary" v-for="(tag, index) in item.tags" :key="index">{{ tag }}</van-tag>
    </template>
  </van-card>

</div>
</template>

<script>
import { getThisLocality, getQueryCondition, getHomeSpecific } from '@/api/find'
import { mapState } from 'vuex'
export default {
  name: 'Find',
  created () {
    this.city = this.$store.state.cityName.label ? this.$store.state.cityName.label : '北京'
    this.getThisLocalityInfo() // 获取当前城市的数据
    this.getQueryConditionInfo() // 获取房屋查询条件
  },

  data () {
    return {
      columns1: [], // 区域
      columns2: [], // 方式
      columns3: [], // 租金
      result: [], // 筛选值
      city: '',
      show: false,
      isShow: false,
      value: '',
      active: '',
      isActive: 3,
      Isflag: '',
      ThisLocalityInfo: [], // 当前城市信息
      conditionInfo: [], // 房屋查询条件
      areaInfo: [], // 区域信息  未处理
      priceInfo: [], // 价格信息   未处理
      rentTypeInfo: [], // 方式信息  未处理
      subwayIndfo: [], // 地铁信息  未处理
      roomTypeInfo: [], // 户型
      floorInfo: [], // 楼层
      orientedInfo: [], // 房屋朝向
      characteristicInfo: [], // 房屋亮点
      area: null, // 区域
      subway: null, // 地铁
      price: null, // 价格
      rentType: null, // 方式
      choiceResult: null, // 方式或价格的结果
      ids: ''

    }
  },
  methods: {
    // 点击房屋信息获取房屋id并跳转
    async onHomeInfo (id) {
      this.$router.push('/homeinfo')
      const res = await getHomeSpecific(id)
      console.log(res, '具体信息')
    },
    // 开始请求筛选后的数据
    async getScreenInfo () {
      const { data } = await getThisLocality(this.resultList)
      console.log(data)
      this.ThisLocalityInfo = data.body.list
    },
    // 显示
    onShow () {
      this.show = true
      this.isShow = true
      console.log(111)
    },
    // 清除筛选数据
    OnClear () {
      this.result = []
    },
    // 显示 取数据
    async OnIsShow () {
      this.isShow = false
      this.show = false
      // 取选好的数据
      console.log(this.result)
      this.getScreenInfo()
    },
    // 跳转城市列表
    onCity () {
      this.$router.push('/city')
    },
    // 点击确认显示数据
    onConfirm (value, index) {
      console.log(value, 'onConfirm')
      if (Array.isArray(value)) {
        const va = this.digui(value)
        const a = this.diguivalue(this.columns1, va)
        console.log(a)
        // 判断是区域还是地铁 将a赋值给相应的变量
        if (value[0] === '区域') {
          this.area = a
          this.subway = null
        } else {
          this.subway = a
          this.area = null
        }
      }
      // 判断点击的是 方式 还是 租金 并赋值
      if (this.active === 1) {
        this.rentType = this.choice(this.conditionInfo.rentType, value)
      } else if (this.active === 2) {
        this.price = this.choice(this.conditionInfo.price, value)
      }
      console.log('请求数据')
      this.getScreenInfo()
    },
    // 处理 方式或租金
    choice (arr, val) {
      arr.forEach(item => {
        if (item.label === val) {
          this.choiceResult = item.value
        }
      })
      return this.choiceResult
    },
    // 递归
    digui (value) {
      const val = value.pop()
      if (val !== '' && val !== '不限') {
        return val
      } else {
        const values = []
        values.push(...value)
        const a = this.digui(values)
        return a
      }
    },

    diguivalue (arr, val) {
      arr.forEach(item => {
        if (item.text === val) {
          this.ids = item.value
        } else if (item.children) {
          this.ids = this.diguivalue(item.children, val)
        }
      })
      return this.ids
    },
    // 获取当前城市的数据
    async getThisLocalityInfo () {
      if (this.cityName) {
        const { data } = await getThisLocality({ cityId: this.cityName.value })
        this.ThisLocalityInfo = data.body.list
        console.log(this.ThisLocalityInfo)
      } else {
        const { data } = await getThisLocality({ cityId: 'AREA|88cff55c-aaa4-e2e0' })
        console.log(data)
        this.ThisLocalityInfo = data.body.list
      }
    },
    // 获取房屋查询条件
    async getQueryConditionInfo () {
      if (this.cityName) {
        const res = await getQueryCondition(this.cityName.value)
        this.conditionInfo = res.data.body
        console.log(res)
        console.log(this.conditionInfo, 1)
      } else {
        const res = await getQueryCondition('AREA|88cff55c-aaa4-e2e0')
        this.conditionInfo = res.data.body
        console.log(this.conditionInfo, 2)
      }

      this.changeCondition() // 处理conditionInfo中的信息
    },
    // 处理conditionInfo中的信息
    changeCondition () {
      this.areaInfo = this.conditionInfo.area // 区域
      this.subwayIndfo = this.conditionInfo.subway // 地铁
      this.rentTypeInfo = this.conditionInfo.rentType // 方式
      this.priceInfo = this.conditionInfo.price // 租金

      const strArea = JSON.stringify(this.areaInfo)
      const strSubway = JSON.stringify(this.subwayIndfo)
      const strRemType = JSON.stringify(this.rentTypeInfo)
      const strPriceInfo = JSON.stringify(this.priceInfo)
      const reg1 = /label/gi
      const reg2 = /"不限"/gi
      // 区域
      this.columns1[0] = JSON.parse(strArea.replace(reg1, 'text').replace(reg2, '"不限","children":[{"text":""}]'))
      // 地铁
      this.columns1[1] = JSON.parse(strSubway.replace(reg1, 'text').replace(reg2, '"不限","children":[{"text":""}]'))
      // 方式
      this.changeColumns(strRemType, this.columns2)
      // 租金
      this.changeColumns(strPriceInfo, this.columns3)
    },
    // 处理单列选择
    changeColumns (str, column) {
      const arr = JSON.parse(str.replace(/label/gi, 'text'))
      arr.forEach((item, index) => {
        column[index] = item.text
      })
      this.changeScreen()
    },
    // 处理筛选数据
    changeScreen () {
      this.roomTypeInfo = this.conditionInfo.roomType // 户型
      this.floorInfo = this.conditionInfo.floor // 楼层
      this.orientedInfo = this.conditionInfo.oriented // 房屋朝向
      this.characteristicInfo = this.conditionInfo.characteristic // 房屋亮点
      // console.log(this.roomTypeInfo, '户型')
      // console.log(this.floorInfo, '楼层')
      // console.log(this.orientedInfo, '房屋朝向')
      // console.log(this.characteristicInfo, '房屋亮点')
    }

  },
  computed: {
    ...mapState(['cityName']),
    resultList () {
      return {
        cityId: this.cityName.value,
        area: this.area,
        subway: this.subway,
        price: this.price,
        start: 1,
        end: 20,
        more: this.result,
        rentType: this.rentType
      }
    } // 需要发送的筛选数组
  },
  watch: {},
  filters: {},
  components: { }
}
</script>

<style scoped lang='less'>
.topIcon{
  margin-right: 15px;
  color: #fff;
}
.cenBox{
  height: 40px;
  .van-grid-item{
    height: 100%;
  }
}
.van-tab__pane{
  position: fixed;
  top: 90px;
}
/deep/.van-tabs__nav{
  z-index: 3;
}
/deep/.Zindex{
    z-index: 2004;
    width: 280px;
    padding: 0 15px;
    padding-bottom: 96px;
    p{
      font-size: 15px;
      margin: 20px 0px;
    }
    .van-checkbox-group{
      width: 225px;
      margin-left: 40px;
    }
}
.tab{
  /deep/.van-tabs__nav{
    z-index: 0 !important;
  }
}
/deep/.van-overlay {
 background-color: rgba(0, 0, 0, 0.3);
}
/deep/.van-picker__cancel{
  flex:3;
  border-top: 1px solid #ccc;
}
/deep/.van-picker__confirm{
  flex:7;
  background-color: #1cb676;
  color: #fff;
  border-top: 1px solid #ccc;
}
.van-tabs__line{
  background-color: transparent;
}
.cardList{
  background-color: #fff;

  .van-card__header{
    border-top: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
    .thuImg{
      width: 106px;
      height: 80px;
    }
    .van-card__content{
      flex:2;
      justify-content: space-evenly;
      .van-tag{
        margin-right: 4px;
      }
    }
    .van-card__thumb{
      flex:1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    h3{
    margin: 0;
    font-size: 15px;
    color: #394043;
    }
    p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    margin: 3px 0px;
    }
    .priSpan{
      font-size: 16px;
      width: 400;
    }
  }
}

.checkSpan{
display: inline-block;
  width: 70px;
  height: 32px;
  background-color: #fff;
  border-radius: 5px;
  text-align: center;
  line-height: 33px;
  font-size: 12px;
  color: #a797ba;
  // border:1px solid #ccc;
}
.inactive{
  background-color: #defaef;
  // border: 1px solid #6ed3aa;
}
.checkBottomBtn{
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  width: 310px;
  height: 50px;
  font-size: 18px;
  z-index: 3000;
  .checkBtnClear{
    flex:3;
    background-color: #fff;
    color: #21b97a;
    border: 0;
    border-top: 1px solid #e8e8e8;
  }
  .checkBtnConfirm{
    flex:7;
    background-color: #21b97a;
    color: #fff;
    border: 0;
    border-top: 1px solid #e8e8e8;
  }
}
/deep/.van-checkbox__icon{
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #e8e8e8;
}
.van-checkbox{
  display: inline-block;
  width: 70px;
  height: 32px;
  background-color: #fff;
  border-radius: 5px;
  border:1px solid #ccc;
  text-align: center;
  line-height: 33px;
  font-size: 12px;
  color: #a797ba;
  margin: 0 18px 15px 0;
}
.van-checkbox-group{
  border-bottom:1px solid #ccc;
}
.popTopBox{
  height: 44px;
  width: 20px;
}
</style>
