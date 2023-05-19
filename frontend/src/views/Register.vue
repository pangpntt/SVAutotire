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
                                    <label class="label">ชื่อ</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="กรอกชื่อผู้ใช้งาน"
                                            v-model="check_username">

                                    </div>
                                </div>

                                <div class="field ">
                                    <label class="label">นามสกุล</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="กรอกชื่อผู้ใช้งาน"
                                            v-model="check_username">

                                    </div>
                                </div>

                                <div class="field ">
                                    <label class="label">username</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="กรอกชื่อผู้ใช้งาน"
                                            v-model="check_username">

                                    </div>
                                </div>

                                <div class="field mt-5">
                                    <label class="label">password</label>
                                    <div class="control">
                                        <input class="input" type="password" placeholder="กรอกรหัสผ่าน"
                                            v-model="check_password">

                                    </div>
                                </div>

                                <div class="field mt-5">
                                    <label class="label">confirm password</label>
                                    <div class="control">
                                        <input class="input" type="password" placeholder="กรอกรหัสผ่าน"
                                            v-model="check_password">

                                    </div>
                                </div>

                                <div class="field mt-5">
                                    <label>ตำแหน่ง</label><br>
                                    <div class="select">
                                        <select class="select" v-model="role">
                                            <option value="employee">พนักงาน</option>
                                            <option value="manager">ผู้จัดการ</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="field">
                                    <div class="control has-text-centered">
                                        <router-link to="/">
                                            <input type="button" class="button" value="ลงทะเบียน">
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
    export default {
        name : 'SignUp',
    data() {
        return {
            check_username: "",
            check_password: "",
            role: ""
        };
    },
    methods: {
        test() {
            axios
                .get("http://localhost:3000/login");
        }
    },
    components: { RouterLink }
}
</script>