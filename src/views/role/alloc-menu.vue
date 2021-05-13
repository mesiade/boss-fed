<template>
  <div class="alloc-menu">
    <el-card>
      <el-tree
        ref="menu-tree"
        node-key="id"
        :data="menus"
        :props="defaultProps"
        show-checkbox
        default-expand-all
      ></el-tree>
      <div style="margin: 20px"></div>
      <el-button>清空</el-button>
      <el-button
        type="primary"
        @click="onSave">保存</el-button>
    </el-card>
  </div>
</template>

<script>
import { getMenuNodeList, allocateRoleMenus } from '@/services/menu'

export default {
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [Number, String],
      required: true
    }
  },
  created () {
    this.loadMenus()
  },
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      }
    }
  },
  methods: {
    async loadMenus () {
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    async onSave () {
      // 发送请求，传递角色 ID 与 选中的菜单项 ID
      const { data } = await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList: this.$refs['menu-tree'].getCheckedKeys()
      })
      if (data.code === '000000') {
        this.$message.success('分配菜单成功')
        this.$router.push({
          name: 'role'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
