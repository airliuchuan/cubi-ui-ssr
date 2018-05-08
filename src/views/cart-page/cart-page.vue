<template>
  <div class="cart-wrap">
    <cube-index-list
    :data="cartData"
    :navbar="false">
      <cube-index-list-group
        v-for="(group, index) in cartData"
        :key="index"
        :group="group">
        <div slot="header" class="cube-index-list-anchor fixed-header">
          <input type="checkbox" :checked="group.selectCategory" @click="_selectCategory(group.name)">
          <span>{{group.name}}</span>
        </div>
        <cube-index-list-item
          v-for="(item, index) in group.items"
          :key="index"
          :item="item">
          <div class="cart-item-slider">
            <div class="cart-item" @touchstart.capture="touchStart" @touchmove.capture="touchMove" @touchend.capture="touchEnd" data-type="0">
              <div class="cart-item-left" @click="changeItem(item.id)">
                <input type="checkbox" :checked="item.checked" @change="categoryChange" >
              </div>
              <div class="cart-item-middle">
                <img :src="item.image" alt="">
              </div>
              <div class="cart-item-right">
                <h3>{{item.name}}</h3>
                <span>{{item.summary}}</span>
                <div class="pay">
                  <span class="price">{{item.price | price}}</span>
                  <div class="quantity">
                    <span @click="editorCart('minus', item)">—</span>
                    <span class="quantity-num">{{item.quantity}}</span>
                    <span @click="editorCart('add', item)">+</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="cart-del-btn">
              <span>删除</span>
            </div>
          </div>
        </cube-index-list-item>
      </cube-index-list-group>
      <div slot="fixed" class="cube-index-list-fixed cube-index-list-anchor fixed-header" slot-scope="props">
        <input type="checkbox" :checked="props.fixedData.selectCategory" @click="_selectCategory(props.fixedData.name)">
        <span>{{props.fixedData.name}}</span>
      </div>
    </cube-index-list>
    <div class="cart-settlement">
      <div class="settle-left">
        <input type="checkbox" :checked="selectAll" @click="_selectAll">
        <span>全选</span>
      </div>
      <div class="settle-middle">
        <span>合计:</span>
        <span class="settle-price">{{settlePrice | price}}</span>
      </div>
      <div class="settle-right">
        <button @click="">
          <span>结算</span>
          <span>({{settleCount}})</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapState,
  mapMutations,
  mapActions,
  mapGetters
} from 'vuex'
const cartData = [
  {
    'name': '美妆',
    'selectCategory': false,
    'items': [
      {
        'checked': false,
        'id': 1,
        'name': '商品名商品名商品名商品名',
        'summary': '简述简述简述简述简述简述',
        'price': 299,
        'quantity': 1,
        'image': 'http://p5vssvuk7.bkt.clouddn.com/WechatIMG5.jpeg'
      },
      {
        'checked': false,
        id: 8,
        'name': '商品名商品名商品名商品名',
        'summary': '简述简述简述简述简述简述',
        'price': 199,
        'quantity': 1,
        'image': 'http://p5vssvuk7.bkt.clouddn.com/WechatIMG5.jpeg'
      }
    ]
  },
  {
    'name': '私护类',
    'selectCategory': false,
    'items': [
      {
        'checked': false,
        'id': 2,
        'name': '商品名商品名商品名商品名商品名商品名商品名商品名',
        'summary': '简述简述简述简述简述简述',
        'price': 99,
        'quantity': 1,
        'image': 'http://p5vssvuk7.bkt.clouddn.com/WechatIMG5.jpeg'
      },
      {
        'checked': false,
        'id': 3,
        'name': '商品名商品名商品名商品名',
        'summary': '简述简述简述简述简述简述',
        'price': 29,
        'quantity': 1,
        'image': 'http://p5vssvuk7.bkt.clouddn.com/WechatIMG5.jpeg'
      }
    ]
  },
  {
    'name': 'Q+',
    'selectCategory': false,
    'items': [
      {
        'checked': false,
        'id': 4,
        'name': '商品名商品名商品名商品名商品名商品名商品名商品名',
        'summary': '简述简述简述简述简述简述',
        'price': 249,
        'quantity': 1,
        'image': 'http://p5vssvuk7.bkt.clouddn.com/WechatIMG5.jpeg'
      },
      {
        'checked': true,
        'id': 5,
        'name': '商品名商品名商品名商品名',
        'summary': '简述简述简述简述简述简述',
        'price': 90,
        'quantity': 1,
        'image': 'http://p5vssvuk7.bkt.clouddn.com/WechatIMG5.jpeg'
      },
      {
        'checked': false,
        'id': 6,
        'name': '商品名商品名商品名商品名商品名商品名商品名商品名',
        'summary': '简述简述简述简述简述简述',
        'price': 19,
        'quantity': 1,
        'image': 'http://p5vssvuk7.bkt.clouddn.com/WechatIMG5.jpeg'
      },
      {
        'checked': false,
        'id': 7,
        'name': '商品名商品名商品名商品名',
        'summary': '简述简述简述简述简述简述',
        'price': 69,
        'quantity': 1,
        'image': 'http://p5vssvuk7.bkt.clouddn.com/WechatIMG5.jpeg'
      }
    ]
  }
]

