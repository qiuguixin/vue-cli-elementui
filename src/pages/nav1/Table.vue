<template>
	<section>
		<!--头部工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" border highlight-current-row stripe v-loading="listLoading" @selection-change="selsChange" max-height="700" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="用户名" min-width="120" sortable>
			</el-table-column>
			<el-table-column prop="phone" label="手机" min-width="150" sortable>
			</el-table-column>
			<el-table-column prop="realName" label="真实姓名" width="140" sortable>
			</el-table-column>
			<el-table-column prop="roleName" label="角色" width="120" sortable>
			</el-table-column>
			<el-table-column prop="email" label="邮箱" min-width="180" sortable>
			</el-table-column>
			<el-table-column prop="state" label="状态" width="100" :formatter="formatState" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150" fixed="right">
				<template scope="scope">
					<el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button v-if="scope.row.state == 1" type="text" size="small" @click="handleUpdateState(scope.row.id, 2)">冻结</el-button>
					<el-button v-if="scope.row.state == 2" type="text" size="small" @click="handleUpdateState(scope.row.id, 1)">解除冻结</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--底部工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger"
			@click="batchRemove"
			:disabled="this.sels.length===0">批量删除</el-button>
			<!-- <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination> -->
			<el-pagination
      @current-change="handleCurrentChange"
      :page-sizes="[20, 40, 100, 200]"
      :page-size="40"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
			style="float:right;">
    </el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" ref="editForm">
				<el-form-item label="用户名" prop="name">
					<el-input v-model="editForm.name" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="真实姓名" prop="realName">
					<el-input v-model="editForm.realName" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="角色" prop="role">
					<el-select v-model="editForm.role" placeholder="请选择">
			    <el-option
			      v-for="item in roles"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import NProgress from 'nprogress'
	import { getUserList, updateUserStateToFreezeApi, updateUserStateToUnfreezeApi, batchRemoveUser, editUserApi, addUser, getRolesApi } from '../../api/api';


	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				rows: 40,
				listLoading: false,
				sels: [],//列表选中列
				roles: [],
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				//编辑界面数据
				editForm: {
					id: '',
					name: '',
					realName: '',
					role: '',
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					phone: '',
					realName: '',
					role: '',
					email: '',
					state: ''
				}

			}
		},
		methods: {
			//性别显示转换
			formatState: function (row, column) {
				return row.state == 1 ? '正常' : row.state == 2 ? '冻结' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				this.listLoading = true;
				NProgress.start();

				let para = {
					page: this.page,
					rows: this.rows,
					name: this.filters.name
				};
				getUserList(para).then((res) => {
					res = res.data;
					this.listLoading = false;
					NProgress.done();

					if(res.resCode == 2){
						this.$router.push({ path: '/login' });
						return;
					}
					let VO = res.datas.list.map((user) =>{
						return {
						id: user.id,
						name: user.userName,
						phone: user.phone,
						realName: user.realName,
						role: user.powerId,
						roleName: user.roleName,
						email: user.email,
						state: user.state
					}});
					this.total = res.datas.total;
					this.users = VO;
				});
			},
			getRoles(){
				getRolesApi().then((res) => {
					res = res.data;
					console.log(res);
					if(res.resCode == 2){
						this.$router.push({ path: '/login' });
						return;
					}

					let VO = res.datas.map((role) =>{
						return {
						value: role.id,
						label: role.name
					}});
					this.roles = VO;
				});
			},
			//删除
			handleUpdateState: function (id, state) {
				if(state == 1){
					updateState(id, '确认冻结吗?', updateUserStateToFreezeApi);
				}else if(state == 2){
					updateState(id, '确认解除冻结吗?', updateUserStateToUnfreezeApi);
				}

				function updateState(id, tipMsg, action){
					this.$confirm(tipMsg, '提示', {
						type: 'warning'
					}).then(() => {
						this.listLoading = true;
						NProgress.start();

						let para = {
							id: id
						 };
						action(para).then((res) => {
							this.listLoading = false;
							NProgress.done();
							this.$notify({
								title: '成功',
								message: '操作成功',
								type: 'success'
							});
							this.getUsers();
						});
					}).catch(() => {

					});
				}
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
				console.log(this.editForm);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							NProgress.start();

							let para = {
								id: this.editForm.id,
								roleId: this.editForm.role
							};

							editUserApi(para).then((res) => {
								this.editLoading = false;
								NProgress.done();

								this.$notify({
									title: '成功',
									message: '提交成功',
									type: 'success'
								});

								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								NProgress.done();
								this.$notify({
									title: '成功',
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						NProgress.done();
						this.$notify({
							title: '成功',
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getUsers();
			this.getRoles();
		}
	}

</script>

<style scoped>
.demo-table-expand {
	 font-size: 0;
 }
 .demo-table-expand label {
	 width: 90px;
	 color: #99a9bf;
 }
 .demo-table-expand .el-form-item {
	 margin-right: 0;
	 margin-bottom: 0;
	 width: 50%;
 }
</style>
