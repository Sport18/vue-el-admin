<template>
	<table class="table table-sm table-bordered">
		<thead class="text-center">
			<tr>
				<th scope="col" :rowspan="th.rowspan" style="vertical-align: middle;" :colspan="th.colspan" v-for="(th, thi) in tableThs" :key="thi">{{ th.name }}</th>
			</tr>
			<tr>
				<th scope="col" rowspan="1" style="vertical-align: middle;" colspan="1" v-for="(th, thi) in skuLabels" :key="thi">{{ th.name }}</th>
			</tr>
		</thead>
		<tbody class="text-center">
			<tr v-for="(item, index) in list" :key="index">
				<!-- 商品规格 -->
				<th scope="row" v-for="(sku, skui) in item.skus" :key="skui">{{ sku.name }}</th>
				<td width="100">
					<span v-if="!item.image" class="btn btn-light border mr-2" @click="chooseImage(item)"><i class="el-icon-plus"></i></span>
					<img v-else :src="item.image" style="width: 45px; height: 36px; cursor: pointer;" class="rounded" @click="chooseImage(item)" />
				</td>
				<td width="100"><input type="number" v-model="item.pprice" class="form-control text-center" /></td>
				<td width="100"><input type="number" v-model="item.oprice" class="form-control text-center" /></td>
				<td width="100"><input type="number" v-model="item.cprice" class="form-control text-center" /></td>
				<td width="100"><input type="number" v-model="item.stock" class="form-control text-center" /></td>
				<td width="100"><input type="number" v-model="item.volume" class="form-control text-center" /></td>
				<td width="100"><input type="number" v-model="item.weight" class="form-control text-center" /></td>
				<td width="100"><input type="text" v-model="item.code" class="form-control text-center" /></td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
	inject:['app'],
	data() {
		return {
			list: []
		};
	},
	computed: {
		...mapGetters(['tableThs', 'tableData', 'skuLabels']),
		...mapState({
			sku_card: state => state.goods_create.sku_card
		})
	},
	watch: {
		tableData(newValue, oldValue) {
			this.list = newValue;
		}
	},
	mounted() {
		this.list = this.tableData;
	},
	methods:{
		// 选择图片
		chooseImage(item) {
			this.app.chooseImage((res)=>{
				item.image = res[0].url
			},1)
		}
	}
};
</script>

<style></style>
