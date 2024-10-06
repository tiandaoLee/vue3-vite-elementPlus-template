<template>
	<div>
		<div class="follow yx-background-white radius-8" style="zIndex:2004" v-if="showNotice && isShow">
			<div class="el-dialog__header flex-row-center-between">
				<p class="yx-color-text-primary font-h4-regular">
					<span class="ml-6 font-h5-regular">店铺授权提醒</span>
				</p>
				<i class="el-icon-close close" @click="handClose"></i>
			</div>
			<div class="el-dialog__body pb-2">
				<div v-if="advent_msg">
					<div class="flex-row-align-center">
						<i class="i-vector mr-6"></i>
						<span class="font-h4-medium">店铺授权临期</span>
					</div>
					<div class="font-h5-regular body-block">
						<span>{{ advent_msg }}</span>
					</div>
				</div>
				<div
					v-if="expire_msg"
					:class="{ 'pt-24 yx-border-top': advent_msg && expire_msg}"
				>
					<div class="flex-row-align-center">
						<i class="i-vector mr-6"></i>
						<span class="font-h4-medium">店铺授权到期</span>
					</div>
					<div class="font-h5-regular body-block">
						<span>{{ expire_msg }}</span>
					</div>
				</div>
			</div>
			<div class="el-dialog__footer">
				<div class="dialog-footer">
					<el-button @click="confirm" v-if="btnshow" type="primary">前往处理</el-button>
					<el-button @click="handClose" v-else type="primary">我知道了</el-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { authorizationNotice } from '@/api/common';
export default {
	name: 'sendGood',
	data() {
		return {
			btnshow: this.$auth.hasPermi('auth:add'),
			advent_msg: '',
			expire_msg: '',
			showNotice: true,
		};
	},
	computed: {
		isShow() {
			return !!(this.expire_msg || this.advent_msg);
		},
	},
	created() {
		this.authorizationNotice();
	},
	methods: {
		async authorizationNotice() {
			const res = await authorizationNotice();
			this.advent_msg = res.advent_msg;
			this.expire_msg = res.expire_msg;
		},
		async confirm() {
			const handLink = this.$router.resolve({
				path: '/store/list',
			});
			window.open(handLink.href, '_blank');
			this.handClose();
		},

		handClose() {
			this.showNotice = false;
		},
	},
};
</script>
<style lang="less" scoped>
.follow {
	width: 400px;
	//height: 460px;
	border: 1px solid #f7f8fa;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.body-block {
	margin: 10px 0 20px 20px;
	//width: 350px;
}
</style>
