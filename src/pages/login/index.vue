<template>
  <div class="login-body h tw_c">
    <div class="videoContainer">
      <div class="bjcontent">
        <div class="headline tw_cl">
          <img style="width: 54px" :src="$store.getters.systemIcon" />
          <div>
            <h1 class="login_title">{{ $store.getters.productPrimaryName }}</h1>
            <p class="white mt5 fs14" style="letter-spacing: 2px">{{ $store.getters.productSecondaryName }}</p>
          </div>
        </div>
        <img class="bjtext" src="../../assets/bjtext.png" />
        <div class="bjshadow"></div>
      </div>
    </div>
    <div class="login-container overflow relative">
      <div class="head">
        <img @click="showAccoutCode = !showAccoutCode" class="logo pointer" src="../../assets/QRcode.png" />
        <div class="register">欢迎登录</div>
      </div>
      <el-tabs v-model="ruleForm.tabs" stretch>
        <el-tab-pane label="账号登录" name="first">
          <el-form :rules="rules" :model="ruleForm" ref="loginForm" class="login-form">
            <el-form-item prop="username">
              <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off" placeholder="手机号/账号">
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <User />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off" placeholder="请输入密码" clearable show-password @change="submitForm">
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <Lock />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-row>
              <el-checkbox v-model="ruleForm.checked">记住密码</el-checkbox>
              <el-link :underline="false">忘记密码?</el-link>
            </el-row>
            <el-button :loading="loading" class="mt20 tw_ct" type="primary" @click="submitForm">登录</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="手机验证码登录" name="second">
          <el-form :rules="rules" :model="ruleForm" ref="loginForm" class="login-form">
            <el-form-item prop="username">
              <el-input type="text" v-model.trim="ruleForm.Iphone" autocomplete="off" placeholder="手机号/账号">
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <Iphone />
                  </el-icon>
                </template>
              </el-input>
              <el-row style="margin-top: 20px">
                <el-col :span="8">
                  <el-input type="text" v-model.trim="ruleForm.phone" autocomplete="off" style="width: 200px; height: 50px" placeholder="请输入验证码">
                    <template #prefix>
                      <el-icon class="el-input__icon">
                        <Message />
                      </el-icon>
                    </template>
                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-button type="primary" style="width: 150px; height: 50px; margin-right: -35px">获取验证码</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-button :loading="loading" class="mt20 tw_ct" type="primary" @click="submitForm">登录</el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div class="bottomtext">浏览器推荐下载：谷歌 火狐 I V3.4.1.Beta</div>
      <!-- 二维码 -->
      <div
        style="z-index: 999"
        class="sancode erCode w h positionTl transition bgWhite"
        :style="`${showAccoutCode ? 'transform: translateY(-100%);' : ''}transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1)`"
      >
        <div class="QRcode">微信扫码下载</div>
        <div class="trabecula"></div>
        <img @click="showAccoutCode = !showAccoutCode" class="display pointer" src="../../assets/display.png" />
        <img class="cheanda" src="../../assets/cheanda.png" />
        <div class="text1">
          请使用微信扫描二维码下载
          <br />
          <span>“车安哒”</span>
        </div>
        <div class="bottomtext" style="padding-top: 325px">浏览器推荐下载：谷歌 火狐 I V3.4.1.Beta</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User, Lock, Iphone } from '@element-plus/icons-vue'
const loginForm = ref(null)
let loading = ref(false)
let showAccoutCode = ref(true)
let code = new Date().getTime()
let ruleForm = ref({
  appId: 'web_cff00a62-7561-4915-8027-865a819b6515',
  // password: 'Tk7chtH!3mk:Zhp',
  // username: 'admin',
  password: '',
  username: '',
  tabs: 'first',
  checked: false, //记住密码
  // phone: '',
})
let rules = ref({
  username: [{ required: 'true', message: '账户不能为空', trigger: 'blur' }],
  password: [{ required: 'true', message: '密码不能为空', trigger: 'blur' }],
})
const router = useRouter()
const store = useStore()

//登录行为
async function login() {
  let isChecked = ruleForm.value.checked

  //判断是否点击记住密码
  if (isChecked) {
    localStorage.setItem('username', ruleForm.value.username)
    // localStorage.setItem('password', Base64.encode(ruleForm.value.password))
    localStorage.setItem('password', ruleForm.value.password)
  } else {
    localStorage.removeItem('username')
    localStorage.removeItem('password')
  }
}

