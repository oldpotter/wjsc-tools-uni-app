<template>
	<view>
		<view :hidden='currentImagePath == undefined'>
			<movable-area style="width: 100vw; background: #007AFF;" :style="{height: h + 'px'}">
				<movable-view direction="all">
					<view>移动移动</view>
				</movable-view>
			</movable-area>
		</view>
		<button type="primary" @click="ok">aaa</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentImagePath: undefined,
				h: 0
			}
		},
		methods: {
			ok() {
				this.currentImagePath = 'asdf'
				this.h = 300
			}
		}
	}
</script>

<style>

</style>
