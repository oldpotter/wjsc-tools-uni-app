<template>
	<view style="width: 100vw;">
		<image  style="position: absolute; z-index: 1;"  v-for="(logo, index) in logos" :key="index" :style="{width: logo.width + 'px', height:logo.height + 'px'}" :src="logo.path" mode="aspectFit"></image>
		<image style="width: 100%;" :src="currentImagePath" mode="widthFix" :hidden='currentImagePath == undefined'></image>
		<button type="primary" @click="chooseImage" :hidden="choosenImagePaths.length != 0">选择图片</button>
		<button type="default" @click="addLogo" :hidden="currentImagePath == undefined">添加Logo</button>
		<view style="display: flex; flex-direction: row; flex-wrap: wrap;">
			<view :style="{background: currentImageIndex== index ? 'red':'#ffffff'}" v-for="(imagePath, index) in choosenImagePaths"
			 :key="index" @click="clickImage(index)">
				<image :src="imagePath" mode="aspectFit" :style="{width: screenWidth/3 + 'px', height: screenWidth/3 + 'px'}"></image>
			</view>
		</view>
		<button type="primary" @click="processPics" :hidden="currentImagePath == undefined">完成</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				choosenImagePaths: [],
				currentImageIndex: -1,
				currentImageHeight: 0,
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
					success(res) {
						_this.currentImageHeight = res.height
						const x = res.width / _this.screenWidth
						_this.currentImageHeight = res.height / x
					}
				})
			}
		},

		methods: {
			chooseImage() {
				const _this = this
				uni.chooseImage({
					success(res) {
						_this.choosenImagePaths = res.tempFilePaths
						_this.currentImageIndex = 0
						_this.opacity = 1
					}
				})
			},

			clickImage(index) {
				this.currentImageIndex = index
			},
			
			addLogo(){
				this.logos = [{
					path: '../../static/img/haizideyu.png',
					width: this.screenWidth /5,
					height: this.screenWidth / 10
				}]
			},
			
			processPics(){
				let view = uni.createSelectorQuery().select('#l11ogo')
				console.log(view.boundingClientRect())
			}
		}
	}
</script>

<style>
	button {
		margin: 20px;
	}
</style>
