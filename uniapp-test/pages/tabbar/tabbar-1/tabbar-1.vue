<template>
	<view>
		<view class="contains">
			<uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" />
		</view>
		<view class="contains">
			<uni-search-bar placeholder="自定义背景色" bgColor="#EEEEEE" @confirm="search" />
		</view>
		<view class="contains">
			<uni-card title="基础卡片" extra="额外信息">
				<text class="uni-body">这是一个基础卡片示例，此示例展示了一个标题加标题额外信息的标准卡片。</text>
			</uni-card>
		</view>
		<view class="contains">
			<button type="primary" @click="getLocation">获取当前位置(小程序,APP不适用)</button>
		</view>
		<view class="contains">
			<input class="in" placeholder="请选择地址..." :value="value"></input>
		</view>
		<view class="contains">
			<button type="primary" @click="getMapLocation0">获取当前位置(高德,小程序+APP)</button>
		</view>
		<view class="contains">
			<input class="in" placeholder="(高德)请选择地址..." :value="value2"></input>
		</view>
		<view class="contains">
			<share-page></share-page>
		</view>
	</view>
</template>

<script>
	import QQMapWX from "@/components/qqmap-wx-jssdk.js"
	import sharePage from '@/pagesA/pages/share-page.vue'
	export default {
		components:{sharePage},
		data() {
			return {
				range: ['2021-02-1', '2021-3-28'],
				title: 'Hello',
				value:"",
				value2:"",
				selectAddr:null,
				formData2:{
					longitude:null,
					latitude:null
				},
				value15: '111'
			};
		},
		onLoad() {},
		methods: {
			getLocation(){
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
			},
			
			getMapLocation0(){
				console.log("点击高德地图")
				var _this = this;
				uni.getLocation({
				    type: 'gcj02',
					geocode:true,
				    success: (res)=>{
						console.log("gd,res",res)
						if(uni.getSystemInfoSync().platform == 'android'){
							uni.chooseLocation({
								latitude: res.latitude,
								longitude: res.longitude,
								success: function(resp) {
									console.log("选择",resp)
									_this.value2 = resp.address + resp.name;
									/**
									 * 逆地理编码
									 * 参考 https://lbs.amap.com/api/webservice/guide/api/georegeo
									 */
									// uni.request({
									// 	url:"https://restapi.amap.com/v3/geocode/regeo",
									// 	method:'get',
									// 	data: {
									// 	  location: resp.longitude + "," + resp.latitude,//位置坐标:格式：location=lng<经度>,lat<纬度>
									// 	  key: '434414855eda40228059e3c5754ccf07',//开发密钥（web服务Key）
									// 	  radius: 0,
									// 	  extensions: 'all',//base，返回基本地址信息；all 时会返回基本地址信息、附近 POI 内容、道路信息以及道路交叉口信息
									// 	  batch: false,
									// 	  roadlevel: 1
									// 	},
									// 	success: function (res) {
									// 		console.log(res,'====');
									// 	  const data = res.data.regeocode;
									// 	  const province = data.addressComponent.province;//省
									// 	  const city = data.addressComponent.city;//市
									// 	  const district = data.addressComponent.district;//区
									// 	  const township = data.addressComponent.township;//街道
									// 	  const address = township + data?.pois[0]?.name + data?.pois[0]?.address;
									// 	  const reasult = {
									// 		  province,
									// 		  city,
									// 		  district,
									// 		  address,
									// 	  }
									// 	  success(reasult);
									// 	},
									// 	error: function (err) {
									// 		uni.$u.toast("服务端错误，请重试");
									// 	}
									
									// })
								},
							})
						}else if(uni.getSystemInfoSync().platform == 'ios'){
							
						}else {
							if(this.formData2.longitude && this.formData2.latitude){
								uni.navigateTo({
									url:"/pages/tabbar/tabbar-1/gd-map?lng="+this.formData2.longitude+"&lat="+this.formData2.latitude
								})
							}else{
								uni.navigateTo({
									url:"/pages/tabbar/tabbar-1/gd-map?lng="+res.longitude+"&lat="+res.latitude
								})
							}
						}
						
				    },
					fail:()=>{
						uni.getSetting({
							success: (res) => {
								console.log(res);
								var status = res.authSetting;
								if(!status['scope.userLocation']){
									uni.showModal({
										title:"是否授权当前位置",
										content:"需要获取您的地理位置，请确认授权，否则地图功能将无法使用",
										success:(tip)=>{
											if(tip.confirm){
												uni.openSetting({
													success:(data)=>{
														if(data.authSetting['scope.userLocation']===true){
															uni.showToast({
																title:"授权成功",
																icon:"success",
																duration:1000
															})
															uni.getLocation({
															    type: 'gcj02',
															    success: (res)=>{
															        console.log('当前位置的经度：' + res.longitude);
															        console.log('当前位置的纬度：' + res.latitude);
																	uni.navigateTo({
																		url:"/pages/tabbar/tabbar-1/gd-map?lng="+res.longitude+"&lat="+res.latitude
																	})
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
								}else{
									uni.getLocation({
									    type: 'gcj02',
									    success: (res)=>{
									        console.log('当前位置的经度：' + res.longitude);
									        console.log('当前位置的纬度：' + res.latitude);
											uni.navigateTo({
												url:"/pages/tabbar/tabbar-1/gd-map?lng="+res.longitude+"&lat="+res.latitude
											})
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
				})
			},

			maskClick(e){
				console.log('maskClick事件:', e);
			},
			
			
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},
		}
	};
</script>

<style>
.content {
	padding: 5px;
	text-align: center;
	height: 400upx;
	margin-top: 20upx;
}

.in {
	padding: 10px;
	border: 1;
	background-color: antiquewhite;
}

</style>
