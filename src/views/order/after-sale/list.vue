<template>
	<div class="bg-white px-3" style="margin: -20px; margin-top: -1rem; margin-bottom: 60px!important;">
		<!-- 顶部按钮组件 -->
		<button-search class="pt-3">
			<template #right>
				<div class="d-flex align-items-center">
					<el-date-picker v-model="search.time" type="daterange" size="medium" range-separator="至" start-placeholder="开始日期"
					 end-placeholder="结束日期">
					</el-date-picker>
					<el-input v-model="search.keyword" size="medium" placeholder="请输入订单号" class="mx-2" style="width: 200px;"></el-input>
					<el-button size="medium" type="infor">搜索</el-button>
				</div>
			</template>
		</button-search>
		<!-- 商品列表 -->
		<el-table :data="tableData" style="width: 100%" border class="mt-3" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="45" align="center"></el-table-column>
			<el-table-column prop="name" label="商品信息"></el-table-column>
			<el-table-column prop="username" label="商品清单" align="center"></el-table-column>
			<el-table-column prop="price" label="订单金额" align="center"></el-table-column>
			<el-table-column prop="price" label="收货信息" align="center"></el-table-column>
			<el-table-column prop="price" label="买家" align="center"></el-table-column>
			<el-table-column prop="content" label="交易状态" align="center"></el-table-column>
			<el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
			<el-table-column label="操作" align="center" width="150">
				<template slot-scope="scope">
					<el-button-group>
						<el-button type="danger" size="mini" plain @click="deleteItem(scope)">删除</el-button>
					</el-button-group>
				</template>
			</el-table-column>
		</el-table>
		<el-footer class="border-top d-flex align-items-center px-0 position-fixed bg-white" style="bottom :0; left: 200px; right: 0; z-index: 100;">
			<div style="flex: 1;" class="px-2">
				<el-pagination :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
				 :total="400"></el-pagination>
			</div>
		</el-footer>
	</div>
</template>

<script>
	import buttonSearch from '@/components/common/button-search.vue';
	export default {
		components: {
			buttonSearch
		},
		data() {
			return {
				multipleSelection: [],
				currentPage: 1,
				tableData: [],

				search: {
					time: "",
					keyword: ""
				}
			};
		},
		methods: {
			// 选中
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 删除单个
			deleteItem(scope) {
				this.$confirm('是否删除该规格', '提示', {
					confirmButtonText: '删除',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.tableData.splice(scope.$index, 1);
					this.$message({
						message: '删除成功',
						type: 'success'
					});
				});
			},
		}
	};
</script>

<style scoped lang="scss">
	.sku-list-item:hover {
		background-color: #F4F4F4;
		cursor: pointer;
	}

	.sku-list-item>i {
		display: none;
	}

	.sku-list-item:hover>i {
		display: inline-block;
	}

	.sku-list-item:hover>span {
		display: none;
	}
</style>
