<template>
  <div class="wrapper">
    <!-- 商品图片 -->
    <swiper class="pics" indicator-dots indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#fff">
      <swiper-item v-for="(img, key) in goodsList.pics" :key="key">
        <image :src="img.pics_big"></image>
      </swiper-item>
    </swiper>
    <!-- 基本信息 -->
    <div class="meta">
      <p class="price">￥{{goodsList.goods_price}}</p>
      <p class="name">{{goodsList.goods_name}}</p>
      <p class="shipment">快递: 免运费</p>
      <span class="collect">收藏</span>
    </div>
    <!-- 商品详情 -->
    <div class="detail">
      <rich-text v-html="goodsList.goods_introduce">
      </rich-text>
    </div>
    <!-- 操作 -->
    <div class="action">
      <button open-type="contact">联系客服</button>
      <span class="cart" @click="goCart">购物车</span>
      <span class="add" @click="addCart">加入购物车</span>
      <span class="buy">立即购买</span>
    </div>
  </div>
</template>

<style scoped lang="less">

  .wrapper {
    margin-bottom: 100rpx;
    background-color: #f4f4f4;
  }

  .pics {
    height: 720rpx;
  }
  
  .meta {
    height: 270rpx;
    line-height: 1;
    padding: 30rpx 180rpx 30rpx 20rpx;
    box-sizing: border-box;
    background-color: #fff;
    position: relative;

    .price {
      font-size: 36rpx;
      color: #ea4451;
      margin-bottom: 30rpx;
    }

    .name {
      color: #333;
      line-height: 1.4;
      font-size: 33rpx;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;

    }

    .shipment {
      font-size: 27rpx;
      color: #999;
      position: absolute;
      bottom: 30rpx;
    }

    .collect {
      width: 140rpx;
      height: 88rpx;
      text-align: center;
      padding-top: 50rpx;
      box-sizing: border-box;
      border-left: 1rpx solid #ddd;
      font-size: 22rpx;
      color: #999;

      position: absolute;
      right: 20rpx;
      top: 91rpx;
    }
  }

  .detail image {
    width: 100%;
    height: 480rpx;
    margin-top: 20rpx;
  }

  .action {
    width: 100%;
    height: 98rpx;
    background-color: #fff;

    position: fixed;
    left: 0;
    bottom: 0;

    display: flex;

    span {
      display: block;
    }

    .add, .buy {
      width: 210rpx;
      text-align: center;
      line-height: 98rpx;
      font-size: 27rpx;
      color: #fff;
    }

    .add {
      background-color: #f4b73f;
    }

    .buy {
      background-color: #ea4451;
    }

    button {
      padding: 0;
      border-radius: 0;
      background-color: #fff;

      &::after {
        border: none;
      }
    }

    button, .cart {
      flex: 1;
      line-height: 1;
      color: #989898;
      font-size: 24rpx;
      box-sizing: border-box;
      padding-top: 56rpx;                         
    }
  }

</style>

<script>
  import request from '@/utils/request'
  import delay from '@/utils/delay'
  export default {
    data () {
      return {
        goodsList: []
      }
    },
    methods: {
      goCart () {
        mpvue.switchTab({
          url: '/pages/cart/main'
        })
      },
      async addCart () {
        let carts = mpvue.getStorageSync('carts') || []
        var flag = false
        carts.forEach((val) => {
          if(this.goodsList.goods_id == val.goods_id) {
            flag = true
            return val.goods_number += 1
          }
        })
        if(!flag) {
          carts.push({
            goods_id: this.goodsList.goods_id,
            goods_name: this.goodsList.goods_name,
            goods_price: this.goodsList.goods_price,
            goods_pic: this.goodsList.goods_small_logo,
            goods_number: 1,
            checked: true
          })
        }
        mpvue.setStorageSync('carts', carts)
        mpvue.showToast({title: '加入成功!'});
        await delay(2000)
        mpvue.switchTab({
          url: '/pages/cart/main'
        })
      }
    },
    async onLoad (query) {
      const {message} = await request({
        url: '/api/public/v1/goods/detail',
        data: {
          goods_id: query.id
        }
      })
      this.goodsList = message
    }
  }
</script>