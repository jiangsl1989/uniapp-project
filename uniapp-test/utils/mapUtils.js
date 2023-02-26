function getMapLocationApp(){
	console.log("点击高德地图")
	// var _this = this;
	uni.getLocation({
		type: 'gcj02',
		geocode:true,
		success: (res)=>{
			console.log("gd,res",res)
			console.log("设备",uni.getSystemInfoSync())
			
			if(uni.getSystemInfoSync().uniPlatform == 'app'){
				
				if(uni.getSystemInfoSync().platform == 'android'){
					//android
					uni.chooseLocation({
						latitude: res.latitude,
						longitude: res.longitude,
						success: function(resp) {
							console.log("选择",resp)
							// prevPage.$vm.latitude = resp.latitude
							// prevPage.$vm.longitude = resp.longitude
							// _this.value2 = resp.address + resp.name;
							// return resp;
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
						fail: (error) => {
							console.log("查询失败",error)
						}
					})
				}else {
					//ios
				}
				
			}else if(uni.getSystemInfoSync().uniPlatform == 'mp-weixin'){
				if(this.formData2.longitude && this.formData2.latitude){
					uni.navigateTo({
						url:"/utils/gd-map?lng="+this.formData2.longitude+"&lat="+this.formData2.latitude
					})
				}else{
					uni.navigateTo({
						url:"/utils/gd-map?lng="+res.longitude+"&lat="+res.latitude
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
}

module.exports = {
	getMapLocationApp:getMapLocationApp
}