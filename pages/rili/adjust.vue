<template>
	<view style="width: 100vw; display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
		<image :style="imgStyle" :src="src" mode="aspectFill"></image>
		<canvas style="display: none;" canvas-id="myCanvas"></canvas>
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
				isProcessing: false
			}
		},
		
		computed:{
			imgStyle(){
				return `filter: brightness(${this.value}) contrast(${this.value});`
			}
		},

		onLoad(e) {
			this.src = e.src
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
				
				uni.uploadFile({
							url: 'http://192.168.31.99:3001/jimp',
							filePath: _this.src,
							name: 'file',
							formData: {
								brightness: _this.value - 1,
								contrast: _this.value - 1
							},
							success: res => {
								console.log(res.data)
							},
							fail: (err) => {
								console.error('fail!', err)
							},
							complete: () => {
								uni.hideLoading()
							}
						});
			}
		}
	}
</script>

<style>
</style>
