<template>
	<view style="width: 100vw;">
		<canvas style="width: 100vw; height: 75vw; background: #EFEFF4; border: 1px solid #DDDDDD; margin: 20px 0;" canvas-id="myCanvas"></canvas>
		<button type="primary" @click="chooseImage" :hidden="choosenImagePaths.length != 0">选择照片</button>
		<button type="default" @click="toLogoPage" :hidden="currentImagePath == undefined">选择Logo</button>
		<view style="display: flex; flex-direction: row; flex-wrap: wrap;">
			<view :style="{background: currentImageIndex== index ? 'red':'#ffffff'}" v-for="(imagePath, index) in choosenImagePaths"
			 :key="index" @click="clickImage(index)">
				<image :src="imagePath" mode="aspectFit" :style="{width: screenWidth/3 + 'px', height: screenWidth/3 + 'px'}"></image>
			</view>
		</view>
		<button type="primary" @click="savePics" :hidden="currentImagePath == undefined">保存所有照片</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				choosenImagePaths: [],
				currentImageIndex: -1,
				// currentImageHeight: 0,
				screenWidth: uni.getSystemInfoSync().screenWidth,
				logos: []
			};
		},
		

		computed: {
			currentImagePath() {
				return this.choosenImagePaths[this.currentImageIndex]
			},
		},

		watch: {
			currentImageIndex() {
				const _this = this
				uni.getImageInfo({
					src: _this.choosenImagePaths[_this.currentImageIndex],
					success(image) {
						// console.log(image)
						_this.drawPic(image)
					}
				})
			}
		},

		methods: {
			drawPic(image) {
				const _this = this
				const context = uni.createCanvasContext('myCanvas')
				context.clearRect(0, 0, _this.screenWidth, _this.screenWidth * 0.75)
				const {
					dx,
					dy,
					dWidth,
					dHeight
				} = _this.getCanvasInfo(image, _this.screenWidth, _this.screenWidth * 0.75)
				context.drawImage(image.path, -dx, -dy, dWidth, dHeight)
				//draw logos
				if (this.logos.length > 0) {
					const {
						dx,
						dy,
						dWidth,
						dHeight
					} = _this.getCanvasInfo(image, _this.screenWidth, _this.screenWidth * 0.75)
					context.drawImage(this.logos[0].path, _this.screenWidth * 0.05, _this.screenWidth * 0.75 * 0.01,
						this.logos[0].width, this.logos[0].height)
				}
				context.draw()
			},

			//调整图片尺寸，获取绘制信息
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
			//选择图片
			chooseImage() {
				const _this = this
				uni.chooseImage({
					success(res) {
						_this.choosenImagePaths = res.tempFilePaths
						_this.currentImageIndex = 0
						// _this.opacity = 1
					}
				})
			},

			clickImage(index) {
				this.currentImageIndex = index
			},

			toLogoPage() {
				uni.navigateTo({
					url: './logos',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				/*
				this.logos = [{
					path: '../../static/img/haizideyu.png',
					width: this.screenWidth / 5,
					height: this.screenWidth / 5
				}]
				const _this = this
				uni.getImageInfo({
					src: _this.choosenImagePaths[_this.currentImageIndex],
					success(image) {
						_this.drawPic(image)
					}
				})
				*/
			},

			async savePicPromise(path) {
				const _this = this
				return new Promise((resolve, reject) => {
					uni.showLoading({
						title: '请稍后',
						mask: false
					});
					uni.getImageInfo({
						src: path,
						success(image) {
							_this.drawPic(image)
							setTimeout(() => {
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
												resolve()
											},
										})
									}
								})

							}, 1000)
						}
					})

				})
			},

			savePics() {
				const _this = this
				// let promises = this.choosenImagePaths.map(path => _this.savePicPromise(path))
				// console.log(promises)
				this.asyncForEach(this.choosenImagePaths, async (path, index) => {
					console.log(index + '开始')
					await this.savePicPromise(path)
					console.log(index + '结束')
				})
			},

			async asyncForEach(array, callback) {
				for (let index = 0; index < array.length; index++) {
					await callback(array[index], index, array)
				}
			}
		}
	}
</script>

<style>
	button {
		margin: 20px;
	}
</style>
