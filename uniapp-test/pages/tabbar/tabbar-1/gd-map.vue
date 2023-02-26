<template>
	<view class="content">
		<view class="btns"> <!-- // 选取地点后的确定和取消按钮 -->
			<view @click="back">取消</view>
			<view @click="checkAdd">确定</view>
		</view>
		<!-- // 地图部分 -->
		 <map style="width: 100%; height: 60vh;" :latitude="latitude" :longitude="longitude" :markers="markers" @tap="tap" :include-points="markers" :scale="10"/>
		 <!-- <view id="container"></view> -->
		 <!-- // 搜索框 -->
		 <view class="inputCon">
			 <view class="searchView">
				 <text class="iconfont icon-sousuo"></text>
				 <input type="text" placeholder="搜索地点" v-model="searchWords" confirm-type="search" @confirm="searchFn"/>
				 <text @click="cancel">取消</text>
			 </view>
		 </view>
		 <!-- // 地点列表部分 -->
		 <view class="list">
			 <view class="item" v-for="(add,index) in dataTips" :key="add.id" @click="select(add,index)"
			 :class="selectIndex==index?'active':''">
				 <view class="name">{{add.name}}</view>
				 <view class="address">{{add.district || ''}}{{add.address || ''}}</view>
			 </view>
		 </view>
	</view>
</template>

