<template>
	<view class="page">
		<view class="search-block">
			<view class="search-icon-wapper">
				<image src="../../static/icos/search.png" class="search-ico"></image>
			</view>
			<input placeholder="搜索预告" maxlength="10" class="search-text" @confirm ="search" />
		</view>
		<view class="movie-list page-block">
			<view class="movie-wapper" v-for="item in searchList">
				<image v-bind:src="item.cover" @click="showTrailer" :data-trailerid = "item.id" class="poster"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchList: [],
				keywords: "", //搜索关键字
				page: 1, //当前页
				totalpages: 1 //总共页数
			}
		},
		onLoad() {
			uni.showLoading({ //显示loading加载
					mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false
					title: "请稍后......"
				}),
				uni.request({
					//main.js挂载的全局属性
					url: this.serverURL + '/search/list?keywords=&page=&pageSize=&qq=1004176677',
					method: "POST",
					success: (res) => {
						//console.log(res.data);
						if (res.data.status == 200) {
							this.searchList = res.data.data.rows;
							console.log(this.searchList)
						}
					},
					//加载完成后自动关闭刷新
					complete() {
						uni.hideLoading(); //加载完毕后隐藏loding加载
					}
				})
		},
		onPageScroll:function(e){
			console.log("监听页面滚动，参数为Object"),
			console.log(e.scrollTop)
		},
		// 页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据
		onReachBottom() {
			// console.log("onReachBottom")
			var page = this.page + 1; //查询下一页面，当前页数累加1
			var keywords = this.keywords;//获得当前页面中data里的搜索值
			var totalpages = this.totalpages;//获得总页数
			//如果当前分页的分页数和总页数相等，就不分页
			if(page > totalpages){
				// console.log("return")
				return;
			}
			this.pageSearchList(keywords,page,15);
		},
		methods: {
			//页面搜索的通用类，可以按关键字搜索显示内容，也可以按页数显示内容
			pageSearchList(keywords, page, pageSize) {
				uni.showLoading({ //显示loading加载
						mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false
						title: "请稍后......"
					}),
					uni.request({
						//main.js挂载的全局属性
						url: this.serverURL + '/search/list?keywords=' + keywords + '&page=' + page + '&pageSize=' + pageSize +
							'&qq=1004176677',
						method: "POST",
						success: (res) => {
							//console.log(res.data);
							if (res.data.status == 200) {
								var templist = res.data.data.rows;
								this.searchList = this.searchList.concat(templist);//拼接数组
								this.totalpages = res.data.data.total; //获取总页数
								this.page = page;//覆盖当前页面的页数
								
								//console.log(this.searchList)
							}
						},
						//加载完成后自动关闭刷新
						complete() {
							uni.hideLoading(); //加载完毕后隐藏loding加载
						}
					})
			},
			search(e) {
				var value = e.detail.value;
				this.keywords = value; //搜索内容文字
				this.searchList = [];  //列表清空
				this.pageSearchList(value,1,15); //调用分页方法

			},
			showTrailer(e){
				var trailerid = e.currentTarget.dataset.trailerid;
				//跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
				// uni.switchTab({
				// 	url:"../me/me"
				// })
				// 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
				// uni.redirectTo(),关闭当前页面，跳转到应用内的某个页面。
				uni.navigateTo({
					url:"../movie/movie?id="+trailerid
				})
				
			}
		}
	}
</script>

<style>
	@import url("search.css");
</style>
