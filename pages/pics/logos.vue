<template>
	<view style="background: lightblue; width: 100vw;">
		<checkbox-group @change="checkboxChange" style="margin-bottom: 30vw;">
			<label style="display: flex;flex-direction: row; border-bottom: 1px solid #8F8F94; margin: 10px 20px; padding: 5px 0;"
			 v-for="item in items" :key="item.value">
				<view>
					<checkbox :value="item.value" :checked="item.checked" />
				</view>
				<image style="width: 20vw; height: 20vw;" :src="item.path" mode="aspectFit"></image>
			</label>
		</checkbox-group>
		<button style="position: fixed; bottom: 5vw; margin-left: 10vw; width: 80vw;" type="primary" @click="ok">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		
		onLoad(){
			console.log(sto.num)
		},

		methods: {
			ok() {
				const logos = this.items.filter(item => item.checked)
			},
			checkboxChange: function(e) {
				var items = this.items,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.value)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
			}
		}
	}
</script>

<style>
</style>
