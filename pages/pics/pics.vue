<template>
	<view style="width: 100vw;">
		<movable-area :hidden="currentImagePath == undefined" style="width: 100%; background: #0FAEFF; opacity: 0.33; z-index: 1;" :style="{height: currentImageHeight + 'px'}">
			<movable-view direction="all">xxxx</movable-view>
		</movable-area>
		<image ref='c' style="width: 100%; position: absolute; top: 0;" :src="currentImagePath" mode="widthFix" :hidden='currentImagePath == undefined'></image>
		<button type="primary" @click="chooseImage" :hidden="choosenImagePaths.length != 0">选择图片</button>
		<view style="display: flex; flex-direction: row; flex-wrap: wrap;">
			<view :style="{background: currentImageIndex== index ? 'red':'#ffffff'}" v-for="(imagePath, index) in choosenImagePaths"
			 :key="index" @click="clickImage(index)">
				<image :src="imagePath" mode="aspectFit" :style="{width: screenWidth/3 + 'px', height: screenWidth/3 + 'px'}"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				choosenImagePaths: [],
				currentImageIndex: -1,
				currentImageHeight: 0,
				screenWidth: uni.getSystemInfoSync().screenWidth
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
					}
				})
			},

			clickImage(index) {
				this.currentImageIndex = index
			},
		}
	}
</script>

<style>
	button {
		margin: 20px;
	}
</style>
