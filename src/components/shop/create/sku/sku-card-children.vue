<template>
	<div class="border py-1 px-2 rounded mr-3 position-relative d-flex align-items-center">
		<div v-if="type != 0">
			<!-- 颜色选择器 -->
			<el-color-picker size="mini" v-if="type == 1" :value="item.color" @change="onColorChange"></el-color-picker>
			<!-- 图片选择 -->
			<template v-else>
				<span v-if="!item.image" class="btn btn-light border mr-2" @click="chooseImage"><i class="el-icon-plus"></i></span>
				<img v-else :src="item.image" style="width: 45px; height: 36px; cursor: pointer;" class="rounded"  @click="chooseImage"/>
			</template>
		</div>
		<input :value="item.name" @input="inputChange" class="form-control text-center border-0" style="width: 80px; font-size: 15px;" />
		<!-- 删除 -->
		<span class="btn btn-light p-0 position-absolute" style="line-height: 1; right: -10px; top: -10px;" @click="delSkuValue({ cardIndex: cardIndex, valueIndex: index })">
			<i class="el-icon-circle-close"></i>
		</span>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
	inject: ['app'],
	props: {
		type: {
			type: Number,
			default: 0
		},
		index: Number,
		item: Object,
		cardIndex: Number
	},
	methods: {
		...mapMutations(['delSkuValue', 'updateSkuValue']),
		vModel(key, value) {
			this.updateSkuValue({
				cardIndex: this.cardIndex,
				valueIndex: this.index,
				key,
				value
			});
		},
		inputChange(e) {
			this.vModel('name', e.target.value);
		},
		// 选择图片
		chooseImage() {
			this.app.chooseImage((res)=>{
				console.log(res);
				this.vModel('image', res[0].url)
			},1)
		},
		// 监听颜色选择器
		onColorChange(e) {
			this.vModel('color', e)
		} 
	}
};
</script>

<style></style>
