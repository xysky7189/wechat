<template>
  <div :style="{height: pageHeight, overflow: 'hidden'}">
    <search @search="disableScroll"></search>
    <!-- 焦点图 -->
    <swiper class="banner" indicator-dots indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#fff">
      <swiper-item v-for="banner in bannerList" :key="banner.goods_id">
        <a :href="'/pages/goods/main?id=' + banner.goods_id">
          <image :src="banner.image_src"></image>
        </a>
      </swiper-item>
    </swiper>
    <!-- 导航条 -->
    <div class="navs">
      <a v-for="(nav, key) in navList" :key="key" :href="nav.navigator_url || '/pages/list/main?query=' + nav.name" :open-type="nav.open_type || 'navigate'">
        <image :src="nav.image_src"></image>
      </a>
    </div>
    <!-- 楼层 -->
    <div class="floors">
      <div class="floor" v-for="floor in floorList" :key="floor.floor_title.name">
        <div class="title">
          <image :src="floor.floor_title.image_src"></image>
        </div>
        <div class="items">
          <a :href="'/pages/list/main?query=' + img.name" v-for="(img, key) in floor.product_list" :key="key">
            <image :src="img.image_src"></image>
          </a>
        </div>
      </div>
    </div>
    <span class="gotop" @click="goTop" v-show="scrollTop >= 200"></span>
  </div>
</template>

<script>

  import search from '@/components/search'

  import request from '@/utils/request'

  export default {
    data () {
      return {
        pageHeight: 'auto',
        bannerList: [],
        navList: [],
        floorList: [],
        scrollTop: 0
      }
    },
    components: {
      search
    },
    methods: {
      disableScroll (ev) {
        this.pageHeight = ev.pageHeight + 'px';
      },
      async getBannerList () {
        const { message } = await request({url: '/api/public/v1/home/swiperdata'})
        this.bannerList = message
      },
      async getNavList () {
        const { message } = await request({url: '/api/public/v1/home/catitems'})
        this.navList = message
      },
      async getFloorList () {
        const { message } = await request({url: '/api/public/v1/home/floordata'})
        this.floorList = message
      },
      goTop () {
        mpvue.pageScrollTo({
          scrollTop: 0
        })
      }
    },
    created () {
      this.getBannerList()
      this.getNavList()    
      this.getFloorList()    
    },
    async onPullDownRefresh () {
      await this.getBannerList()
      await this.getNavList()    
      await this.getFloorList()
      mpvue.stopPullDownRefresh()
    },
    onPageScroll (ev) {
      this.scrollTop = ev.scrollTop;
    }
  }
</script>

<style scoped lang="less">

  .banner {
    width: 100%;
    height: 340rpx;

    image {
      width: 100%;
      height: 340rpx;
    }
  }

  .navs {
    display: flex;
    justify-content: space-between;
    padding: 30rpx 44rpx;

    image {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floors {

    .title {
      width: 750rpx;
      height: 60rpx;
      padding-top: 20rpx;
      background-color: #f4f4f4;
    }

    .items {
      padding: 20rpx 16rpx;
      overflow: hidden;

      a {
        width: 232rpx;
        height: 188rpx;
        margin-right: 10rpx;
        margin-bottom: 10rpx;
        float: left;
      }

      a:nth-child(2n+1) {
        margin-right: 0;
      }

      a:first-child {
        height: 386rpx;
        margin-right: 10rpx;
      }
    }
  }
  .gotop {
    position: fixed;
    right: 40rpx;
    bottom: 40rpx;
    width: 80rpx;
    height: 80rpx;
    background-color: pink;
    border-radius: 50%;
  }

</style>
