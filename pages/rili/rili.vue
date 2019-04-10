<template>
	<view style="width: 100vw; display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
		<canvas style="width: 300px; height: 300px; background: #EFEFF4; border: 1px solid #DDDDDD; margin: 20px 0;"
		 canvas-id="myCanvas"></canvas>
		<view style="display: flex; flex-direction: row; justify-content: space-between; width: 90vw;">
			<button type="primary" @click="open">获取图片</button>
			<button type="default" @click="save" :disabled="!canDownload">保存图片</button>
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	
	export default {
		data() {
			return {
				canDownload: false
			};
		},

		onReady() {
			console.log()
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
						uni.getImageInfo({
							src: res.tempFilePaths[0],
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
								context.drawImage(image.path, -dx, -dy, dWidth, dHeight)
								context.globalCompositeOperation = 'source-over'
								context.drawImage('../../static/img/logo.jpg', 10, 260, 500 / 7, 198 / 7)
								context.drawImage('../../static/img/qr.jpeg', 250, 250, 37, 37)
								context.setFontSize(20)
								context.setTextAlign('center')
								context.setFillStyle('DarkGray')
								context.fillText(dayjs().format('YYYY-MM-DD'), 150, 45)
								context.draw()
								_this.canDownload = true
							}
						})
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
