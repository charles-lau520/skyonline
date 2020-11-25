<template>
	<view>
		<form @submit="formSubmit">
			<view class="face-wapper">
				<image src="../../static/icos/default-face.png" class="face"></image>
			</view>

			<view class="info-wapper">
				<label class="words-lbl">账号</label>
				<input name="username" type="text" value="" class="input" placeholder="请输入用户名" placeholder-class="graywords" />
			</view>

			<view class="info-wapper" style="margin-top: 40upx;">
				<label class="words-lbl">密码</label>
				<input name="password" type="text" value="" password="true" class="input" placeholder="请输入密码" placeholder-class="graywords" />
			</view>

			<button type="primary" form-type="submit" style="margin-top: 60upx;width: 90%;">注册/登录</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				test:"test",
				tempUserinfo : {
					id:"190228AP5CBB7TR4",
					username : "test",
					nickname : "测试用户",
					password : "test",
					mpWxOpenId : "",
					appQqOpenId : "",
					appWxOpenId : "",
					appWeiboUid : "",
					sex : "",
					birthday : "1900-01-01",
					faceImage : "",
					isCertified : 0,
					registTime : "2019-02-28T07:01:02.030+0000",
					userUniqueToken : "4c300288-74e0-4513-835c-c019b9cfc411"
				}
			}
		},
		methods: {
			formSubmit: function(e){
				console.log(e);
				console.log(this.tempUserinfo);
				var username = e.detail.value.username;
				var password = e.detail.value.password;
				console.log(username+":"+password);
				// 由于接口调用失败，临时模拟登陆信息
				if(username != null && username.equals("") && password != null && password.equals("")){
					if(this.tempUserinfo.username.equals(username) && this.tempUserinfo.password.equals(password)){
						// 保存为全局变量
						uni.setStorageSync("globalUser",this.tempUserinfo);
						// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
						// 切换页面跳转，使用tab切换的api 
						uni.switchTab({
							url:"../me/me"
						})
					}else{
						
					}
				}
				/*
				uni.request({
					//main.js挂载的全局属性
					url: this.serverURL + '/user/registOrLogin',
					data:{
						"username":username,
						"password":password,
						"QQ":1004176677
					},
					method: "POST",
					success: (res) => {
						//debugger;
						if (res.data.status == 200) {
							var userinfo = res.data.data;
							//console.log(userinfo)
							// 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
							// 保存用户信息到全局的缓存中
							uni.setStorageSync("globalUser",userinfo);
							// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
							// 切换页面跳转，使用tab切换的api
							uni.switchTab({
								url:"../me/me"
							})
						}
						this.text = 'request success';
					}
				});
				*/
			}
		}
	}
</script>

<style>
	@import url("./registLogin.css");
</style>
