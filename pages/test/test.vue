<template>
	<view>
		<button type="primary" @click="test">测试</button>
		<image :src="src"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: null
			}
		},
		methods: {
			test() {
				const _this = this
				uni.chooseImage({
					success(res){
						// console.log(res.tempFilePaths)
						uni.uploadFile({
							url: 'http://192.168.31.99:3000/p',
							filePath: res.tempFilePaths[0],
							name: 'file',
							success: res => {
								console.log('上传成功：', res.data)
								// const img = JSON.parse(res.data)
								_this.src = res.data
								// console.log(_this.src)
							},
							fail: () => {},
							complete: () => {}
						});
					}
				})
				
				
				
			}
		}
	}
</script>

<style>

</style>
