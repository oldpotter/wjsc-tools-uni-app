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
			<button type="default" @click="changeShape('big')" :disabled="!canDownload">放大</button>
			<button type="default" @click="changeShape('small')" :disabled="!canDownload">缩小</button>
		</view>
		<view style="display: flex; flex-direction: row; justify-content: space-between; width: 90vw; margin-top: 20px;">
			<button type="default" @click="changeShape('up')" :disabled="!canDownload">⬆️</button>
			<button type="default" @click="changeShape('down')" :disabled="!canDownload">⬇️</button>
			<button type="default" @click="changeShape('left')" :disabled="!canDownload">⬅️</button>
			<button type="default" @click="changeShape('right')" :disabled="!canDownload">➡️</button>
		</view>
		<view style="display: flex; flex-direction: row; justify-content: space-between; width: 90vw; margin-top: 20px;">
			<button type="default" @click="toAdjust" :disabled="!canDownload">调整亮度/对比度️</button>
		</view>
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
				isSliderDisable: false,
				src: null
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
		
		onShow(){
			const imagePath = getApp().globalData.imagePath
			if(imagePath != null){
				this.selectImagePath = imagePath
				this.drawAll()
			}
		},

		methods: {
			toAdjust(){
				const _this = this
				uni.navigateTo({
					url: './adjust?src=' + _this.selectImagePath,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			changeShape(v){
				switch(v){
					case 'big':
						this.rate += 0.02
						break
					case 'small':
						this.rate -= 0.02
						break
					case 'up':
						this.Y -= 5
						break	
					case 'down':
						this.Y += 5
						break
					case 'left':
						this.X -= 5
						break
					case 'right':
						this.X += 5
						break
				}
				this.drawAll()
				
			},
			
			drawAll(imagePath=null){
				const _this = this
				uni.getImageInfo({
							src: _this.selectImagePath,
							success(image) {
								// console.log('drawAll', image)
								const context = uni.createCanvasContext('myCanvas')
								context.clearRect(0, 0, 300, 300)
								context.fillStyle = '#FFFFFF'
								context.arc(150, 145, 130, 0, 360)
								context.fill()
								context.shadowColor = '#FFFFFF'
								context.globalCompositeOperation = 'source-atop'
								const {
									dx,
									dy,
									dWidth,
									dHeight
								} = _this.getCanvasInfo(image, 300, 300)
								const p = imagePath ? imagePath : image.path
								context.drawImage(p, -dx + _this.X, -dy + _this.Y, dWidth*_this.rate, dHeight*_this.rate)
								context.globalCompositeOperation = 'source-over'
								context.drawImage('../../static/img/logo.jpg', 10, 260, 500 / 7, 198 / 7)
								context.drawImage('../../static/img/qr.jpeg', 250, 250, 37, 37)
								context.setFontSize(20)
								context.setTextAlign('center')
								context.setFillStyle('DarkGray')
								context.setFontSize('14')
								context.fillText(dayjs().format('MM.DD'), 270, 245)
								context.globalCompositeOperation = 'destination-over'
								context.arc(150, 145, 130, 0, 360)
								context.shadowOffsetX = 15
								context.shadowOffsetY = -5
								context.shadowBlur = 15
								context.shadowColor = '#8F8F94'
								context.fill()
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
						// uni.navigateTo({
						// 	url: './adjust?src=' + imagePath,
						// 	success: res => {},
						// 	fail: () => {},
						// 	complete: () => {}
						// });
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
				const _this = this
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
