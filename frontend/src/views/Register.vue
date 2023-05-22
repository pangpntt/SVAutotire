<template>
  <section class="hero is-light is-bold is-fullheight" id="app">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div
            class="has-background-white is-5-mobile is-5-tablet is-4-desktop is-4-widescreen box"
          >
            <div class="title has-text-centered mt-4">
              <h1>SVAutotire Sale & Service</h1>
            </div>
            <div class="subtitle mt-4">
              <form method="get" class="">
                <div class="field">
                  <label class="label">ชื่อ</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="กรอกชื่อผู้ใช้งาน"
                      v-model="$v.firstname.$model"
                      :class="{ 'is-danger': $v.firstname.$error }"
                    />
                  </div>
                  <template v-if="$v.firstname.$error">
                    <p class="help is-danger" v-if="!$v.firstname.required">
                      ชื่อ จำเป็นต้องกรอก
                    </p>
                    <p class="help is-danger" v-if="!$v.firstname.maxLength">
                      ชื่อ มีขนาดได้มากสุด 50 ตัวอักษร
                    </p>
                  </template>
                </div>

                <div class="field">
                  <label class="label">นามสกุล</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="กรอกชื่อผู้ใช้งาน"
                      v-model="$v.lastname.$model"
                      :class="{ 'is-danger': $v.lastname.$error }"
                    />
                  </div>
                  <template v-if="$v.lastname.$error">
                    <p class="help is-danger" v-if="!$v.lastname.required">
                      นามสกุล จำเป็นต้องกรอก
                    </p>
                    <p class="help is-danger" v-if="!$v.lastname.maxLength">
                      นามสกุล มีขนาดได้มากสุด 50 ตัวอักษร
                    </p>
                  </template>
                </div>

                <div class="field">
                  <label class="label">username</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="กรอกชื่อผู้ใช้งาน"
                      v-model="$v.username.$model"
                      :class="{ 'is-danger': $v.username.$error }"
                    />
                  </div>
                  <!-- <p class="help is-danger">error</p> -->
                  <template v-if="$v.username.$error">
                    <p class="help is-danger" v-if="!$v.username.required">
                      username จำเป็นต้องกรอก
                    </p>
                    <p class="help is-danger" v-if="!$v.username.minLength">
                      username ต้องมีขนาดอย่างน้อย 5 ตัวอักษร
                    </p>
                    <p class="help is-danger" v-if="!$v.username.maxLength">
                      username มีขนาดได้มากสุด 20 ตัวอักษร
                    </p>
                    <p class="help is-danger" v-if="!$v.username.complex">
                      username ต้องเป็นตัวอักษรภาษาอังกฤษและตัวเลขเท่านั้น
                    </p>
                  </template>
                </div>

                <div class="field mt-5">
                  <label class="label">password</label>
                  <div class="control">
                    <input
                      class="input"
                      type="password"
                      placeholder="กรอกรหัสผ่าน"
                      v-model="$v.password.$model"
                      :class="{ 'is-danger': $v.password.$error }"
                    />
                  </div>
                  <template v-if="$v.password.$error">
                    <p class="help is-danger" v-if="!$v.password.required">
                      password จำเป็นต้องกรอก
                    </p>
                    <p class="help is-danger" v-if="!$v.password.minLength">
                      password ต้องมีขนาดอย่างน้อย 4 ตัวอักษร
                    </p>
                    <p class="help is-danger" v-if="!$v.password.maxLength">
                      password มีขนาดได้มากสุด 20 ตัวอักษร
                    </p>
                    <p class="help is-danger" v-if="!$v.password.complex">
                      password ต้องประกอบด้วย A-Z, a-z, 0-9
                    </p>
                  </template>
                </div>

                <div class="field mt-5">
                  <label class="label">confirm password</label>
                  <div class="control">
                    <input
                      class="input"
                      type="password"
                      placeholder="กรอกรหัสผ่าน"
                      v-model="$v.confirm_password.$model"
                      :class="{ 'is-danger': $v.confirm_password.$error }"
                    />
                  </div>
                  <template v-if="$v.confirm_password.$error">
                    <p
                      class="help is-danger"
                      v-if="!$v.confirm_password.required"
                    >
                      confirm_password ต้องตรงกับ password
                    </p>
                  </template>
                </div>

                <div class="field mt-5">
                  <label>ตำแหน่ง</label><br />
                  <div class="select">
                    <select class="select" v-model="role">
                      <option value="Employee">พนักงาน</option>
                      <option value="Manager">ผู้จัดการ</option>
                    </select>
                  </div>
                </div>

                <div class="field">
                  <div class="control has-text-centered">
                    <router-link to="/">
                      <input @click="submit()" type="button" class="button" value="ลงทะเบียน" />
                    </router-link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { RouterLink } from "vue-router";
import {
  required,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";

function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}

function patternUsername(value) {
  if (!(value.match(/[a-z]/) || value.match(/[A-Z]/) || value.match(/[0-9]/))) {
    return false;
  }
  return true;
}

export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      password: "",
      confirm_password: "",
      firstname: "",
      lastname: "",
      role: ''
    };
  },
  validations: {
    username: {
      required: required,
      minLength: minLength(5),
      maxLength: maxLength(20),
      complex: patternUsername,
    },
    password: {
      required: required,
      minLength: minLength(4),
      maxLength: maxLength(20),
      complex: complexPassword,
    },
    confirm_password: {
      sameAs: sameAs("password"),
    },
    firstname: {
      required: required,
      maxLength: maxLength(50),
    },
    lastname: {
      required: required,
      maxLength: maxLength(50),
    },
  },
  methods: {
    submit() {
        const token = localStorage.getItem('token');
      const config = {
        headers: {
          "x-access-token": token,
        },
      };
      const data = {
        username: this.username,
        firstname:this.firstname,
        lastname: this.lastname,
        password: this.password ,
        role: this.role
      }
      axios
        .get("http://localhost:3000/register", data, config)
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout() {
      console.log(1);
      localStorage.removeItem("token").then(() => {
        this.$router.push({ path: "/" });
      });
    },
  },
  components: { RouterLink },
};
</script>