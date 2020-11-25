<template>
	<view class="page">
		<!-- 轮播图 start -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :vertical="true" class="carousel">
			<swiper-item v-for="item in courselist">
				<navigator open-type="navigate" v-bind:url="'../movie/movie?id='+item.movieId">
					<image v-bind:src="item.image" class="carousel"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 轮播图 end -->

		<!-- 热门超英 start -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/icos/hot.png" class="hot-ico"></image>
				<view class="hot-title">
					热门超英
				</view>
			</view>
		</view>
		<scroll-view scroll-x="true" class="page-block hot">
			<!--渲染数据-->
			<view class="single-poster" v-for="item in hotSuperHeroList">
				<view class="poster-wapper">
					<navigator open-type="navigate" v-bind:url="'../movie/movie?id='+item.id">
						<image class="poster" v-bind:src="item.cover"></image>
					</navigator>
					
					<view class="movie-name">
						{{item.name}}
					</view>
					<!-- 自定义组件，向组件内传参数 -->
					<trailerComp v-bind:innerscore="item.score" showNum="1"></trailerComp>
				</view>
			</view>

		</scroll-view>
		<!-- 热门超英 end -->
		<!-- 热门预告 start -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/icos/interest.png" class="hot-ico"></image>
				<view class="hot-title">
					热门预告
				</view>
			</view>
			<!--渲染数据-->
			<view class="hot-movies page-block">
				<video v-bind:id="item.id" :data-playingindex="item.id" @play="myIsPlaying"
				v-for="item in hotTrailerList" v-bind:src="item.trailer" 
				v-bind:poster="item.poster" class="hot-movies-single">
				</video>
			</view>
		</view>

		<!-- 热门预告 end -->

		<!-- 猜你喜欢 start -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/icos/guess-u-like.png" class="hot-ico"></image>
				<view class="hot-title">
					猜你喜欢
				</view>
			</view>
		</view>
		<view class="page-block guess-u-like">
			<view class="single-like-movie" v-for="(item,gIndex) in guessULikeList">
				<navigator open-type="navigate" v-bind:url="'../movie/movie?id='+item.id">
					<image class="like-movie" v-bind:src="item.cover"></image>
				</navigator>
				<!-- 内容文字 start -->
				<view class="movie-desc">
					<view class="movie-title">
						{{item.name}}
					</view>
					<!-- 自定义组件，向组件内传参数-->
					<trailerComp v-bind:innerscore="item.score" showNum="0"></trailerComp>
					<view class="movie-info">
						{{item.basicInfo}}
					</view>
					<view class="movie-info">
						{{item.originalName}}
					</view>
				</view>
				<!-- 内容文字 end-->
				<!-- 点赞 ":data-" 获取自定义属性 -->
				<view class="movie-oper" :data-gindexvalue="gIndex" @click="praiseMe">
					<image src="../../static/icos/praise.png" class="praise-ico"></image>
					<view class="praise-me">
						点赞
					</view>
					<view v-bind:animation="animationDataArr[gIndex]" class="praise-me animation-opacity">
						+1
					</view>
				</view>
			</view>
		</view>
		<!-- 猜你喜欢 end -->
	</view>
</template>

