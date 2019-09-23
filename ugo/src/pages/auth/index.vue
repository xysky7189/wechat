<template>
  <div class="box">
    <button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>
  </div>
</template>

<script>
import getUserInfo from '@/utils/getuserinfo';
import login from '@/utils/login';
import request from '@/utils/request';
import getSetting from '@/utils/getsetting';
export default {
  methods: {
    getUserInfo (res) {
      const {
        encryptedData,
        iv,
        rawData,
        signature
      } = await getUserInfo();
      mpvue.setStorageSync('token', message.token)
      mpvue.navigateBack({delta: 1})
    }
  }
}
</script>

<style lang="less" scoped>
  button {
    width: 600rpx;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%)
  }
</style>
