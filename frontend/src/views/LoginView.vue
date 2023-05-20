<template>

    <section class="hero is-light is-bold is-fullheight" id="app">
      <div class="hero-body">
        <div class="container ">
          <div class="columns is-centered ">
            <div class="has-background-white is-5-mobile is-5-tablet is-4-desktop is-4-widescreen box">
              <div class="title has-text-centered mt-4">
                <h1>
                  SVAutotire Sale & Service
                </h1>
              </div>
              <div class="subtitle mt-4">
                <form method="get" class="">
                  <div class="field ">
                    <label class="label">ชื่อผู้ใช้งาน</label>
                    <div class="control">
                      <input class="input" type="text" placeholder="กรอกชื่อผู้ใช้งาน" v-model="$v.username.$model" :class="{'is-danger': $v.username.$error}">
                    </div>
                    <template v-if="$v.username.$error">
                      <p class="help is-danger" v-if="!$v.username.required">ชื่อผู้ใช้งาน จำเป็นต้องกรอก</p>
                      <p class="help is-danger" v-if="!$v.username.minLength">ชื่อผู้ใช้งาน ต้องมีขนาดอย่างน้อย 5 ตัวอักษร</p>
                      <p class="help is-danger" v-if="!$v.username.maxLength">ชื่อผู้ใช้งาน มีขนาดได้มากสุด 20 ตัวอักษร</p>
                    </template>
                  </div>
                

                  <div class="field mt-5">
                    <label class="label">รหัสผ่าน</label>
                    <div class="control">
                      <input class="input" type="password" placeholder="กรอกรหัสผ่าน" v-model="$v.password.$model" :class="{'is-danger': $v.password.$error}">
                    </div>
                    <template v-if="$v.password.$error">
                      <p class="help is-danger" v-if="!$v.password.required">password จำเป็นต้องกรอก</p>
                      <p class="help is-danger" v-if="!$v.password.minLength">password ต้องมีขนาดอย่างน้อย 4 ตัวอักษร</p>
                      <p class="help is-danger" v-if="!$v.password.maxLength">password มีขนาดได้มากสุด 20 ตัวอักษร</p>
                      <p class="help is-danger" v-if="!$v.password.complex">password ต้องประกอบด้วย A-Z, a-z, 0-9</p>
                    </template>
                  </div>
                

                <div class="field">
                  <div class="control has-text-centered">
                    <!-- <button @click="test">test</button> -->
                    <a class="button is-info mb-4 mt-4 " @click="login()">เข้าสู่ระบบ</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
  <!-- script -->
</template>
<script>
  import axios from "axios";
  import { required, minLength, maxLength } from 'vuelidate/lib/validators'

  function complexPassword (value) {
        if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        return false
    }
    return true
    }

    export default {
    data() {
        return {
          username: '',
          password: ''
        }
      },
      validations: {
        username: {
            required: required, 
            minLength: minLength(5),
            maxLength: maxLength(20),
        },
        password: {
            required: required, 
            minLength: minLength(4),
            maxLength: maxLength(20),
            complex: complexPassword
        },
      methods:{
        login(){
          const data ={
            username: this.username,
            password: this.password
          }
          axios
        .post("http://localhost:3000/login", data)
        .then((res) => {
          const token = res.data;
          console.log(res.data)
          localStorage.setItem("token", token)
          // this.$emit("auth-change");
          this.$router.push({ path: "/stock" });
        }).catch((err) => {
          console.log(err)
          this.error = true
        })
        }
      
    },



  }
}
</script>