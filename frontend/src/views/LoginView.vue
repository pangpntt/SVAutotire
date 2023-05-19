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
                      <input class="input" type="text" placeholder="กรอกชื่อผู้ใช้งาน" v-model="username">
                      <span v-if="error === true" class="has-text-danger">กรุณากรอกชื่อผู้ใช้งานให้ถูกต้อง</span>
                    </div>
                  </div>

                  <div class="field mt-5">
                    <label class="label">รหัสผ่าน</label>
                    <div class="control">
                      <input class="input" type="password" placeholder="กรอกรหัสผ่าน" v-model="check_password">
                      <span v-if="error === true" class="has-text-danger">กรุณากรอกรหัสผ่านให้ถูกต้อง</span>
                    </div>
                  </div>

                  <div class="field">
                    <div class="control has-text-centered" >
                      <!-- <button @click="test">test</button> -->
                      <a class="button is-info mb-4 mt-4 " @click="check_login()">เข้าสู่ระบบ</a>
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
    export default {
    data() {
        return {
          username: '',
          password: '',
          error: false,
        }
      },
      methods:{
        login(){
          const data ={
            username: this.username,
            password: this.password
          }
          axios
          .get("http://localhost:3000/login", data)
          .then((res)=>{
            console.log(res)
            alert('success');
          }).catch((err)=>{
            console.log(err)
            this.error = true
          })
        },
        


      }
}
</script>