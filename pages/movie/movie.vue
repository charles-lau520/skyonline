<template>
	<view class="page">
		<!-- 视频播放 start -->
		<view class="player">
			<video v-bind:src="item.trailer" v-bind:poster="item.poster" controls="true"></video>
		</view>
		<!-- 视频播放 end -->

		<!-- 影片基本信息 start -->
		<view class="movie-info">
			<navigator v-bind:url="'../cover/cover?cover='+item.cover">
				<image v-bind:src="item.cover" class="cover"></image>
			</navigator>
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
			<view class="plots-title">剧情介绍</view>
			<view class="plots-desc">{{item.plotDesc}}</view>
		</view>
		<!-- 剧情介绍 end -->

		<!-- 演职人员 start -->
		<view class="scroll-block">
			<view class="plots-title">演职人员</view>
			<scroll-view scroll-x class="scroll-list">
				<view class="actor-wapper" v-for="(item,staffIndex) in directoryArray">
					<image v-bind:src="item.photo" class="single-image" mode="aspectFill" @click="lookStaffs" :data-staffIndex="staffIndex"></image>
					<view class="actor-name">{{item.name}}</view>
					<view class="actor-role">{{item.actName}}</view>
				</view>
				<view class="actor-wapper" v-for="(item,actorIndex) in actorArray">
					<image v-bind:src="item.photo" class="single-image" mode="aspectFill" @click="lookStaffs" :data-staffIndex="actorIndex + directoryArray.length"></image>
					<view class="actor-name">{{item.name}}</view>
					<view class="actor-role">{{item.actName}}</view>
				</view>
			</scroll-view>
		</view>
		<!-- 演职人员 end -->

		<!-- 剧照 start -->
		<view class="scroll-block">
			<view class="plots-title">剧照</view>
			<scroll-view scroll-x class="scroll-list">
				<image v-for="(item,index) in plotsPicsArray" v-bind:src="item" class="plot-image" mode="aspectFill" @click="lookMe"
				 :data-imgIndex="index"></image>
			</scroll-view>
		</view>
		<!-- 剧照 end -->

	</view>
</template>

<script>
	// 导入自定义组件-第一步
	import trailerComp from "../components/trailer.vue"

	export default {
		data() {
			return {
				item: {},
				plotsPicsArray: [], //剧照列表
				directoryArray: [], //导演列表
				actorArray: [] //演员列表

			}
		},
		onLoad(option) {
			//获取上一个页面传入的值
			var itemid = option.id;

			//通过API修改导航栏的属性
			uni.setNavigationBarColor({
				frontColor: "#FFFFFF",
				backgroundColor: "#000000"
			})

			//获取预告片的详细信息
			uni.request({
				url: this.serverURL + '/search/trailer/' + itemid + '?qq=1004176677',
				method: "POST",
				success: (res) => {
					// console.log(this.serverURL + '/search/trailer/'+itemid+'?qq=1004176677');
					if (res.data.status == 200) {
						this.item = res.data.data;
						// console.log("trailer:"+this.item);
						// console.log(this.item.name+":"+this.item.score)
						this.plotsPicsArray = JSON.parse(this.item.plotPics);
						// console.log(plotsPicsArray);
					}
					this.text = 'request success';
				}
			});

			//获取导演详细信息
			uni.request({
				url: this.serverURL + '/search/staff/' + itemid + '/1?qq=1004176677',
				method: "POST",
				success: (res) => {
					// console.log(this.serverURL + '/search/trailer/'+itemid+'?qq=1004176677');
					if (res.data.status == 200) {
						this.directoryArray = res.data.data;
						// console.log("1:directoryArray:"+this.directoryArray);
					}
					this.text = 'request success';
				}
			});
			//获取演员详细信息
			uni.request({
				url: this.serverURL + '/search/staff/' + itemid + '/2?qq=1004176677',
				method: "POST",
				success: (res) => {
					// console.log(this.serverURL + '/search/trailer/'+itemid+'?qq=1004176677');
					if (res.data.status == 200) {
						this.actorArray = res.data.data;
						// console.log("2:actorArray:"+this.actorArray);
					}
					this.text = 'request success';
				}
			});
			// console.log(option.id)
			/*分享方式一：适用于微信小程序，利用API中转发函数
			注意事项
			"shareAppMessage"表示“发送给朋友”按钮，"shareTimeline"表示“分享到朋友圈”按钮
			显示“分享到朋友圈”按钮时必须同时显示“发送给朋友”按钮，显示“发送给朋友”按钮时则允许不显示“分享到朋友圈”按钮
			*/
			wx.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		//分享方式二：仅仅限于小程序用
		// onShareAppMessage(res) {
		// 	debugger;
		// 	var me = this;
		// 	console.log(me);
		// 	// 如果 from 值是 button，则 target 是触发这次转发事件的 button，否则为 undefined
		// 	if (res.from === 'button') { // 来自页面内分享按钮
		// 		console.log("button");
		// 		console.log(res.target)
		// 	}
		// 	if (res.from === 'menu') { // 来自页面内分享按钮
		// 		console.log("menu");
		// 		console.log(res.from)
		// 	}
		// 	return {
		// 		title: me.item.name,
		// 		path: '../movie/movie?id=' + me.item.id,
		// 	}
		// },
		methods: {
			lookMe(e) {
				var imgIndex = e.currentTarget.dataset.imgindex;
				uni.previewImage({
					urls: this.plotsPicsArray,
					current: this.plotsPicsArray[imgIndex]
				})
			},
			lookStaffs(e) {
				var imgIndex = e.currentTarget.dataset.staffindex;
				// 拼接导演和演员的数组，成为一个新数组
				var newstaffArray = [];
				newstaffArray = newstaffArray.concat(this.directoryArray).concat(this.actorArray);
				var urls = [];
				// console.log(newstaffArray);
				// 获得新数组里对象中的图片地址，并放入到新的地址数组中国
				for (var i = 0; i < newstaffArray.length; i++) {
					urls.push(newstaffArray[i].photo)
				}
				// console.log(urls);
				uni.previewImage({
					urls: urls,
					current: urls[imgIndex]
				})
			}

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
