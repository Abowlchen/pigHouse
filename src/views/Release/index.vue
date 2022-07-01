<template>
<div>
<van-nav-bar
  title="发布房源"
  left-arrow
  @click-left="OnGoBack"
/>

<van-cell-group >
  <van-cell title="房源信息" style="color:#1cb676" />
  <van-cell
     title="小区名称"
     :value="$store.state.CityInfo.communityName? $store.state.CityInfo.communityName: '请输入小区名称'"
     is-link to="/search"/>
  <van-field v-model="money" type="number" placeholder="请输入租金/月" >
    <template #label>租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金</template>
    <template #extra>￥/月</template>
  </van-field>
  <van-field v-model="area" type="number" placeholder="请输入建筑面积" >
    <template #label>建筑面积</template>
    <template #extra>㎡</template>
  </van-field>
  <van-cell  @click="HXshowPopup"  :value="HX ? HX: '请选择'" is-link>
    <template #title>
        户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型
    </template>
  </van-cell>
  <van-cell  @click="LCshowPopup"  :value="LC ? LC: '请选择'" is-link>
    <template #title>
        所在楼层
    </template>
  </van-cell>
  <van-cell   @click="CXshowPopup"  :value="CX ? CX: '请选择'" is-link>
    <template #title>
        朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向
    </template>
  </van-cell>
  <div class="Sbox"></div>
  <van-cell title="房屋标题"  />
  <input type="text" v-model="titleTxt" placeholder="请输入标题" class="inputStyle">
  <div class="Sbox"></div>
  <van-cell title="房屋图像"  />
  <van-uploader
    v-model="fileList"
    class="Unloading"
    multiple :max-count="3"
    :after-read="afterRead"
    ref="file"
     />
  <div class="Sbox"></div>
  <van-cell title="房屋配置"  />
    <van-checkbox-group v-model="result" class="AllIcon">
        <van-checkbox :name="item.label"  v-for="item in supportingInfo" :key="item.value"  class="homeConfig">
            <template #icon="props" >
                <div class="IconBox" :class="{active : props.checked}">
                <van-icon name="medal-o" :class="{active : props.checked}" />
                <span :class="{active : props.checked}">{{ item.label }}</span>
                </div>
            </template>
        </van-checkbox>
    </van-checkbox-group>
  <div></div>
  <div class="bottomBox">
    <van-cell title="房屋描述"  />
    <van-field
        v-model.trim="message"
        rows="2"
        :autosize="{minHeight:128}"
        type="textarea"
        placeholder="请输入房屋描述信息"
        show-word-limit
        />
  </div>
</van-cell-group>
<div class="bottonBtn">
    <button @click="Onclear" class="clear">取消</button>
    <button @click="OnSubmit" class="submit">提交</button>
</div>
<!-- 弹出层 -->
<van-popup v-model="HXShow" position="bottom" :style="{ height: '40%' }" >
    <van-picker
    show-toolbar
    :columns="HXcolumns"
    @confirm="onConfirmHX"
    @cancel="onCancel"
    />
</van-popup>
<van-popup v-model="LCShow" position="bottom" :style="{ height: '40%' }" >
    <van-picker
    show-toolbar
    :columns="LCcolumns"
    @confirm="onConfirmLC"
    @cancel="onCancel"
    />
</van-popup>
<van-popup v-model="CXShow" position="bottom" :style="{ height: '40%' }" >
    <van-picker
    show-toolbar
    :columns="CXcolumns"
    @confirm="onConfirmCX"
    @cancel="onCancel"
    />
</van-popup>
<!-- !弹出层 -->
</div>
</template>

