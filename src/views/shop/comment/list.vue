<template>
	<div class="bg-white px-3" style="margin: -20px; margin-top: -1rem; margin-bottom: 60px!important;">
		<!-- 顶部按钮组件 -->
		<button-search class="pt-3" ref="buttonSearch" placeholder="要搜索的商品名称" @search="searchEvent">
			<!-- 左边 -->
			<template #left>
				<el-button size="mini" type="danger" @click="deleteAll()">批量删除</el-button>
			</template>
			<template #form>
				<el-form inline ref="form" :model="form" label-width="80px">
					<el-form-item label="评价用户" class="mb-0">
						<el-input v-model="form.username" size="mini" placeholder="评价用户"></el-input>
					</el-form-item>
					<el-form-item label="评价类型" class="mb-0">
						<el-select v-model="form.type" placeholder="请选择商品类型" size="mini">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="shanghai"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="发布时间" class="mb-0">
						<el-date-picker v-model="form.time" type="daterange" size="small" range-separator="至" start-placeholder="开始日期"
						 end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="info" size="mini" @click="searchEvent">搜索</el-button>
						<el-button size="mini" @click="clearSearch">清空筛选条件</el-button>
					</el-form-item>
				</el-form>
			</template>
		</button-search>
		<!-- 商品列表 -->

		<el-table :data="tableData" style="width: 100%" border class="mt-3" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="45" align="center"></el-table-column>
			<el-table-column type="expand">
				<template slot-scope="props">
					<div class="media">
						<img class="mr-3" src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1912113785,1587702892&fm=26&gp=0.jpg" alt="Generic placeholder image" style="width: 70px; height: 70px; border-radius: 100%;">
						<div class="media-body">
							<h6 class="mt-0 d-flex">
								用户名1
								<small>219-04-25 12:12:45</small>
								<el-button class="ml-auto" type="danger" size="mini">删除</el-button>
							</h6>
							评价内容
							<div class="media mt-3">
								<a class="pr-3" href="#">
									<img src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1912113785,1587702892&fm=26&gp=0.jpg" alt="Generic placeholder image" style="width: 70px; height: 70px; border-radius: 100%;">
								</a>
								<div class="media-body">
									<h6 class="mt-0 d-flex">
										用户名2
										<small>219-04-25 12:12:45</small>
										<el-button class="ml-auto" type="danger" size="mini">删除</el-button>
									</h6>
									回复内容
								</div>
							</div>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="id" label="ID" width="70" align="center"></el-table-column>
			<el-table-column prop="title" label="商品">
				<template slot-scope="scope">
					<div class="media">
						<img class="mr-3" :src="scope.row.goods.cover" style="width: 60px; height: 60px;" />
						<div class="media-body">
							<p class="mb-0">{{scope.row.goods.title}}</p>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="order" label="评价信息" width="200">
				<template slot-scope="scope">
					<div class="flex flex-column">
						<p>用户名：{{scope.row.username}}</p>
						<p>评分：
							<el-rate v-model="scope.row.star" disabled show-score text-color="#ff9900" score-template="{value}">
							</el-rate>
						</p>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="评价时间" align="center" width="150" prop="create_time">

			</el-table-column>
			<el-table-column label="是否显示" align="center" width="150">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.status"></el-switch>
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
				tableData: [{
					id: 1,
					goods: {
						title: "商品标题",
						cover: "http://static.yoshop.xany6.com/2018071718294208f086786.jpg"
					},
					username: "用户名",
					star: 5,
					create_time: "2019-12-12 14:15:21",
					status: 1,
				}],
				form: {
					username: "",
					type: "",
					time: ""
				}
			};
		},
		methods: {
			clearSearch() {

			},
			// 搜索事件
			searchEvent(e) {
				console.log(e);
			},
			// 批量删除
			deleteAll() {
				this.$confirm('是否删除选中规格', '提示', {
					confirmButtonText: '删除',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.multipleSelection.forEach(item => {
						let index = this.tableData.findIndex(v => v.id === item.id)
						if (index !== -1) {
							this.tableData.splice(index, 1)
						}
					})
					this.multipleSelection = []
					this.$message({
						message: '删除成功',
						type: 'success'
					});
				});
			},
			// 选中
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
		}
	};
</script>

<style scoped lang="scss"></style>
