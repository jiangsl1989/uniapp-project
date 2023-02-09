<template>
	<view>
		<view class="set5px">
			<uni-row>
				<uni-col :span="4">
					<view class="setCenter">
						<text>{{text}}</text>
					</view>	
				</uni-col>
				<uni-col :span="20">
					<view class="setCenter">
						<uni-easyinput suffixIcon="map-pin-ellipse" v-model="value" placeholder="选择正确的地址" @iconClick="iconClick"></uni-easyinput>
					</view>
				</uni-col>
			</uni-row>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				value:"",
				text:'地址:',
				nvueWidth: 730
			}
		},
		onLoad() {

		},
		methods: {
			iconClick(){
				
				uni.chooseLocation({
					success:(res)=> {
						console.log("已选择地址",res);
						this.value = res.address + res.name;
						// this.getRegionFn(res);
					},
					fail:()=>{
						// 如果用uni.chooseLocation没有获取到地理位置，则需要获取当前的授权信息，判断是否有地理授权信息
						uni.getSetting({
							success: (res) => {
								console.log(res);
								var status = res.authSetting;
								if(!status['scope.userLocation']){
								// 如果授权信息中没有地理位置的授权，则需要弹窗提示用户需要授权地理信息
									uni.showModal({
										title:"是否授权当前位置",
										content:"需要获取您的地理位置，请确认授权，否则地图功能将无法使用",
										success:(tip)=>{
											if(tip.confirm){
											// 如果用户同意授权地理信息，则打开授权设置页面，判断用户的操作
												uni.openSetting({
													success:(data)=>{
													// 如果用户授权了地理信息在，则提示授权成功
														if(data.authSetting['scope.userLocation']===true){
															uni.showToast({
																title:"授权成功",
																icon:"success",
																duration:1000
															})
															// 授权成功后，然后再次chooseLocation获取信息
															uni.chooseLocation({
																success: (res) => {
																	console.log("详细地址",res);
																	// this.getRegionFn(res);
																}
															})
														}else{
															uni.showToast({
																title:"授权失败",
																icon:"none",
																duration:1000
															})
														}
													}
												})
											}
										}
									})
								}
							},
							fail: (res) => {
								uni.showToast({
									title:"调用授权窗口失败",
									icon:"none",
									duration:1000
								})
							}
						})
					}
				});
				
			}
		}
	}
</script>

<style>
	
	.content {
		height: 400upx;
		margin-top: 200upx;
	}
	
	.set5px {
		padding: 5px;
		text-align: center;
	}
	
	.setCenter {
		  height: 36px;
		  display: flex;
		  flex-direction: column;
		  align-items: center;	//水平居中
		  justify-content: center;	//垂直居中
	}

</style>


