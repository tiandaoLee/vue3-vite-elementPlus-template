<!--
 * @Author: chenhongwei chenhw2019@gmail.com
 * @Date: 2023-03-21 11:09:24
 * @LastEditors: Li Yong
 * @LastEditTime: 2023-04-12 20:41:35
 * @FilePath: /seller.sviptrader.com/src/components/layout/components/commonNotice/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<el-dialog width="600px" :visible.sync="centerDialogVisible" center :show-close="false" class="commonNotice" :close-on-click-modal="false">
		<div slot="title" :class="notice.type === 1 ? 'dialog-title' : 'dialog-title notice'">
			<template v-if="notice.type === 1">
				<img src="@/assets/public/update-logo.png" alt="" class="logo" />
				<div class="content-title">{{ notice.title }}</div>
				<img src="@/assets/public/update-notice-11.png" alt="" class="img1" />
				<img src="@/assets/public/update-notice-21.png" alt="" class="img2" />
			</template>
			<template v-else>
				<div class="content-title notice">{{ notice.title }}</div>
				<img src="@/assets/public/notice-bg.png" alt="" class="img3" />
			</template>
		</div>
		<div class="bg-wrapper" :class="notice.type === 1 ? 'bg-wrapper' : 'bg-wrapper notice'">
			<div class="content pre-wrap">{{ notice.context }}</div>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" v-if="notice.url" @click="jump">立即查看</el-button>
				<el-button @click="close">我知道了</el-button>
			</div>
		</div>
	</el-dialog>
</template>

<script>
import { popRead } from '@/api/home';

export default {
	data() {
		return {
			centerDialogVisible: false,
			isUpate: false,
			hasUrl: false,
			title: '新功能上线！',
			notice: {},
		};
	},
	methods: {
		show(data) {
			// 正在读忽略
			if (this.centerDialogVisible === true) {
				return;
			}
			this.notice = data;
			this.centerDialogVisible = true;
		},
		async jump() {
			this.centerDialogVisible = false;
			const { type, taskTime } = this.notice;
			await popRead({ type, taskTime });
			if (this.notice.url.indexOf('http') > -1) {
				window.open(this.notice.url, '_blank');
			} else {
				window.open(`${location.protocol}//${this.notice.url}`, '_blank');
			}
		},
		async close() {
			this.centerDialogVisible = false;
			const { type, taskTime } = this.notice;
			await popRead({ type, taskTime });
		},
	},
};
</script>

<style lang="less" scoped>
.el-dialog__wrapper /deep/ .el-dialog {
	box-sizing: border-box;
	overflow: hidden;
	border-radius: 16px;
}
.el-dialog__wrapper /deep/ .el-dialog__header {
	position: relative;
	height: 160px;
	padding: 0;
	border-bottom: none !important;
}

.el-dialog__wrapper /deep/ .el-dialog__body {
	position: relative;
	padding: 0 !important;
}
.dialog-title {
	background: linear-gradient(270deg, #cfe9fd 0%, #f2f7fe 100%);
	height: 160px;
	overflow: hidden;
	&.notice {
		background: linear-gradient(270deg, #dce0ff 0%, #faf6ff 100%);
	}
	.content-title {
		margin-left: 40px;
		margin-top: 79px;
		opacity: 1;
		text-align: left;

		font-family: PingFang SC;
		font-size: 28px;
		font-weight: normal;
		letter-spacing: 0em;

		/* 全局/dark */
		color: #000000;

		z-index: 1;

		&.notice {
			margin-top: 61px !important;
		}
	}
	.logo {
		position: absolute;
		z-index: 100;
		top: 42px;
		left: 40px;
		width: 100px;
		height: 24px;
	}
	.img1 {
		position: absolute;
		z-index: 101;
		top: 47px;
		right: 125px;
		width: 112px;
		height: 112px;
	}
	.img2 {
		position: absolute;
		z-index: 100;
		top: -24px;
		right: -50px;
		width: 277px;
		height: 277px;
	}
	.img3 {
		position: absolute;
		z-index: 100;
		top: 20px;
		right: 47px;
		width: 190px;
		height: 190px;
	}
}

.bg-wrapper {
	position: relative;
	z-index: 300;
	background: linear-gradient(180deg, #ffffff 0%, #f2f7fb 100%);
	&.notice {
		background: linear-gradient(180deg, #ffffff 0%, #f3f2fc 100%);
	}
}

.content {
	position: relative;
	z-index: 300;
	padding: 34px 32px;
	background: transparent;
	font-family: PingFang SC;
	font-size: 14px;
	font-weight: normal;
	line-height: 24px;
	letter-spacing: 0px;

	/* Font/text-primary */
	color: #1d2129;
}
.el-dialog__wrapper /deep/ .el-dialog__footer {
	padding: 0;
}

.dialog-footer {
	position: relative;
	box-sizing: border-box;
	padding: 0 34px 32px;
	width: 100%;
	display: flex;
	background: transparent;
	flex-direction: row-reverse;

	button:first-of-type {
		margin-left: 16px;
		background-color: #7052ff;
		color: #fff;
	}

	button:nth-child(2) {
		color: #7052ff;
		border: 1px solid #7052ff;
	}
}
</style>