export default {
  name: 'cart-page',
  data () {
    return {
      // 滑动删除
      startX: 0,
      slider: 0,
      cartData: cartData, // 商品数据
      selectAll: false, // 是否全选
      settlePrice: 0 // 结算钱数
    }
  },
  computed: {
    ...mapState(['settleCount']),
    ...mapGetters(['getLocalUser'])
  },
  methods: {
    // 滑动开始
    touchStart (e) {
      this.startX = e.touches[0].clientX
    },
    touchMove (e) {
      this.sliderItem = e.currentTarget
      this.slider = e.touches[0].pageX - this.startX
      if (this.slider < 0 && this.slider < -50) {
        this.slider = -50
      } else if (this.slider >= 0) {
        this.slider = 0
      }
      this.sliderItem.style.transform = `translate3d(${this.slider}px, 0, 0)`
    },
    touchEnd (e) {
      if (this.slider <= -25) {
        this.sliderItem.style.transform = `translate3d(-50px, 0, 0)`
      } else {
        this.sliderItem.style.transform = `translate3d(0, 0, 0)`
      }
    },
    ...mapMutations(['doSettleCount']),
    ...mapActions(['userUpdateCount']),
    // 修改数量
    editorCart (editorType, product) {
      if (editorType === 'minus') {
        if (product.quantity <= 1) {
          product.quantity = 1
          return
        }
        product.quantity--
        product.checked = true
      } else {
        if (product.quantity >= 100) {
          product.quantity = 100
          return
        }
        product.quantity++
        product.checked = true
      }
    },
    // 选择分类的所有商品, 修改该分类的selectCategory字段
    _selectCategory (cate) {
      this.cartData.forEach(item => {
        if (item.name === cate) {
          item.selectCategory = !item.selectCategory
          item.items.forEach(_item => {
            _item.checked = item.selectCategory
          })
        }
      })
    },
    // 选择全部, 需要提交一个全选的标识符, 并修改所有项的checked
    _selectAll () {
      this.selectAll = !this.selectAll
      this.cartData.forEach(item => {
        item.selectCategory = this.selectAll
        // console.log(item.selectCategory)
        item.items.forEach(product => {
          product.checked = this.selectAll
          // console.log(product)
        })
      })
      console.log(this.selectAll)
    },
    // 分类全选后, 自动勾选
    categoryChange () {
      // 获取选中分类的列表
      const categoryCheckeds = this.cartData.filter(item => item.selectCategory)
      // console.log(categoryCheckeds)
      this.cartData.forEach(item => {
        // 获取checked为true的商品数组
        const checkeds = item.items.filter(_item => _item.checked === true)
        // console.log(checkeds)
        // 如果商品总数(通过数组的length判断)和checked为true的商品的总是一样判断是否为分类全选
        if (item.items.length === checkeds.length) {
          item.selectCategory = true
        } else {
          item.selectCategory = false
        }
      })
      if (this.cartData.length === categoryCheckeds.length) {
        this.selectAll = true
      } else {
        this.selectAll = false
      }
    },
    // 全选后, 自动勾选, 这里第一次点的时候无法触发input的change事件, 改用watch去监听 -> 这里数据的基本变化都是checked, 所以不会有太大的性能损耗
    changeAll () {
      console.log('allchange')
      const categoryCheckeds = this.cartData.filter(item => item.selectCategory)
      // console.log(categoryCheckeds.length, this.cartData.length)
      if (this.cartData.length === categoryCheckeds.length) {
        this.selectAll = true
      } else {
        this.selectAll = false
      }
    },
    // 更改数据中的checked状态
    changeItem (id) {
      // console.log('changeItem')
      this.cartData.forEach(item => {
        item.items.forEach(_item => {
          if (_item.id === id) {
            _item.checked = !_item.checked
          }
        })
      })
    },
    // 计算总钱数
    settleTotal () {
      // 选中的数组列表
      const checkedItems = []
      let sumPrice = 0
      let sumNum = 0
      this.cartData.forEach(item => {
        // console.log(item.items.filter(_item => _item.checked))
        item.items.filter(_item => _item.checked).forEach(check => {
          checkedItems.push(check)
        })
      })
      // console.log(checkedItems)
      checkedItems.forEach(item => {
        sumPrice += item.price * item.quantity
        sumNum += item.quantity
        // console.log(this.settlePrice)
      })
      this.settlePrice = sumPrice
      this.doSettleCount(sumNum)
      // 这里需要更新user数据的settleCount
      if (sumNum !== this.getLocalUser.settleCount) {
        this.userUpdateCount({
          mobile: this.getLocalUser.mobile,
          settleCount: sumNum
        })
      }

      sumPrice = 0
      sumNum = 0
    }
  },
  watch: {
    cartData: {
      handler () {
        this.changeAll()
        this.settleTotal()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="stylus" scoped>
.cart-item-slider
  position: relative
  .cart-del-btn
    position: absolute
    width: 50px
    height: 100%
    display: flex
    align-items: center
    justify-content: center
    background-color: red
    color: #fff
    top: 0
    right: 0
    z-index: 1
.cart-wrap
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 90px
  .cart-settlement
    position: fixed
    bottom: 50px
    display: flex
    align-items: center
    justify-content: space-between
    width: 100%
    height: 40px
    background: #f2f2f2
    .settle-middle
      font-size: 15px
      flex: 1
      text-align: right
      padding-right: 10px
      .settle-price
        color: red
    .settle-left
      margin-left: 5px
      font-size: 12px
      input, span
        vertical-align: middle
      input
        position: relative
        width: 16px
        height: 16px
        border:1px solid #d1d1d1
        border-radius: 50%
        appearance: none
        margin-right: 5px
        overflow: hidden
        &:checked:before
            color: #ffffff
            background: red
            width: 20px
            height: 20px
            content: "\EA08"
            display: inline-block
            font-family: "weui"
            font-size: 17px
            font-style: normal
            font-variant: normal
            font-weight: normal
            left: 50%
            position: absolute
            text-align: center
            text-decoration: inherit
            text-transform: none
            top: 50%
            transform: translate(-50%, -48%) scale(0.73)
            vertical-align: middle
    .settle-right
      width: 120px
      height: 40px
      button
        width: 100%
        height: 100%
        background: red
        color: #fff
  .cube-index-list-anchor
      padding: 10px 16px 10px 5px;
      line-height: 1;
      font-size: 14px;
      color: #999;
      background: #f7f7f7
  .fixed-header
    display: flex
    width: 100%
    span
      vertical-align: middle
      font-size: 16px
    input
      vertical-align: middle
      position: relative
      width: 16px
      height: 16px
      border:1px solid #d1d1d1
      border-radius: 50%
      appearance: none
      margin-right: 5px
      overflow: hidden
      &:checked:before
          color: #ffffff
          background: red
          width: 20px
          height: 20px
          content: "\EA08"
          display: inline-block
          font-family: "weui"
          font-size: 17px
          font-style: normal
          font-variant: normal
          font-weight: normal
          left: 50%
          position: absolute
          text-align: center
          text-decoration: inherit
          text-transform: none
          top: 50%
          transform: translate(-50%, -48%) scale(0.73)
          vertical-align: middle
  .cart-item
    position: relative
    z-index: 2
    background: #fff
    display: flex
    align-items: center
    padding: 5px 10px 5px 5px
    border-bottom: 1px solid #ccc
    transition: all 0.3s
    .cart-item-left
      height: 80px
      line-height:80px
      input
        position: relative
        appearance: none
        width: 16px
        height: 16px
        border: 1px solid #d1d1d1
        border-radius: 50%
        overflow: hidden
        &:checked:before
          color: #fff
          background: red
          content: "\EA08"
          display: inline-block
          font-family: "weui"
          font-style: normal
          font-weight: normal
          font-size: 16px
          left: 50%
          position: absolute
          text-align: center
          text-decoration: inherit
          text-transform: none
          top: 50%
          transform: translate(-50%, -50%)
          vertical-align: middle
    .cart-item-right
      font-size: 0
      margin-left: 10px
      width: 100%
      >h3
        font-size: 15px
      >span
        font-size: 12px
        color: #999
      .pay
        display: flex
        justify-content: space-between
        .price
          color: #f00
          font-size: 16px
          align-self: flex-end
        .quantity
          font-size: 0
          border: 1px solid #999
          border-radius: 3px
          span
            display: inline-block
            width: 20px
            height: 20px
            font-size: 12px
            line-height: 20px
            vertical-align: middle
            text-align: center
            background-color: #f2f2f2
          .quantity-num
            width: 30px
            border-left: 1px solid #999
            border-right: 1px solid #999
            background-color: #fff
    .cart-item-middle
      width: 80px
      height: 80px
      border: 1px solid #ccc
      margin-left: 5px
      img
        width: 80px
        height: 80px
</style>
