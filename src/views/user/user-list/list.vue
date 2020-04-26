<template>
	<div class="bg-white px-3" style="margin: -20px; margin-top: -1rem; margin-bottom: 60px!important;">
		<!-- 顶部按钮组件 -->
		<button-search class="pt-3" placeholder="手机号/邮箱/会员昵称">
			<!-- 左边 -->
			<template #left>
				<el-button size="mini" type="success" @click="openModel(false)">添加会员</el-button>
			</template>
			<template #form>
				<el-form inline ref="form" :model="form" label-width="80px">
					<el-form-item label="搜索内容" class="mb-0">
						<el-input v-model="search.keyword" size="mini" placeholder="手机号/邮箱/会员昵称"></el-input>
					</el-form-item>
					<el-form-item label="会员等级" class="mb-0">
						<el-select v-model="search.group_id" placeholder="请选择会员等级" size="mini">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="shanghai"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="发布时间" class="mb-0">
						<el-date-picker v-model="search.time" type="daterange" size="small" range-separator="至" start-placeholder="开始日期"
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
		<el-table :data="tableData" style="width: 100%" border class="mt-3">
			<el-table-column label="会员" width="280">
				<template slot-scope="scope">
					<div class="media">
						<img class="mr-3" style="width: 50px; height: 50px;border-radius: 100%;" :src="scope.row.avatar"
						 alt="Generic placeholder image">
						<div class="media-body">
							<h6 class="mt-0 d-flex align-items-center">
								{{scope.row.username}} <el-button type="text" size="mini" class="ml-auto">详情</el-button>
							</h6>
							用户id:{{scope.row.id}}
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="会员等级" align="center">
				<template slot-scope="scope">{{scope.row.level.name}}</template>
			</el-table-column>
			<el-table-column label="登录注册" align="center" width="300">
				<template slot-scope="scope">
					<div>注册时间：{{scope.row.create_time}}</div>
					<div>最后登录：{{scope.row.update_time}}</div>
				</template>
			</el-table-column>
			<el-table-column label="状态" align="center" width="120">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0"></el-switch>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" width="150">
				<template slot-scope="scope">
					<el-button type="text" size="mini" @click="openModel(scope)">修改</el-button>
					<el-button type="text" size="mini">重置密码</el-button>
					<el-button type="text" size="mini" @click="deleteItem(scope)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-footer class="border-top d-flex align-items-center px-0 position-fixed bg-white" style="bottom :0; left: 200px; right: 0; z-index: 100;">
			<div style="flex: 1;" class="px-2">
				<el-pagination :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
				 :total="400"></el-pagination>
			</div>
		</el-footer>
		<!-- 新增|修改模态框 -->
		<el-dialog title="添加会员" :visible.sync="createModel" top="5vh">
			<!-- 表单内容 -->
			<el-form :model="form" label-width="80px" ref="form">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="form.username" placeholder="用户名" size="mini" style="width: 25%;"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="form.password" placeholder="密码" size="mini" style="width: 25%;"></el-input>
				</el-form-item>
				<el-form-item label="昵称" prop="nickname">
					<el-input v-model="form.nickname" placeholder="昵称" size="mini" style="width: 25%;"></el-input>
				</el-form-item>
				<el-form-item label="头像">
					<el-color-picker size="mini" v-if="type == 1" :value="item.color" @change="onColorChange"></el-color-picker>
					<!-- 图片选择 -->
					<div>
						<span v-if="!form.avatar" class="btn btn-light border mr-2" @click="chooseImage"><i class="el-icon-plus"></i></span>
						<img v-else :src="form.avatar" style="width: 45px; height: 36px; cursor: pointer;" class="rounded"  @click="chooseImage"/>
					</div>
				</el-form-item>
				<el-form-item label="会员等级">
					<el-select v-model="form.level_id" placeholder="请选择会员等级" size="mini">
						<el-option label="普通会员" :value="1"></el-option>
						<el-option label="黄金会员" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="手机" prop="phone">
					<el-input v-model="form.phone" placeholder="手机" size="mini" style="width: 25%;"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="form.email" placeholder="邮箱" size="mini" style="width: 25%;"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="form.sex" size="mini">
						<el-radio :label="0" border>保密</el-radio>
						<el-radio :label="1" border>男性</el-radio>
						<el-radio :label="2" border>女性</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="状态">
					<el-radio-group v-model="form.status" size="mini">
						<el-radio :label="1" border>启用</el-radio>
						<el-radio :label="0" border>禁用</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="createModel = false">取消</el-button>
				<el-button type="primary" @click="submit">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import buttonSearch from '@/components/common/button-search.vue';
	export default {
		inject: ['app'],
		components: {
			buttonSearch
		},
		data() {
			return {
				currentPage: 1,
				createModel: false,
				editIndex: -1,
				tableData: [{
					id: 10,
					username: "用户名",
					avatar: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100987808,2324741924&fm=27&gp=0.jpg",
					level_id: 1,
					level: {
						id: 1,
						name: '普通会员'
					},
					create_time: "2019-07-24 15:52:56",
					update_time: "2019-07-24 15:52:56",
					status: 1, //启用
				}],
				search: {
					keyword: "",
					group_id: 0,
					time: ""
				},
				form: {
					username: '',
					password: '',
					nickname: '',
					avatar: '',
					level_id: 1,
					phone: '',
					email: '',
					sex: 0,
					status: 1,
				},
			};
		},
		methods: {
			// 选择头像
			chooseImage() {
				this.app.chooseImage((res)=>{
					this.form.avatar = res[0].url
				},1)
			},
			// 修改状态
			changeStatus(item) {
				// 请求服务器修改状态
				item.status = !item.status;
				this.$message({
					message: item.status ? '启用' : '禁用',
					type: 'success'
				});
			},
			// 添加规格
			submit() {
				this.$refs.form.validate(res => {
					if (res) {
						var msg = "添加"
						if (this.editIndex === -1) {
							this.tableData.unshift(this.form);
						} else {
							let item = this.tableData[this.editIndex]
							item.username = this.form.name,
							item.password = this.form.password,
							item.nickname = this.form.nickname,
							item.avatar = this.form.avatar,
							item.level_id = this.form.level_id,
							item.phone = this.form.phone,
							item.email = this.form.email,
							item.sex = this.form.sex,
							item.status = this.form.status,
							msg = "修改"
						}
						// 关闭模态框
						this.createModel = false;
						this.$message({
							message: msg + '成功',
							type: 'success'
						});
					}
				});
			},
			// 打开模态框
			openModel(e = false) {
				// 增加
				if (!e) {
					this.form = {
						username: '',
						password: '',
						nickname: '',
						avatar: '',
						level_id: 1,
						phone: '',
						email: '',
						sex: 0,
						status: 1,
					};
					this.editIndex = -1;
				} else {
					// 修改
					this.form = {
						username: e.row.name,
						password: '',
						nickname: e.row.nickname,
						avatar: e.row.avatar,
						level_id: e.row.level_id,
						phone: e.row.phone,
						email: e.row.email,
						sex: e.row.sex,
						status: e.row.status,
					};
					this.editIndex = e.$index;
				}

				// 打开dialog
				this.createModel = true;
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
			// 清空筛选条件
			clearSearch() {
				this.search = {
					keyword: "",
					group_id: 0,
					time: ""
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
	};
</script>

<style scoped lang="scss"></style>
