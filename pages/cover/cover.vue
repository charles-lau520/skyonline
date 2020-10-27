<template>
	<view class="black">
		<image v-bind:src="coverurl" mode="widthFix" class="cover" @longpress="operator"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				coverurl:""

			}
		},
		onLoad(option) {
			var cover = option.cover;
			// console.log("cover:"+cover);
			//通过API修改导航栏的属性
			// uni.setNavigationBarColor({
			// 	frontColor:"#FFFFFF",
			// 	backgroundColor:"#000000"
			// })
			this.coverurl = cover;
		},
		methods: {
			operator(){
				// console.log("operator")
				// console.log(this.serverURL);
				uni.showActionSheet({
				    itemList: ['保存图片到本地', 'B', 'C'],
				    success:(res)=>{
				        // console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						if(res.tapIndex == 0){
							console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
							uni.showLoading({
							    title: '图片保存中......'
							});
							// 在H5中存在跨域问题
							uni.downloadFile({
								url:this.serverURL,
								success:(result)=>{
									// console.log(this.serverURL);
									if(result.statusCode == 200){
										// console.log(result.tempFilePath)
										uni.saveImageToPhotosAlbum({
											filePath:result.tempFilePath,
											success: () => {
												uni.showToast({
													title:'保存成功',
													duration:2000
												})
											},
											complete: () => {
												uni.hideLoading()
											}
										})
									}
								},
								// fail: (result) => {
								// 	// debugger;
								// 	console.log(result.errMsg+":下载失败")
								// },
								// complete:()=>{
								// 	console.log("complete");
								// 	uni.hideLoading()
								// }
							})
						}
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			}
		}
	}
</script>

<style>
.black {
	background-color: #000000;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: fixed;
}
.cover {
	align-self: center;
}
</style>
