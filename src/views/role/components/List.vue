<template>
  <div class="role-list">
    <el-card class="box-card">

      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form">
          <el-form-item label="角色名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              v-loading="isLoading"
              type="primary"
              @click="onSubmit"
            >查询</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-button @click="handleAdd">添加角色</el-button>

      <el-table
        :data="roles"
        style="width: 100%"
        v-loading="isLoading">
        <el-table-column
          prop="id"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加时间">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="150px">
          <template slot-scope="scope">
            <div>
              <el-button
                type="text"
                @click="$router.push({
                  name: 'alloc-menu',
                  params: {
                    roleId: scope.row.id
                  }
                })"
              >分配菜单</el-button>
              <el-button
                type="text"
              >分配资源</el-button>
            </div>
            <div>
              <el-button
                type="text"
                @click="handleEdit(scope.row)"
                >编辑</el-button>
              <el-button
                type="text"
                @click="handleDelete(scope.row)"
                >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加角色对话框 -->
      <el-dialog
        :title="isEdit ? '编辑角色' : '添加角色'"
        :visible.sync="dialogVisible"
        @opened="handleOpen"
        width="30%">
        <!-- 将添加与编辑功能单独封装到组件中 -->
        <create-or-edit
          :is-edit="isEdit"
          :role-id="roleId"
          @success="handleSuccess"
          @cancel="handleCancel"
          ref="createOrEdit"
        ></create-or-edit>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
import CreateOrEdit from './CreateOrEdit'
// 引入请求方法
import { getRoles, deleteRole } from '@/services/role'

export default {
  name: 'RoleList',
  data () {
    return {
      form: {
        name: ''
      },
      isLoading: false,
      roles: [],
      // 控制对话框显示
      dialogVisible: false,
      // 控制对话框的功能状态
      isEdit: false,
      // 存储正在编辑的角色 ID
      roleId: ''
    }
  },
  components: {
    CreateOrEdit
  },
  created () {
    this.loadRoles()
  },
  methods: {
    handleOpen () {
      console.log(this.$refs, this.$refs.createOrEdit)
      this.$refs.createOrEdit.checkRoleStatus()
    },
    // 点击添加按钮触发
    handleAdd () {
      this.dialogVisible = true
      this.isEdit = false
    },
    // 监听子组件的添加状态，成功时触发
    handleSuccess () {
      // 隐藏对话框
      this.dialogVisible = false
      // 刷新列表
      this.loadRoles()
    },
    handleCancel () {
      this.dialogVisible = false
    },
    onSubmit () {

    },
    onReset () {

    },
    handleEdit (role) {
      this.isEdit = true
      this.roleId = role.id
      this.dialogVisible = true
      console.log('edit id ' + role.id)
    },
    handleDelete (role) {
      this.$confirm(`确认删除角色：${role.name}?`, '删除提示')
        .then(async () => {
          await deleteRole(role.id)
          this.$message.success('删除成功')
          this.loadRoles()
        })
        .catch(err => {
          if (err && err.response) {
            this.$message.error('删除失败，请重试')
          } else {
            this.$message.info('取消删除')
          }
        })
    },
    async loadRoles () {
      this.isLoading = true
      const { data } = await getRoles(this.form)
      this.roles = data.data.records
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