const submitForm = async () => {
  // @ts-ignore
  loginForm.value.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
      store
        .dispatch('user/login', ruleForm.value)
        .then(async () => {
          login()
          loading.value = false
          await store.dispatch('common/setoEnumerate')
          await store.dispatch('common/setArrEnumerate')
          await store.dispatch('menus/getMenus')
          await store.dispatch('user/getUserInfo')
          router.push('/')
        })
        .catch((err) => {
          loading.value = false
        })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
const resetForm = () => {
  loginForm.value.resetFields()
}
//记住密码
//加载页面时，查看账户密码是否存在
const hasUserCodeOrPassword = () => {
  if (localStorage.getItem('username') && localStorage.getItem('password')) {
    ruleForm.username = localStorage.getItem('username')
    // ruleForm.password = Base64.decode(localStorage.getItem('password')) //解密
    ruleForm.password = localStorage.getItem('password')
    ruleForm.value.checked = true
  }
}
hasUserCodeOrPassword() //调用函数
</script>

<style lang="scss" scoped>
.login-body {
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: flex-end;
  .login_title {
    font-size: 34px;
    letter-spacing: 8px;
    color: #fff;
  }
  .videoContainer {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    // z-index: -100;
    .bjcontent {
      .headline {
        display: flex;
        position: absolute;
        top: 32px;
        left: 49px;
        z-index: 2;
        img {
          margin-right: 19px;
        }
      }
      .thirdparty {
        width: 100%;
        height: 51px;
      }
      h2 {
        color: rgba(255, 255, 255, 1);
        font-size: 48px;
        font-weight: 400;
        font-family: 'PangMenZhengDao';
      }
    }
    .bjtext {
      width: 39%;
      position: absolute;
      top: 27%;
      left: 15%;
    }
    .bjshadow {
      width: 100%;
      height: 110px;
      z-index: 1;
      position: absolute;
      top: 0;
      background: linear-gradient(180deg, rgba(84, 126, 232, 0.71) 0%, rgba(88, 157, 252, 0) 100%);
    }
  }
  .videoContainer:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    display: block;
    z-index: -1;
    top: 0;
    left: 0;
    background: rgba(25, 29, 34, 0.65);
  }
  .fullscreenVideo {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  .login-container {
    width: 440px;
    z-index: 1;
    height: 530px;
    border-radius: 20px;
    margin-right: 141px;
    border: 1px solid rgba(151, 151, 151, 1);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 20px 0 rgba(39, 121, 247, 0.2);
    .el-tabs {
      margin: 0px 40px 0px 40px;
    }
    .head {
      margin: 0px 0px 36px 40px;
      .tips {
        color: #999;
      }
      .logo {
        position: relative;
        left: 327px;
        top: 13px;
      }
      .register {
        color: rgba(51, 51, 51, 1);
        font-size: 30px;
        font-weight: 400;
        font-family: 'SourceHanSansCN';
      }
    }
  }
}

.mt20 {
  width: 360px;
  height: 50px;
  border-radius: 4px;
  opacity: 1;
  margin-left: 0px;
  border: 1px solid rgba(151, 151, 151, 1);
  background: rgba(39, 121, 247, 1);
}
// tabs样式
.login-body {
  :deep(.el-tabs__item) {
    font-size: 20px;
    margin-bottom: 13px;
  }
}
.el-input {
  width: 360px;
  height: 50px;
  opacity: 1;
  border-radius: 4px;
}
.el-form-item__content {
  margin-left: 0px;
}
// icon图标样式
.el-input__icon {
  font-size: 24px;
}
// icon显示密码样式
.login-body {
  :deep(.el-input__password) {
    font-size: 20px;
  }
}
.el-row {
  display: flex;
  justify-content: space-between;
  // 忘记密码样式
  .el-link {
    opacity: 1;
    font-size: 14px;
    margin-top: 8px;
    font-family: '苹方';
    color: rgba(39, 121, 247, 1);
  }
}
.el-form-item {
  margin-left: 0px;
}
.el-form--label-top .el-form-item__label {
  padding: 0;
}

.login-form .el-form-item {
  margin-bottom: 20px;
}
.sancode {
  .QRcode {
    position: relative;
    top: 40px;
    left: 40px;
    font-size: 30px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    font-family: 'SourceHanSansCN';
  }
  .trabecula {
    width: 360px;
    height: 2px;
    border-radius: 50px;
    background-color: #f3f5fb;
    position: absolute;
    top: 103px;
    left: 40px;
  }
  .display {
    position: relative;
    left: 367px;
    bottom: 17px;
  }
  .cheanda {
    position: absolute;
    top: 130px;
    left: 115px;
  }
  .text1 {
    position: absolute;
    bottom: 115px;
    left: 130px;
    color: rgba(51, 51, 51, 1);
    font-size: 14px;
    font-weight: 900;
    font-family: '苹方';
    text-align: center;
    span {
      line-height: 25px;
    }
  }
}
.bottomtext {
  font-size: 12px;
  font-weight: 400;
  bottom: 50px;
  left: 40px;
  position: absolute;
  font-family: 'SourceHanSansCN';
  color: rgba(153, 153, 153, 1);
}
</style>
