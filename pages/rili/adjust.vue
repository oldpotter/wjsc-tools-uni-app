<template>
	<view style="width: 100vw; display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
		<image :style="imgStyle" :src="src" mode="aspectFit"></image>
		<canvas style="width: 300px; height: 300px; background: #EFEFF4; opacity: 0; position: fixed" canvas-id="myCanvas"></canvas>
		<view class="uni-title">亮度/对比度</view>
		<slider style="width: 80vw" min="-100" max="100"  @change="changeVal" step="5" :disabled="isProcessing"
		 show-value />
		<button style="width: 90vw;" type="primary" @click="end(true)" :disabled="isProcessing">确定</button>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				value: 1,
				src: null,
				isProcessing: false,
			}
		},
		
		computed:{
			imgStyle(){
				return `filter: brightness(${this.value}) contrast(${this.value});`
			}
		},

		onLoad(e) {
			this.src = e.src
			const info = uni.getSystemInfo()
			this.screenWidth = info.screenWidth
			this.screenHeight = info.screenHeight
		},
		
		methods: {
			/**
			 * 改变亮度
			 */
			changeVal(e) {
				this.value = 1 + e.detail.value/100
			},

			end(value){
				const _this = this
				this.isProcessing = true
				uni.showLoading({
					title: '',
					mask: false
				});
				uni.getImageInfo({
					src: _this.src,
					success(image) {
						const context = uni.createCanvasContext('myCanvas')
						let w, h, ratio
						if(image.width >= image.height){
							ratio = image.width / image.height
							w = 300
							h = 300 / ratio
						}else{
							ratio = image.height / image.width
							h = 300
							w = 300/ratio
						}
						context.drawImage(image.path, 0, 0, w, h)
						context.draw()
						
						setTimeout(()=>{
							uni.canvasToTempFilePath({
							canvasId: 'myCanvas',
							fileType: 'png',
							width: w,
							height: h,
							success(res){
								uni.uploadFile({
											url: 'http://shenkeling.top:3001/jimp',
											filePath: res.tempFilePath,
											name: 'file',
											formData: {
												brightness: _this.value - 1,
												contrast: _this.value - 1
											},
											success: res => {
												console.log(res.data)
												uni.hideLoading()
												uni.downloadFile({
													url: 'http://shenkeling.top:3001/download',
													success(res){
														getApp().globalData.imagePath = res.tempFilePath
														uni.navigateBack()
													},
													fail(err){
														console.error('下载失败', err)
													}
												})
											},
											fail: (err) => {
												console.error('fail!', err)
											},
											complete: () => {
												uni.hideLoading()
											}
										});
										
							},
							
							fail(err){
								console.log('canvasToTempFilePath fail:', err)
							}
						})
						}, 1000)
						
					
					}
				})
				
				
				}
		}
	}
</script>

<style>
</style>
