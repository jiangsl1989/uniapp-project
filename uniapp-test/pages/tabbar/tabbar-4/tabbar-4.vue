<template>
	<view>
		<view>
			<map :style="{'width':'100%','height':height +'px'}" :latitude="latitude" :longitude="longitude" :markers="markers" :include-points="markers"/>
		</view>
		
		<!-- <view>
			 <uni-search-bar placeholder="请输入内容" v-model="value" bgColor="#EEEEEE" @confirm="search" />
		</view> -->
	</view>
</template>

<script>
	import mapUtils from '@/utils/mapUtils.js'
	import { AMapWX } from '../../../components/gaode/amap-wx.130';
	export default {
		data() {
			return {
				value: '',
				height:100,
				width:100,
				latitude:0,
				longitude:0,
				markers:[{}],
				androidKey:'434414855eda40228059e3c5754ccf07'
			}
		},
		onLoad() {
			this.height = uni.getSystemInfoSync().windowHeight;
			
			this.width = uni.getSystemInfoSync().windowWidth;
			console.log("宽："+this.width+"; 高："+this.height)
			//获取当前位置
			this.getCurrLocation()
		},
		methods: {
			search(res) {
				
			},
			getCurrLocation(){
				uni.getLocation({
					type:'gcj02',
					geocode:true,
					success: (res) => {
						console.log("初始化定位",res)
						this.latitude = res.latitude;
						this.longitude = res.longitude;
						this.markers = [{
							id:1,
							latitude: res.latitude,
							longitude: res.longitude,
							iconPath: '/static/local.png',
							height:20,
							width:20,
							label:{
								content:"当前位置",
							}
						}] 
					
						// uni.openLocation({
						// 	latitude:res.latitude,
						// 	longitude:res.longitude,
						// 	success: (resp) => {
						// 		console.log("当前位置",resp)
						// 	}
						// })
						// var url="https://restapi.amap.com/v3/assistant/inputtips?parameters"
						//     data.key="你申请的key"
						//     return request.request({
						//         url: url,
						//         method: 'GET',
						//         data: data,
						//     })
						
					}
				})
				
			},
			
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}
</style>
