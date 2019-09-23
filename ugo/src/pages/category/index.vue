<template>
  <div>
    <!-- 搜索 -->
    <search></search>
    <!-- 分类 -->
    <div class="category">
      <!-- 顶级分类 -->
      <ul class="sup">
        <scroll-view scroll-y>
          <li @click="changeIndex(index)" :class="index == categoryIndex ? 'active' : ''" v-for="(top, index) in categoryList" :key="top.cat_id">{{top.cat_name}}</li>
        </scroll-view>
      </ul>
      <!-- 子级分类 -->
      <div class="sub">
        <scroll-view scroll-y>
          <!-- 封面图 -->
          <image src="/static/uploads/category.png" class="thumb"></image>
          <div class="children" v-for="(middle, index) in childrenCategory" :key="index">
            <div class="title">{{middle.cat_name}}</div>
            <!-- 品牌 -->
            <div class="brands">
              <navigator url="" v-for="(bottom, bIndex) in middle.children" :key="bIndex">
                <image :src="bottom.cat_icon"></image>
                <span>{{bottom.cat_name}}</span>
              </navigator>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">

  scroll-view {
    height: 100%;
  }

  .category {
    display: flex;
    width: 100%;
    position: absolute;
    top: 100rpx;
    bottom: 0;

    .sup {
      width: 196rpx;
      background-color: #f4f4f4;

      li {
        height: 100rpx;
        text-align: center;
        line-height: 100rpx;
        font-size: 27rpx;
        color: #333;
        border-bottom: 1rpx solid #eee;

        &:last-child {
          border-bottom: none;
        }
        
        &.active {
          background-color: #FFF;
          color: #ea4451;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 8rpx;
            height: 60rpx;
            transform: translateY(-50%);
            background-color: #ea4451;

            position: absolute;
            left: 0;
            top: 50%;
          }
        }
      }
    }

    .sub {
      flex: 1;
      padding: 20rpx 18rpx;

      .thumb {
        width: 100%;
        height: 180rpx;
      }

      .children {
        text-align: center;
        color: #333;

        .title {
          display: inline-block;
          margin: 40rpx 0 20rpx;
          font-size: 30rpx;

          &::before {
            content: '/';
            margin-right: 20rpx;
            color: #666;
          }

          &::after {
            content: '/';
            margin-left: 20rpx;
            color: #666;
          }
        }
      }

      .brands {
        display: flex;
        flex-wrap: wrap;

        navigator {
          width: 33%;
          margin-bottom: 20rpx;
        }

        image {
          width: 120rpx;
          height: 120rpx;
        }

        span {
          display: block;
          font-size: 24rpx;
        }
      }
    }
  }
</style>

<script>

  import search from '@/components/search';
  import request from '@/utils/request'

  export default {
    data () {
      return {
        categoryList: [],
        categoryIndex: 0
      }
    },
    computed: {
      childrenCategory () {
        return this.categoryList.length && this.categoryList[this.categoryIndex].children
      }
    },
    components: {
      search
    },
    methods: {
      async getCategoryList () {
        const { message } = await request({
          url: '/api/public/v1/categories'
        })
        this.categoryList = message
      },
      changeIndex (index) {
        this.categoryIndex = index
      }
    },
    created () {
      this.getCategoryList()
    }
  }
</script>