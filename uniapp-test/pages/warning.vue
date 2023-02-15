<template>
	<view>
		<!-- 提示信息弹窗   
			type="message":
			top	顶部弹出
			center	居中弹出
			bottom	底部弹出
			left	左侧弹出
			right	右侧弹出
			message	预置样式 ：消息提示
			dialog	预置样式 ：对话框
			share	预置样式 ：底部弹出分享示例
		 -->
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:"warningPage",
		data() {
			return {};
		},
		props:{
			msgType:{
				type:String,
				default:"error"
			},
			
			messageText:{
				type:String,
				default:"错误信息"
			}
		},
		
		methods:{
			//子组件内的方法，message对应该页面上的 ref='message'
			openWarning(){
				this.$refs.message.open();
			}
		}
	};
</script>

<style>
</style>