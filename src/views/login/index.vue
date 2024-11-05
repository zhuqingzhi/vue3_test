<template>
  <el-row class="wrapper">
    <el-col :span="8"></el-col>
    <el-col :span="8">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>

        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="submitForm(ruleFormRef)">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="8"></el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import api from '@/api'
import usePubKey from '@/store/usePubKey'
const ruleFormRef = ref<FormInstance>()
const { publicKey, generateSessionKey, encryptData } = usePubKey()

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input username'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  username: ''
})

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  username: [{ validator: validatePass2, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      // 生成会话密钥，随机生成16长度数组
      // 使用publickey 加密会话密钥
      const sessionKey = generateSessionKey()
      // 传输会话密钥给服务端
      const data1 = sessionKey
        // 使用公钥加密用户名密码
      console.log('dddd',ruleForm)
      const data2 = encryptData(JSON.stringify(ruleForm))
      // 登录
      api
        .login({
          data1,
          data2
        })
        .then((res:any) => {
          if (res.code === 0) {
            ElMessage({
              message: res.msg,
              type: 'success'
            })
          } else {
            ElMessage({
              message: res.msg,
              type: 'error'
            })
          }
        })
      //失败
      //   提示错误
    } else {
      ElMessage({
        message: '校验失败',
        type: 'error'
      })
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style scoped>
.wrapper {
  margin-top: 50%;
  transform: translateY(-70%);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>