<script>
	//导入自定义组件--第一步
	import helloComp from "../components/helloComp.vue"
	import trailerComp from "../components/trailer.vue"
	//第一种方法是新建一个公共js，存放全局变量
	//import common from "../common/common.js";
	//第二种种方式在main.js挂载全局属性
	export default {
		data() {
			return {
				courselist: [],
				test: "",
				hotSuperHeroList: [], //热门超英
				hotTrailerList: [], //热门预告片
				guessULikeList: [], //猜你喜欢
				animationData: {},
				animationDataArr: [{}, {}, {}, {}, {}],
				videoContext : ""

			}
		},
		onHide:function(){
			if(this.videoContext != null){
				console.log(this.videoContext);
				this.videoContext.pause();
			}
		},
		onUnload() {
			//页面卸载的时候清除动画数据
			this.animationData = {},
			animationDataArr = [{}, {}, {}, {}, {}]
		},
		//仅对猜你喜欢栏目进行刷新
		onPullDownRefresh() {
			this.refresh()
		},
		onLoad() {
			// 在页面创建的时候，创建一个临时动画对象
			// #ifdef APP-PLUS || MP-WEIXIN
			this.animation = uni.createAnimation({
				duration: 400
			});
			// #endif

			//第一种获取common.js里服务器地址的全局变量
			//var serverURL = common.serverURL;

			//如果使用funciton块函数，因为作用域的关系，courselist在success方法里不能调用，可以用以下方式实现。
			// var me = this;
			// uni.request({
			// 	url: 'https://www.imovietrailer.com/superhero/index/carousel/list?qq=771454547',
			// 	method: "POST",
			// 	success: function(res) {
			// 		console.log(res.data);
			// 		if (res.data.status == 200) {
			// 			me.courselist = res.data.data;
			// 			console.log(me.courselist)
			// 		}
			// 		me.text = 'request success';
			// 	}
			// })
	//********使用箭头函数不需要提前定义this对象。
			uni.request({
				//第一种方式调取全局属性
				//url:  serverURL + '/index/carousel/list?qq=1004176677',
				//第二种方式main.js挂载的全局属性
				url: this.serverURL + '/index/carousel/list?qq=1004176677',
				method: "POST",
				success: (res) => {
					//console.log(res.data);
					if (res.data.status == 200) {
						this.courselist = res.data.data;
						//console.log(this.courselist)
					}
					this.text = 'request success';
				}
			});
			// 热门超英
			uni.request({
				//第一种方式调取全局属性
				//url:  serverURL + '/index/carousel/list?qq=1004176677',
				//第二种方式main.js挂载的全局属性
				url: this.serverURL + '/index/movie/hot?qq=1004176677&type=superhero',
				method: "POST",
				success: (res) => {
					//console.log(res.data);
					if (res.data.status == 200) {
						this.hotSuperHeroList = res.data.data;
						//console.log(this.courselist)
					}
					this.text = 'request success';
				}
			});
			//热门预告片
			uni.request({
				//第一种方式调取全局属性
				//url:  serverURL + '/index/carousel/list?qq=1004176677',
				//第二种方式main.js挂载的全局属性
				url: this.serverURL + '/index/movie/hot?qq=1004176677&type=trailer',
				method: "POST",
				success: (res) => {
					//console.log(res.data);
					if (res.data.status == 200) {
						this.hotTrailerList = res.data.data;
						//console.log(this.hotTrailerList)
					}
					this.text = 'request success';
				}
			});
			this.refresh();
		},
		methods: {
			// 视频控制，播放一个视频的时候，需要暂停其他正在播放的视频
			myIsPlaying: function(e){
				var id = "";
				if(e!=null){
					id = e.currentTarget.dataset.playingindex;
					this.videoContext = uni.createVideoContext(id);
				}
				var hotTrailerList = this.hotTrailerList;
				for (var i = 0;i < hotTrailerList.length;i++) {
					var tempid = hotTrailerList[i].id;
					if(tempid != id){
						uni.createVideoContext(tempid).pause();
					}
				}
				// console.log("meIsplaying:"+id);
				// console.log(this.courselist);
				
			},
			refresh() {
				//猜你喜欢
				uni.showLoading({ //显示loading加载
						mask: true //是否显示透明蒙层，防止触摸穿透，默认：false
					}),
					uni.request({
						//main.js挂载的全局属性
						url: this.serverURL + '/index/guessULike?qq=1004176677',
						method: "POST",
						success: (res) => {
							//console.log(res.data);
							if (res.data.status == 200) {
								this.guessULikeList = res.data.data;
								//console.log(this.guessULikeList)
							}
							this.text = 'request success';
						},
						//加载完成后自动关闭刷新
						complete: () => {
							uni.hideLoading(); //加载完毕后隐藏loding加载
							uni.stopPullDownRefresh();
						}
					});
				//index/guessULike
			},
			//实现点赞动画效果
			praiseMe: function(value) {
				// #ifdef APP-PLUS || MP-WEIXIN
				var gindexvalue = value.currentTarget.dataset.gindexvalue;
				console.log(gindexvalue);

				//return;
				// 构建动画数据，并且通过step来表示这组动画的完成
				this.animation.translateY(-60).opacity(1).step();
				// 导出动画数据view组件，实现组件的动画效果
				this.animationData = this.animation;
				this.animationDataArr[gindexvalue] = this.animationData.export();
				//还原动画
				setTimeout(function() {
					this.animation.translateY(0).opacity(0).step();
					this.animationData = this.animation;
					this.animationDataArr[gindexvalue] = this.animationData.export();
				}.bind(this), 500)
				// #endif
			},


		},
		//自定义组件-注册自定义组件-第二步
		components: {
			helloComp,
			trailerComp
		}
	}
</script>

<style>
	@import url("index.css");
</style>
