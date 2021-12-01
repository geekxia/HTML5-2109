<script>
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS || MP-WEIXIN
			uni.login({
				success(res) {
					console.log('res code', res)
				}
			})
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
