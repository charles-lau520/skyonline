<template name="trailerComp">
	<view class="movie-score-wapper">
		<!-- <image src="../../static/icos/star-yellow.png" class="star-icon"></image>
		<image src="../../static/icos/star-yellow.png" class="star-icon"></image>
		<image src="../../static/icos/star-yellow.png" class="star-icon"></image>
		<image src="../../static/icos/star-yellow.png" class="star-icon"></image>
		<image src="../../static/icos/star-gray.png" class="star-icon"></image>
		<text class="movie-score"></text> -->
		<image v-for="yellow in yellowScore" src="../../static/icos/star-yellow.png" class="star-icon"></image>
		<image v-for="gray in grayScore" src="../../static/icos/star-gray.png" class="star-icon"></image>
		<text class="movie-score" v-if="showNum==1">{{innerscore}}</text>


	</view>
</template>

<script>
	export default {
		//第一步：设置自定义组件名称，方便页面中调用
		name: "trailerComp",
		//组件内部可调用的变量
		data() {
			return {
				yellowScore: 0,
				grayScore: 5
			};
		},
		//第二步：定义与自定义组件传惨的参数
		props: {
			scoreVal: {
				type: String
			},
			innerscore: 0, //定义外部传入的分数
			showNum: 0 //是否需要显示具体的分数，1：显示 0:不显示
		},
		//第三步：生命周期，自定义组件创建完成后被调用的逻辑内容
		created() {
			var tempscore = 0;
			// console.log("innerscore:"+this.innerscore);
			if (this.innerscore != null && this.innerscore != undefined && this.innerscore) {
				tempscore = this.innerscore;
			};
			// console.log("innerscore:"+this.innerscore);
			var yellowScore = parseInt(tempscore / 2);
			var grayScore = 5-yellowScore;
			this.yellowScore = yellowScore;
			this.grayScore = grayScore;
			// console.log(this.yellowScore + ":" +this.grayScore)
		}
	}
</script>

<style>
	.movie-score-wapper {
		display: flex;
		flex-direction: row;
	}

	.star-icon {
		width: 20upx;
		height: 20upx;
		margin-top: 6upx;
	}

	.movie-score {
		font-size: 20upx;
		color: #808080;
		margin-left: 8upx;
	}
</style>
