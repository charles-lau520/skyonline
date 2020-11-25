<template>
	<view class="page page-fill">
		<view class="header">
			<view v-if="userLogin">
				<image src="../../static/icos/108x108.png" class="face"></image>
			</view>
			<view v-else>
				<image src="../../static/icos/default-face.png" class="face"></image>
			</view>
			<!-- ***************************************** -->
			<view class="info-wapper" v-if="userLogin">
				<view class="nickname">
					{{userinfo.nickname}}
				</view>
				<view class="nav-info">ID:{{userinfo.id}}</view>
			</view>
			<view v-else>
				<!-- <navigator url="../registLogin/registLogin"> -->
				<navigator url="../registLogin/registLogin">
					<view class="nickname regist-login">
						注册/登陆
					</view>
				</navigator>
			</view>
			<!-- **************************************** -->
			<view class="set-wapper" v-if="userLogin">
				<image src="../../static/icos/settings.png" class="settings"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userLogin: false,
				userinfo : {}
			}
		},
		onShow:function(){
			// 用户状态的切换
			var userinfo = uni.getStorageSync("globalUser");
			if(userinfo != null && userinfo != "" && userinfo != undefined){
				this.userLogin = true;
				this.userinfo = userinfo;
			} else {
				this.userLogin = false;
				this.userinfo = {};
			}
		},
		methods: {

		}
	}
</script>

<style>
	@import url("./me.css");
</style>
