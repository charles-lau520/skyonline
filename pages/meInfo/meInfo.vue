<template>
	<view class="page page-fill">
		<view class="page-block info-list">
			<!-- 头像 -->
			<view class="item-wapper face-line-upbottom" @click="operator">
				<view class="info-words">头像</view>
				<view class="right-wapper">
					<image :src="globalUser.faceImage" class="face"></image>
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			<view class="line-top">
				<view class="line"></view>
			</view>
			<!-- 昵称 -->
			<view class="item-wapper" @click="modifyNickname">
				<view class="info-words">昵称</view>
				<view class="right-wapper">
					<view class="gray-fields">
						{{globalUser.nickname}}
					</view>
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			<view class="line-top">
				<view class="line"></view>
			</view>
			<!-- 生日 -->
			<view class="item-wapper" @click="modifyBirthday">
				<view class="info-words">生日</view>
				<view class="right-wapper">
					<view class="gray-fields">
						{{globalUser.birthday}}
					</view>
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			<view class="line-top">
				<view class="line"></view>
			</view>
			<!-- 性别 -->
			<view class="item-wapper" @click="modifySex">
				<view class="info-words">性别</view>
				<view class="right-wapper">
					<view class="gray-fields">
						<view v-if="globalUser.sex == 1">男</view>
						<view v-else-if="globalUser.sex == 0">女</view>
						<view v-else>未选择</view>
					</view>
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="footer-wapper">
			<view class="footer-words" @click="cleanStorage">清理缓存</view>
			<view class="footer-words" style="margin-top: 10upx;" @click="logout">退出登录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				globalUser : {}
			}
		},
		// 监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
		onReady:function(){
			var userInfo = this.globaluserinfo("globalUser");
			if(userInfo != null ){
				this.globalUser = userInfo;
			}
		},
		// 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
		onShow:function(){
			var userInfo = this.globaluserinfo("globalUser");
			if(userInfo == null ){
				uni.switchTab({
					url:"../me/me"
				})
			}
		},
		methods: {
			operator:function(){
				
			},
			modifyNickname:function(){
				
			},
			modifyBirthday:function(){
				
			},
			modifySex:function(){
				
			},
			cleanStorage:function(){
				uni.clearStorageSync();
				// 显示消息提示框
				uni.showToast({
					title:"清理缓存成功!",
					mask:false,// 是否显示透明蒙层，防止触摸穿透，默认：false
					duration:1500
				})
			},
			logout:function(){
				var userinfo = this.globaluserinfo("globalUser");
				if(userinfo != null){
					uni.removeStorageSync("globalUser");
					uni.switchTab({
						url:"../me/me"
					})
				}else{
					uni.switchTab({
						url:"../me/me"
					})
				}
			}
			
		}
	}
</script>

<style>
	@import url("meInfo.css");
</style>