<script>
	// 引入高德地图api提供的微信小程序的接口
	var amapFile = require('@/components/gaode/amap-wx.130.js');//如：..-/..-/libs/amap-wx.js
	// 创建地图 key
	var myAmapFun = new amapFile.AMapWX({key: '50397e4b0a0278e59c405c9b69830291'});
	
	console.log("创建了高德地图");
	export default{
		data(){
			return{
				selectIndex:undefined,
				selectAddr:{},	//地址对象
				searchWords:"",
				id:0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				markers: [{
					latitude: 39.909,
					longitude: 116.39742,
					width:30,
					height:30,
					// iconPath: '../../static/ditu.png'
				}],
				dataTips:[],
				name:''	//	地址名称
			}
		},
		onLoad(options) {
			if(options && options.lng){
				this.longitude = options.lng;
				this.markers[0].longitude = this.longitude;
			}
			if(options && options.lat){
				this.latitude = options.lat;
				this.markers[0].latitude = this.latitude;
			}
			// 获取当前位置的地点列表
			myAmapFun.getPoiAround({
			  success: (data)=>{
				console.log("获取当前的列表",data);
				this.dataTips = data.poisData;
			  },
			  fail: (info)=>{
				console.log(info)
			  }
			})
		},
		methods:{
			// 选择地点后，将选取的地点传递到前一个页面中
			checkAdd(){
				console.log(this.markers);
				uni.setStorageSync('address', this.markers[0]);
				var pages = getCurrentPages();// 获取所有的页面栈
				var prevPage = pages[pages.length - 2]; // 找到上一个页面，注意是页面，如果是页面中有组件，则需要通过页面接受到数据后，再次往组件中传递
				// console.log("selectAddr",this.selectAddr)
				prevPage.$vm.selectAddr = this.selectAddr;//在上一个页面中就可以用addressObj进行接收
				prevPage.$vm.value2 = this.selectAddr.address + this.name
				uni.navigateBack();
			},
			back(){
				uni.navigateBack();
			},
			cancel(){
				if(this.searchWords){
					this.searchWords = "";
					myAmapFun.getPoiAround({
					  location: this.markers[0].longitude+','+this.markers[0].latitude,
					  success: (data)=>{
						console.log("获取当前的列表",data);
						this.dataTips = data.poisData;
					  },
					  fail: (info)=>{
						console.log(info)
					  }
					})
				}
			},
			reserGeo(){
				myAmapFun.getRegeo({
				  success: (data)=>{
					console.log("获取当前定位信息",data);
				  },
				  fail: (info)=>{
					console.log(info)
				  }
				})
			},
			// 根据地址列表中选择某一个地点
			select(add,index){
				console.log("add",add);
				if(!add){
					return;
				}
				this.name = add.name;	//获取到选中的这个地址名
				this.selectIndex = index;
				var location = add.location.split(",");
				console.log("location",location);
				this.selectAddr = {
					address:add.pname?(add.pname+add.cityname+add.adname+add.address):(add.district+add.address),
					latitude:location[1],
					longitude:location[0]
				};
				this.markers[0].latitude = +location[1];
				this.markers[0].longitude = +location[0];
			},
			// 在地图上点击进行选点，这个选点在地图缩放比例较大时无效，因为精读的问题。
			tap(e){
				console.log(e);
				var location = e.detail.longitude +','+e.detail.latitude
				myAmapFun.getRegeo({
				  location: location,
				  success: (data)=>{
					console.log("获取指定定位信息",data);
					this.selectAddr = {
						address:data[0].regeocodeData.formatted_address,
						latitude:e.detail.latitude,
						longitude:e.detail.longitude
					};
					this.markers[0].latitude = data[0].latitude;
					this.markers[0].longitude = data[0].longitude;
					myAmapFun.getPoiAround({
					  location: data[0].longitude+','+data[0].latitude,
					  success: (data)=>{
						console.log("获取当前的列表",data);
						this.dataTips = data.poisData;
					  },
					  fail: (info)=>{
						console.log(info)
					  }
					})
				  },
				  fail: (info)=>{
					console.log(info);
				  }
				})
			},
			// 根据内容进行检索
			searchFn(){
				console.log("根据地址检索",this.searchWords);
				myAmapFun.getInputtips({
				  keywords: this.searchWords,
				  location: '',
				  success: (data) => {
					  console.log(111,data);
					if(data && data.tips){
					  this.dataTips = data.tips;
					}
				  },
				  fail:data=>{
					  console.log(222,data);
				  }
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btns{
		position: fixed;
		top:0;
		left:0;
		height:100upx;
		width:100%;
		background:linear-gradient(to bottom,rgba(0,0,0,0.4),rgba(0,0,0,0));
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index:10 !important;
		view{
			margin:100upx 24upx 0;
			font-size:30upx;
			&:first-child{
				width:100upx;
				height:60upx;
				line-height: 60upx;
				text-align: center;
				border-radius: 10upx;
				background:#b6b6b6;
				color:#fff;
			}
			&:last-child{
				width:100upx;
				height:60upx;
				line-height: 60upx;
				text-align: center;
				border-radius: 10upx;
				background:#E13500;
				color:#fff;
			}
		}
	}
	.content{
		.list{
			height:calc(40vh - 100upx);
			overflow-y: auto;
			width:702upx;
			margin:-40upx auto 0;
			padding-bottom:20upx;
			.item{
				border-bottom:2upx solid #f3f3f3;
				&:last-child{
					border:none;
				}
				.address{
					font-size:22upx;
					color:#666;
					margin:10upx 0;
				}
				.name{
					font-size:30upx;
					color:#333;
					margin-top:10upx;
				}
				&.active{
					.name{
						font-weight: bold;
						color:#E13500;
					}
					.address{
						color:#E13500;
					}
				}
			}
		}
		.inputCon{
			width:100%;
			background:#fff;
			top:-60upx;
			position: relative;
			z-index:20;
			height:100upx;
			display: flex;
			align-items: center;
			justify-content: center;
			.searchView{
				width:702upx;
				height:60upx;
				display: flex;
				align-items: center;
				line-height: 60upx;
				border-radius: 40upx;
				padding:0 30upx;
				box-sizing: border-box;
				background:#f3f3f3;
				font-size:26upx;
				.iconfont{
					color:#666;
					margin-right:20upx;
				}
				input{
					flex:1;
				}
				view{
					flex-shrink: 0;
				}
			}
		}
		
	}
</style>
