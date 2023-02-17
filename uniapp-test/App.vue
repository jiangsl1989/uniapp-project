<script>
export default {
	onLaunch: function() {
		console.log('App Launch');

		//这里设置tabBar的样式，index:下标位置，text:角标信息，不写代表为点(.)
		setTimeout(() => {
			uni.setTabBarBadge({
				index: 1,
				text: '31'
			});
			uni.showTabBarRedDot({
				index: 3
			});
		}, 1000);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
	/*每个页面公共css */ 
	.contains {
		padding: 10px;
	}
	
</style>