<script>
import { getHousesParams, upLodingImg, setUserHouses } from '@/api/release.js'
export default {
  created () {
    // 获取发布房屋所需条件
    this.getHousesParamsInfo()
  },
  data () {
    return {
      titleTxt: '',
      houseImgList: [], // 处理完成的图像
      fileList: [], // 房屋图像
      money: '', // 租金
      area: '', // 建筑面积
      HXShow: false, // 户型内容
      HXcolumns: [], // 列表
      HX: '',
      HXInfo: '',
      LCShow: false, // 楼层内容
      LCcolumns: [], // 列表
      LC: '',
      LCInfo: '',
      CXShow: false, // 朝向内容
      CXcolumns: [], // 列表
      CX: '',
      CXInfo: '',
      message: '', // 房屋描述
      roomTypeInfo: [], // 户型
      floorInfo: [], // 楼层
      orientedInfo: [], // 房屋朝向
      supportingInfo: [], // 房屋亮点
      allInfo: [], // 获取上传所需的数据
      result: [], // 房屋配置列表
      resultList: '',
      a: null, // 临时
      b: null // 临时存图片数据
    }
  },
  methods: {
    // 发布房源页点击取消时触发
    Onclear () {
      this.$dialog.confirm({
        title: '提示',
        message: '放弃发布房源？'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setcityInfo', '')
          this.$router.back()
        })
        .catch(() => {
          // on cancel
        })
    },
    // 发布房源时触发
    OnSubmit () {
      this.setUserHousesInfo()
    },
    // 点击返回时触发
    OnGoBack () {
      this.$router.back()
    },
    // 户型点击显示
    HXshowPopup () {
      this.HXShow = true
    },
    // 楼层点击显示
    LCshowPopup () {
      this.LCShow = true
    },
    // 朝向点击显示
    CXshowPopup () {
      this.CXShow = true
    },
    // HX确认触发事件
    onConfirmHX (value, index) {
      // 点击后让弹窗缩回去
      this.HXShow = false
      console.log(value)
      // 将值显示在页面上
      this.HX = value
      // 根据value找对应的key值
      this.HXInfo = this.changeCity(this.roomTypeInfo, value)
    },
    // LC确认触发事件
    onConfirmLC (value, index) {
      this.LCShow = false
      console.log(value)
      this.LC = value
      this.LCInfo = this.changeCity(this.floorInfo, value)
    },
    // CX确认触发事件
    onConfirmCX (value, index) {
      this.CXShow = false
      console.log(value)
      this.CX = value
      this.CXInfo = this.changeCity(this.orientedInfo, value)
    },
    // 处理户型楼层朝向信息
    changeCity (arr, val) {
      arr.forEach(item => {
        if (item.label === val) {
          this.a = item.value
        }
      })
      return this.a
    },
    // 弹出框的取消触发事件
    onCancel () {

    },
    // 发布房源
    async setUserHousesInfo () {
      const res = await setUserHouses(this.strData)
      console.log(res, '发布房源请求返回值')
      if (res.data.status === 200) {
        this.$store.commit('setcityInfo', '')
        this.$router.push('find')
      }
    },
    // 上传图片触发
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      const form = new FormData()
      form.append('file', file.file)
      const res = await upLodingImg(form)
      console.log(res, 'res')
      console.log(file, '图片文件')
      this.houseImgList.push(res.data.body[0])
      this.b = this.houseImgList.join('|')
    },
    // 获取房屋上传所需
    async getHousesParamsInfo () {
      const { data } = await getHousesParams()
      this.floorInfo = data.body.floor
      this.orientedInfo = data.body.oriented
      this.roomTypeInfo = data.body.roomType
      this.supportingInfo = data.body.supporting
      console.log(data)

      this.changeColumns(this.floorInfo, this.LCcolumns)
      this.changeColumns(this.orientedInfo, this.CXcolumns)
      this.changeColumns(this.roomTypeInfo, this.HXcolumns)
    },
    // 处理返回房屋上传所需的数据
    changeUploading () {
      this.changeColumns()
    },
    // 处理单列选择
    changeColumns (arr, columnNull) {
      arr.forEach((item, index) => {
        columnNull[index] = item.label
      })
    },
    // 获取查询数据
    async getAreaCommunityInfo () {
      // let res = await getAreaCommunity({})
    }

  },
  computed: {
    strData () {
      return {
        title: this.titleTxt,
        description: this.message,
        houseImg: this.b,
        oriented: this.CXInfo,
        supporting: this.resultList,
        price: this.money,
        roomType: this.HXInfo,
        size: this.area,
        floor: this.LCInfo,
        community: this.$store.state.CityInfo.community
      }
    }
  },
  watch: {
    result (newVal, oldVal) {
      this.resultList = newVal.join('|')
      console.log(this.resultList, newVal)
    },
    deep: true
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.inputStyle{
    border-width: inherit;
    font-size: 14px;
    padding-left: 14px;
}
input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #aab2bd;
    /* placeholder字体大小  */
    font-size: 14px;
}
.Sbox{
    width: 10px;
    height: 15px;
}
.Unloading{
    margin: 10px 0 0 10px;
}
.bottomBox{
    background-color: #f6f5f6;
    padding: 20px 0;
    margin-bottom: 46px;
}
.AllIcon{
    display: flex;
    height: 142px;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-evenly;
    .van-checkbox{
        align-items: unset;
    }
    /deep/.van-checkbox__icon{
    height: 50px;
    min-width: 57px;
    margin: 5px 5px 2px 5px;
    }
}
.homeConfig{
    .IconBox{
    justify-content: center;
    align-items: center;
    display: flex;
    flex-flow: column;
    }
   /deep/ .active{
    color: pink;
        /deep/.van-icon-medal-o:before{
            color: pink !important;
        }
    }
    span{
        font-size:14px;
    }
}
.van-icon{
    color:black;
width: 30px;
height: 30px;
border: 0px;
background-color: transparent;
font-size: 20px;
}
.van-cell__right-icon{
    font-size: 16px;
}
.bottonBtn{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    font-size: 15px;
    color: #fff;
    height: 45px;
    .clear{
        flex:1;
        border: 0;
        background-color: #fff;
        color: #21b97a;
    }
    .submit{
        border: 0;
        flex:1;
        background-color: #21b97a;
    }
}
</style>
