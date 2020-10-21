<template>
	<view class="page">
		<!-- 视频播放 start -->
		<view class="player">
			<video v-bind:src="item.trailer" v-bind:poster="item.poster" controls="true"></video>
		</view>
		<!-- 视频播放 end -->
		
		<!-- 影片基本信息 start -->
		<view class="movie-info">
			<image v-bind:src="item.cover" class="cover"></image>
			<view class="movie-desc">
				<view class="title">{{item.name}}</view>
				<view class="basic-info">{{item.basicInfo}}</view>
				<view class="basic-info">{{item.originalName}}</view>
				<view class="basic-info">{{item.totalTime}}</view>
				<view class="basic-info">{{item.releaseDate}}</view>
				
				<view class="score-block">
					<view class="big-score">
						<view class="score-words">综合评分:</view>
						<view class="movie-score">{{item.score}}</view>
					</view>
					<view class="score-stars">
						<!-- 自定义组件，向组件内传参数 - 第三步 -->
						<block v-if="item.score >= 0">
							<trailerComp v-bind:innerscore="item.score" showNum="0"></trailerComp>
						</block>
						<view class="prise-counts">
							{{item.prisedCounts}}&nbsp;人点赞
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 影片基本信息 end -->
		
		<view class="line-wapper">
			<view class="line"></view>
		</view>
		
		<!-- 剧情介绍 start -->
		<view class="plots-block">
			<view class="plots-title">{{item.name}}</view>
			<view class="plots-desc">{{item.plotDesc}}</view>
			
		</view>
		
		<!-- 剧情介绍 end -->
	</view>
</template>

<script>
	// 导入自定义组件-第一步
	import trailerComp from "../components/trailer.vue"
	
	export default {
		data() {
			return {
				item:{},
				plotsPicsArray : [], //剧照列表
				directoryArray : [], //导演列表
				actorArray : [] //演员列表
				
			}
		},
		onLoad(option) {
			//获取上一个页面传入的值
			var itemid = option.id;
			
			//获取预告片的详细信息
			uni.request({
				url: this.serverURL + '/search/trailer/'+itemid+'?qq=1004176677',
				method: "POST",
				success: (res) => {
					// console.log(this.serverURL + '/search/trailer/'+itemid+'?qq=1004176677');
					if (res.data.status == 200) {
						this.item = res.data.data;
						// console.log("trailer:"+this.item);
						// console.log(this.item.name+":"+this.item.score)
						var plotsPicsArray = JSON.parse(item.plotPics);
						console.log(plotsPicsArray);
					}
					this.text = 'request success';
				}
			});
			
			//获取导演详细信息
			uni.request({
				url: this.serverURL + '/search/staff/'+itemid+'/1?qq=1004176677',
				method: "POST",
				success: (res) => {
					// console.log(this.serverURL + '/search/trailer/'+itemid+'?qq=1004176677');
					if (res.data.status == 200) {
						this.directoryArray = res.data.data;
						console.log("directoryArray:"+this.directoryArray);
					}
					this.text = 'request success';
				}
			});
			//获取演员详细信息
			uni.request({
				url: this.serverURL + '/search/staff/'+itemid+'/2?qq=1004176677',
				method: "POST",
				success: (res) => {
					// console.log(this.serverURL + '/search/trailer/'+itemid+'?qq=1004176677');
					if (res.data.status == 200) {
						this.actorArray = res.data.data;
						console.log("actorArray:"+this.actorArray);
					}
					this.text = 'request success';
				}
			});
			// console.log(option.id)
		},
		methods: {
			
		},
		//自定义组件-将自定义组件加入进来-第二步
		components: {
			trailerComp
		}
	}
</script>

<style>
	@import url("movie.css");
</style>
