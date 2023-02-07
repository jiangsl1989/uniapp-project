<template>
	<view class="content">
		页面 - setting
		<view>
			<pageA1></pageA1>
		</view>
	</view>
	
</template>

<script>
	import pageA1 from '@/pagesA/pages/pageA1.vue'
export default {
	components:{pageA1},
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style>
.content {
	text-align: center;
	height: 400upx;
	margin-top: 200upx;
}
</style>