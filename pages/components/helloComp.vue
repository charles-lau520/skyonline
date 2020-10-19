<!--自定义组件-->
<template name="helloComp"> <!--定义组建的名称为helloComp-->
	<view>
		{{msg}}
		<view>
			<input type="text" class="txt" v-bind:value="myval" />
		</view>
		
	</view>
</template>

<script>
	export default {
		//定义组建的名称为helloComp
		name:"helloComp",
		data() {
			return {
				msg:"你好，这是自定义组建～～～"
			};
		},	
		//定义组件内部的属性
		props: {
			//自定义一个变量，用于接受父组件(首页或者其他页面)传入的值
			myval: {
				type : String //定义这个参数的类型
			}
		}
	}
</script>

<style>
	.txt{
		color: #DD524D;
	}
</style>
