<!--
 * @Author: liushuaibo liushuaibo@yangxuan.net
 * @Date: 2023-01-12 09:43:39
 * @LastEditors: liushuaibo liushuaibo@yangxuan.net
 * @LastEditTime: 2023-02-03 10:19:19
 * @FilePath: \seller.sviptrader.com\src\components\layout\components\deliveryNotice\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="follow yx-background-white radius-8" style="zIndex:2003" v-if="isShow">
		<div class="el-dialog__header flex-row-center-between">
			<p class="yx-color-text-primary font-h4-regular">
				<i class="i-notice"></i>
				<span class="ml-6">交付通知</span>
			</p>
			<i class="el-icon-close close" @click="handClose"></i>
		</div>
		<div class="el-dialog__body p-24 font-h5-regular">
			已有
			<span class="yx-color-primary">{{ anchorNum }}</span>
			个达人交付，共
			<span class="yx-color-primary">{{ videoNum }}</span>
			个视频。快去看看吧～
		</div>
		<div class="el-dialog__footer">
			<div class="dialog-footer">
				<el-button @click="confirm">立即查看</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import { deliveryNotice, deliveryNoticeView } from '@/api/common';
export default {
	name: 'sendGood',
	data() {
		return {
			isShow: false,
			anchorNum: 0,
			videoNum: 0,
			respTime: 0,
		};
	},
	created() {
		this.deliveryNotice();
	},
	methods: {
		async deliveryNotice() {
			const { viewStatus = false, anchorNum = 0, videoNum = 0, respTime } = await deliveryNotice({ userIds: [], deptIds: [] });
			this.isShow = viewStatus;
			this.anchorNum = anchorNum;
			this.videoNum = videoNum;
			this.respTime = respTime;
		},
		async confirm() {
			const { respTime: viewTime } = this;
			await deliveryNoticeView({ viewTime });
			const handLink = this.$router.resolve({
				path: '/library/shotvideo/list',
			});
			window.open(handLink.href, '_blank');
			this.handClose();
		},

		handClose() {
			this.isShow = false;
		},
	},
};
</script>
<style lang="less" scoped>
.follow {
	width: 450px;
	border: 1px solid #f7f8fa;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	/deep/ .el-button {
		border: 1px solid #7052ff;
		color: #7052ff;
	}
}
</style>
