<template>
	<div class="bg-white px-3" style="margin: -20px; margin-top: -1rem; margin-bottom: 60px!important;">
		<el-tabs v-model="tabIndex" @tab-click="handleClick">
			<el-tab-pane :label="tab.name" v-for="(tab,tabI) in tabbars" :key="tabI">
				<!-- 顶部按钮组件 -->
				<button-search ref="buttonSearch" placeholder="要搜索的订单编号" @search="searchEvent">
					<!-- 左边 -->
					<template #left>
						<el-button type="success" size="mini">导出数据</el-button>
						<el-button type="danger" size="mini">批量删除</el-button>
					</template>
					<!-- 高级搜索表单 -->
					<template #form>
						<el-form inline ref="form" :model="form" label-width="80px">
							<el-form-item label="订单编号" class="mb-0">
								<el-input v-model="form.code" size="mini" placeholder="要搜索的订单编号"></el-input>
							</el-form-item>
							<el-form-item label="订单状态" class="mb-0">
								<el-select v-model="form.type" placeholder="请选择订单状态" size="mini">
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="shanghai"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="下单时间" class="mb-0">
								<el-date-picker v-model="form.time" type="daterange" size="small" range-separator="至" start-placeholder="开始日期"
								 end-placeholder="结束日期">
								</el-date-picker>
							</el-form-item>
							<el-form-item label="收货人" class="mb-0">
								<el-input v-model="form.username" size="mini" placeholder="收货人"></el-input>
							</el-form-item>
							<el-form-item label="手机号" class="mb-0">
								<el-input v-model="form.phone" size="mini" placeholder="手机号"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="info" size="mini" @click="searchEvent">搜索</el-button>
								<el-button size="mini" @click="clearSearch">清空筛选条件</el-button>
							</el-form-item>
						</el-form>
					</template>
				</button-search>
				<!-- 商品列表 -->
				<el-table :data="tableData[tabI].list" style="width: 100%" border class="mt-3" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="45" align="center"></el-table-column>
					<el-table-column prop="title" label="商品信息" width="300">
						<template slot-scope="scope">
							<div class="d-flex">
								<div style="flex: 1;">
									<p class="mb-0">订单编号：</p>
									<p class="mb-1"><small>12345364354</small></p>
								</div>
								<div style="flex: 1;">
									<p class="mb-0">下单时间：</p>
									<p class="mb-1"><small>2019-05-12 12:23:56</small></p>
								</div>
							</div>
							<div class="media">
								<img class="mr-3" :src="scope.row.cover" style="width: 60px; height: 60px;" />
								<div class="media-body">
									<p class="mb-0">
										<a class="text-primary">{{scope.row.title}}</a>
									</p>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="实付款" align="center" width="120">
						<template slot-scope="scope">
							<span>￥20</span>
							<p><small>(含运费：￥0.00)</small></p>
						</template>
					</el-table-column>
					<el-table-column prop="sale_count" label="买家" align="center" width="120">
						<template slot-scope="scope">
							<span>用户名</span>
							<p><small>(用户id：11)</small></p>
						</template>
					</el-table-column>
					<el-table-column label="支付方式" align="center" width="100">
						<template slot-scope="scope">
							<span class="badge badge-success">微信支付</span>
						</template>
					</el-table-column>
					<el-table-column prop="stock" label="配送方式" align="center"></el-table-column>
					<el-table-column label="交易状态" align="center" width="150">
						<template slot-scope="scope">
							<div>付款状态： <span class="badge badge-success">已付款</span></div>
							<div>发货状态： <span class="badge badge-success">待发货</span></div>
							<div>收货状态： <span class="badge badge-success">待收货</span></div>
						</template>
					</el-table-column>
					<el-table-column label="操作" align="center" width="140">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" plain>订单详情</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-footer class="border-top d-flex align-items-center px-0 position-fixed bg-white" style="bottom :0; left: 200px; right: 0; z-index: 100;">
					<div style="flex: 1;" class="px-2">
						<el-pagination :current-page="tableData[tabI].currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100"
						 layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination>
					</div>
				</el-footer>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import buttonSearch from "@/components/common/button-search.vue"
	export default {
		components: {
			buttonSearch
		},
		data() {
			return {
				tabIndex: 0,
				tabbars: [{
						name: "全部"
					},
					{
						name: "待付款"
					},
					{
						name: "待收货"
					},
					{
						name: "已发货"
					},
					{
						name: "已收货"
					},
					{
						name: "已完成"
					},
					{
						name: "已关闭"
					},
					{
						name: "退款中"
					},
				],
				form: {
					code: "",
					type: "",
					time: "",
					username: "",
					phone: ""
				},
				multipleSelection: [],
				tableData: []
			}
		},
		created() {
			this.__getData()
		},
		methods: {
			// 生成数据
			__getData() {
				for (let i = 0; i < this.tabbars.length; i++) {
					this.tableData.push({
						currentPage: 1,
						list: []
					})
					for (let j = 0; j < 20; j++) {
						this.tableData[i].list.push({
							id: j,
							title: '荣耀 V10全网通 标配版' + i + '-' + j,
							cover: 'http://static.yoshop.xany6.com/2018071718294208f086786.jpg',
							create_time: '2019-07-17 18:34:14',
							category: "手机",
							type: "普通商品",
							sale_count: 20,
							order: 100,
							status: 1,
							stock: 200,
							price: 1000,
							ischeck: 1 // 0未审核，1通过，2不通过
						})
					}
				}
			},
			// 删除当前商品
			deleteItem(index) {
				this.$confirm('是否删除该商品', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消'
				}).then(() => {
					this.tableData[this.tabIndex].list.splice(index, 1)
				})
			},
			// 加载数据
			handleClick(tab, event) {
				console.log(tab.index);
			},
			// 清空筛选条件
			clearSearch() {
				this.form = {
					code: "",
					type: "",
					time: "",
					username: "",
					phone: ""
				}
				this.$refs.buttonSearch[this.tabIndex].closeSuperSearch()
			},
			// 搜索事件
			searchEvent(e = false) {
				// 简单搜索
				if (typeof e === 'string') {
					return console.log('简单搜索', e);
				}
				// 高级搜索
				console.log('高级搜索');
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			}
		}
	}
</script>

<style scoped lang="scss">
</style>
