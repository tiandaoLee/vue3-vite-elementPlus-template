<template>
	<div class="follow yx-background-white radius-8" style="zIndex:2002" v-if="isShow">
		<div class="el-dialog__header flex-row-center-between">
			<span>提示</span>
			<i class="el-icon-close close" @click="confirm"></i>
		</div>
		<div class="el-dialog__body">
			<div v-if="isFollow === 0">
				<p>无法接受微信通知！</p>
				<div class="publicInfo flex-row mt-10">
					<div class="public-img">
						<img :src="wx_url" alt="" />
					</div>
					<div class="ml-12">
						<div class="flex-row-align-center">
							<yx-avatar :src="wx_info.avatarUrl"></yx-avatar>
							<p class="ml-12 yx-color-text-primary font-h4-regular">{{ wx_info.nickName }}</p>
						</div>
						<div class="yx-color-text-regular font-h4-regular mt-20">
							<p>请用以上微信号进行扫码关注公众号</p>
							<p>关注后可接受查看商品、申样、开播等消息通知</p>
						</div>
					</div>
				</div>
			</div>
			<div v-else>
				<p class="yx-color-text-primary font-h4-medium">微信通知已开启！</p>
				<p class="yx-color-text-primary font-h4-regular mt-10">我们将通过微信公众号向您发送联系人查看商品、选品、申样、开播等关键信息提醒</p>
			</div>
		</div>
		<div class="el-dialog__footer">
			<div class="dialog-footer">
				<el-button type="primary" @click="confirm">我知道了</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import { checkFollow } from '@/api/common';
import YxAvatar from '@/components/yxAvatar';
export default {
	components: {
		YxAvatar,
	},
	name: 'sendGood',
	data() {
		return {
			isShow: false,
			isFollow: 10,
			wx_url: '',
			wx_info: {},
			timer: '',
			timeout: '',
		};
	},
	created() {
		this.initCheck();
	},
	watch: {
		isFollow: {
			handler(to, from) {
				if (to === 0) {
					this.timer = setInterval(() => {
						this.initCheck();
						// 每5分钟刷新一次
					}, 5 * 60 * 1000);
				} else if (to === 1) {
					clearInterval(this.timer);
					this.timeout = setTimeout(() => {
						this.isShow = false;
					}, 5000);
				}
			},
			immediate: true,
		},
	},
	beforeDestroy() {
		clearTimeout(this.timeout);
		clearInterval(this.timer);
	},
	methods: {
		async initCheck() {
			const { isFollow, wxInfo = {}, wxUrl } = await checkFollow({});
			this.isFollow = isFollow;
			//isFollow  0为未绑定1为绑定
			if (this.isFollow === 0) {
				this.isShow = true;
			}
			this.wx_info = wxInfo;
			this.wx_url = wxUrl;
		},
		confirm() {
			this.isShow = false;
			clearInterval(this.timer);
		},
	},
};
</script>
<style lang="less" scoped>
.follow {
	width: 450px;
	z-index: 3000;
	border: 1px solid #f7f8fa;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.public-img img {
	width: 100px;
	height: 100px;
}
.publicInfo {
	padding: 16px 18px;
	background-color: #f7f8fa;
}
.close {
	cursor: pointer;
}
</style>
