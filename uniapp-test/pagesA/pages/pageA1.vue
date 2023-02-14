<template>
	<view class="content">
		<text>pageA1 页面</text>
		<view>
			<uni-row>
				<uni-col :span="12">
					<view>
						123
					</view>
				</uni-col>
				<uni-col :span="12">
					<view>
						456
					</view>
				</uni-col>
			</uni-row>
		</view>
	</view>
</template>

<script>
export default {
	name:"pageA1",
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