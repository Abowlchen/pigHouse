<template>
<div>
<van-nav-bar
  title="发布房源"
  left-arrow
  @click-left="OnGoBack"
/>
<!-- 轮播图 -->
<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item>1</van-swipe-item>
  <van-swipe-item>2</van-swipe-item>
  <van-swipe-item>3</van-swipe-item>
  <van-swipe-item>4</van-swipe-item>
</van-swipe>
<div class="cenBox">
<!-- 标题 -->
    <van-cell-group class="titleBox">
    <van-cell>
        <template #title>
            <span class="title">单元格</span>
        </template>
        <template #label>
            <van-tag class="tag" type="success">标签</van-tag>
        </template>
    </van-cell>
    </van-cell-group>
<!-- 详细信息 -->
<van-grid :border='false'  :column-num="3" class="titleInfo">
  <van-grid-item >
    <template #icon> <p class="titleP"> <span class="titleSpan">123</span> /月</p> </template>
    <template #text> <span class="titleText">租金</span> </template>
  </van-grid-item>
  <van-grid-item >
    <template #icon> <p class="titleP"> <span class="titleSpan">123</span></p> </template>
    <template #text> <span class="titleText">房型</span> </template>
  </van-grid-item>
  <van-grid-item >
    <template #icon> <p class="titleP"> <span class="titleSpan">123平米</span> </p> </template>
    <template #text> <span class="titleText">面积</span> </template>
  </van-grid-item>
</van-grid>
<van-row type="flex" justify="space-between" class="detailed">
  <van-col span="12">装修: <span></span> </van-col>
  <van-col span="12">朝向: <span></span> </van-col>
  <van-col span="12">楼层: <span></span> </van-col>
  <van-col span="12">类型: <span></span> </van-col>
</van-row>
</div>
<!-- 导航地址 -->
<!-- 房屋配套 -->
 <van-cell title="房屋配置"  />
    <van-checkbox-group class="AllIcon">
        <van-checkbox  class="homeConfig">
            <template #icon >
                <div class="IconBox" >
                    <van-icon name="medal-o"  />
                    <span >111</span>
                </div>
            </template>
        </van-checkbox>
        <van-checkbox  class="homeConfig">
            <template #icon >
                <div class="IconBox" >
                    <van-icon name="medal-o"  />
                    <span >111</span>
                </div>
            </template>
        </van-checkbox>
    </van-checkbox-group>
<!-- 房源概况 -->
</div>
</template>

<script>
export default {
  created () {},
  data () {
    return {}
  },
  methods: {
    // 点击返回时触发
    OnGoBack () {
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
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 252px;
    text-align: center;
    background-color: #39a9ed;
  }
  .cenBox{
    padding: 15px;
      .titleBox{
          border-bottom:1px solid #d7d7d7 ;
          .title{
              display: inline-block;
              margin: 16px 0;
          }
          .tag{
          background-color: #e1f5f8;
          color: #6ad2e9;
          margin-bottom: 15px;
          }
      }
      /deep/.van-cell{
        padding: 0px;
      }
    .titleInfo{
        color:#fa5a44;
        font-size: 14px;
        border-bottom:1px solid #d7d7d7 ;
        .titleP{
            margin: auto;
            .titleSpan{
                font-size: 18px;
                font-weight: 700;
            }
        }
        .titleText{
            margin: unset;
            color: #bfc3cc;
            font-size: 14px;
        }
    }
        .detailed{
            margin-top: 10px;
           /deep/.van-col{
                color: #999;
                font-size: 13px;
                padding-right: 5px;
                margin: 5px 0;
            }
        }
  }

.AllIcon{
    display: flex;
    height: 142px;
    width: 100%;
    flex-wrap: wrap;
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
</style>
