<template>
	<view class="content">
		页面 - schema
		<view>
			<pagesB1></pagesB1>
		</view>
	</view>
</template>

<script>
	import pagesB1 from '@/pagesB/pages/pagesB1.vue'
export default {
	components:{pagesB1},
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