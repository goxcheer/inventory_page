<template>
  <div class="main" :style="img">
    <div class="login">
      <Card>
        <p slot="title">欢迎登陆</p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
          <FormItem prop="user">
            <Input type="text" v-model="formValidate.user" placeholder="Username">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formValidate.password" placeholder="Password">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" long @click="handleSubmit('formValidate')">登陆</Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import config from '@/config'
  const {homeName} = config;
  export default {
    name: "Login",
    data() {
      return {
        formValidate: {},
        ruleValidate: {
          user: [
            {required: true, message: 'Please fill in the user name', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Please fill in the password.', trigger: 'blur'},
            {type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
          ]
        },
        img: "url("+require('../assets/img/login-bg.jpg')+")"
      }
    },
    methods:{
      ...mapActions({
        login: 'login'
      }),
      handleSubmit(formName){
         let t =this;
         t.$refs[formName].validate((validate) => {
            if (validate){
           /*   t.login(t.formValidate).then((data) => {
                t.$Message.success("登陆成功");
                t.$router.push({name: homeName})
              })*/
            }
         })
      }
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .main {
    background-position: center;
    position: relative;
    background-size: cover;
    width: 100%;
    height: 100%;
    .login {
      width: 300px;
      position: absolute;
      right: 160px;
      top: 300px;
    }
  }

</style>
