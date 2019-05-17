<template>
	<view style="width: 100vw; display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
		<canvas style="width: 300px; height: 300px; background: #EFEFF4; border: 1px solid #DDDDDD; margin: 20px 0;"
		 canvas-id="myCanvas" @touchstart="touchStart"></canvas>
		<view style="display: flex; flex-direction: row; justify-content: space-between; width: 90vw;">
			<button type="primary" @click="open">获取图片</button>
			<button type="default" @click="save" :disabled="!canDownload">保存图片</button>
			<button type="default" @click="getText" :disabled="!canDownload">识别文字</button>
		</view>
		<view style="display: flex; flex-direction: row; justify-content: space-between; width: 90vw; margin-top: 20px;">
			<button type="default" @click="big" :disabled="!canDownload">放大</button>
			<button type="default" @click="small" :disabled="!canDownload">缩小</button>
		</view>
		<view style="display: flex; flex-direction: row; justify-content: space-between; width: 90vw; margin-top: 20px;">
			<button type="default" @click="up" :disabled="!canDownload">⬆️</button>
			<button type="default" @click="down" :disabled="!canDownload">⬇️</button>
			<button type="default" @click="left" :disabled="!canDownload">⬅️</button>
			<button type="default" @click="right" :disabled="!canDownload">➡️</button>
		</view>
		<!-- <image :src="c" mode="aspectFit"></image> -->
		<textarea style="border: 1upx solid #DDDDDD; margin: 20px 10px; " maxlength="-1" v-model="text" :style="{display: !text? 'none':'block'}" />
		<button type="default" @click="copy" :hidden="!text">复制文本</button>
		
	</view>
</template>

<script>
	import dayjs from 'dayjs'
	import { pathToBase64, base64ToPath } from 'image-tools'
	export default {
		data() {
			return {
				canDownload: false,
				text: '',
				selectImagePath: '',
				rate: 1,
				X:0,
				Y:0,
			};
		},

		onReady() {
			const context = uni.createCanvasContext('myCanvas')
			context.fillStyle = '#FFFFFF'
			context.fillRect(0, 0, 300, 300)
			context.drawImage('../../static/img/logo.jpg', 10, 260, 500 / 7, 198 / 7)
			context.drawImage('../../static/img/qr.jpeg', 250, 250, 37, 37)
			context.fillStyle = '#ececec'
			context.arc(150, 145, 130, 0, 360)
			context.fill()
			context.draw()
		},

		methods: {
			big(){
				this.rate += 0.02
				this.drawAll()
			},
			small(){
				this.rate -= 0.02
				this.drawAll()
			},
			
			up(){
				this.Y -= 1
				this.drawAll()
			},
			down(){
				this.Y += 1
				this.drawAll()
			},
			left(){
				this.X -= 1
				this.drawAll()
			},
			right(){
				this.X += 1
				this.drawAll()
			},
			drawAll(){
				const _this = this
				uni.getImageInfo({
							src: _this.selectImagePath,
							success(image) {
								const context = uni.createCanvasContext('myCanvas')
								context.clearRect(0, 0, 300, 300)
								context.arc(150, 145, 130, 0, 360)
								context.fillStyle = '#ffffff'
								context.fill()
								context.globalCompositeOperation = 'source-atop'
								const {
									dx,
									dy,
									dWidth,
									dHeight
								} = _this.getCanvasInfo(image, 300, 300)
								context.drawImage(image.path, -dx + _this.X, -dy + _this.Y, dWidth*_this.rate, dHeight*_this.rate)
								context.globalCompositeOperation = 'source-over'
								context.drawImage('../../static/img/logo.jpg', 10, 260, 500 / 7, 198 / 7)
								context.drawImage('../../static/img/qr.jpeg', 250, 250, 37, 37)
								context.setFontSize(20)
								context.setTextAlign('center')
								context.setFillStyle('DarkGray')
								context.setFontSize('14')
								context.fillText(dayjs().format('MM.DD'), 265, 245)
								context.draw()
								_this.canDownload = true
							}
						})
			},
			
			copy(){
				const _this = this
				uni.setClipboardData({
					data: _this.text,
					success(){
						uni.showToast({
							title: '已复制到剪贴板',
							mask: false,
							duration: 1500
						});
					}
				})
			},
			//  重新调整选择图片
			getCanvasInfo(headImg, canvW, canH) {
				const imgX = headImg.width
				const imgY = headImg.height
				let dWidth = 0
				let dHeight = 0
				if (imgX > imgY) {
					dHeight = canH
					dWidth = imgX / (imgY / canH)
					if (dWidth < canvW) {
						dWidth = canvW
						dHeight = imgY / (imgX / canvW)
					}
				} else {
					dWidth = canvW
					dHeight = imgY / (imgX / canvW)
					if (dHeight < canH) {
						dHeight = canH
						dWidth = imgX / (imgY / canH)
					}
				}
				const dx = (dWidth - canvW) / 2
				const dy = (dHeight - canH) / 2
				return {
					dx,
					dy,
					dWidth,
					dHeight
				}
			},

			open() {
				const _this = this
				uni.chooseImage({
					success(res) {
						const imagePath = res.tempFilePaths[0]
						_this.selectImagePath = imagePath
						_this.drawAll()
						},
					fail() {
						uni.showToast({
							title: '失败啦！！！',
							mask: false,
							duration: 1500
						});
					}
				})
			},

			getText(){
				const _this = this
				uni.showLoading({
					title: '',
					mask: false
				});
				setTimeout(() => {
					uni.canvasToTempFilePath({
						canvasId: 'myCanvas',
						fileType:'jpg',
						success(res) {
							const img = res.tempFilePath
							pathToBase64(img)
								.then(base64=>{
									
									uni.request({
											url: 'https://ocrapi-document.taobao.com/ocrservice/document',
											method: 'POST',
											header: {
												'Authorization': 'APPCODE afe6ff03025c425fb75801d07ae0b3fe'
											},
											data: {
												img: base64
											},
											success: res => {
												res.data.prism_wordsInfo.forEach((item, index, array) => {
													if(index != (array.length-1)) {
														_this.text += item.word		
													}else{
														_this.text = '【2019年无境书茶日历】'.concat('', _this.text)
													}
												})
											},
											fail: (err) => {
												console.error(JSON.stringify(err))
											},
											complete: () => {
												uni.hideLoading()
											}
										})
									
								})
							// _this.c = img
							
						},
					})
				
				}, 100)
			},

			save() {
				uni.canvasToTempFilePath({
					canvasId: 'myCanvas',
					fileType: 'jpg',
					success(res) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success() {
								uni.showToast({
									title: '保存成功',
									mask: false,
									duration: 1500
								});
							},

							fail() {
								uni.showToast({
									title: '保存失败',
									mask: false,
									duration: 1500
								});
							}
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>
