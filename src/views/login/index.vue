<template>
  <div class="login">
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    label-width="80px"
    :label-position="'top'">
    <el-form-item
      label="手机号"
      prop="phone"
      >
      <el-input v-model="form.phone"></el-input>
    </el-form-item>

    <el-form-item
      label="密码"
      prop="password"
      >
      <el-input
      v-model="form.password"
      type = "password"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary"
      @click="onSubmit"
      :loading="isLoginLoading"
      >登录</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>

// 引入封装的接口功能组件
import { login } from '@/services/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      // 存储表单数据的独享
      form: {
        phone: '',
        password: ''
      },
      // 用于设置表单校验规则
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度为6到18位', trigger: 'blur' }
        ]
      },
      // 用于保存加载状态
      isLoginLoading: false
    }
  },
  methods: {
    async onSubmit () {
      // this.$refs.form.validate(valid => {})
      try {
        // 1. 设置校验成功后的功能
        await this.$refs.form.validate()

        // 2. 发送请求
        this.isLoginLoading = true

        const { data } = await login(this.form)

        this.isLoginLoading = false

        // 3.响应处理
        if (data.state === 1) {
          this.$message.success('登录成功')
          // 将用户信息存储在vuex中
          this.$store.commit('setUser', data.content)

          // 根据可能存在的redirect数据进行跳转设置
          this.$router.push(this.$route.query.redirect || '/')
        } else {
          this.$message.error('登录失败')
        }
      } catch (err) {
        // 设置校验失败后的功能
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  // 设置内部元素垂直水平居中
  justify-content: center;
  align-items: center;

  .el-form {
    background-color: #fff;
    padding: 20px;
    width: 300px;
    border-radius: 10px;

    .el-button{
      width: 100%;
    }
  }
}
</style>
