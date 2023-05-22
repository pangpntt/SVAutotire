<template>
  <section>
    <div class="columns">
      <div class="column is-2">
        <div class="nav">
          <ul>
            <li>
              <router-link to="/stock">
                <span class="icon"><font-awesome-icon :icon="['fas', 'store']" /></span>
                <span class="title">สินค้าในสต็อก</span>
              </router-link>
            </li>
            <li>
              <router-link to="/register" v-show="role === 'Manager'">
                <span class="icon"><font-awesome-icon :icon="['fas', 'store']" /></span>
                <span class="title">สมัครสมาชิก</span>
              </router-link>
            </li>
            <li>
              <router-link to="/tire">
                <span class="icon"><font-awesome-icon :icon="['fas', 'gear']" /></span>
                <span class="title">ยาง</span>
              </router-link>
            </li>
            <li>
              <router-link to="/wheel">
                <span class="icon"><font-awesome-icon :icon="['fas', 'truck-monster']" /></span>
                <span class="title">ล้อ</span>
              </router-link>
            </li>
            <li>
              <router-link to="/import" v-show="role === 'Manager'">
                <span class="icon"><font-awesome-icon :icon="['fas', 'truck-arrow-right']" /></span>
                <span class="title">การนำเข้าสินค้า</span>
              </router-link>
            </li>
            <li>
              <router-link to="/sell">
                <span class="icon"><font-awesome-icon :icon="['fas', 'money-bill']" /></span>
                <span class="title">การขายสินค้า</span>
              </router-link>
            </li>
            <li>
              <router-link to="/customer">
                <span class="icon"><font-awesome-icon :icon="['fas', 'user']" /></span>
                <span class="title">ข้อมูลลูกค้า</span>
              </router-link>
            </li>
            <li>
              <router-link to="/warehouse">
                <span class="icon"><font-awesome-icon :icon="['fas', 'warehouse']" /></span>
                <span class="title">คลังสินค้า</span>
              </router-link>
            </li>
            <div class="bottom">
              <li>
                <router-link to="/">
                  <span @click="logout()" class="icon"><font-awesome-icon :icon="['fas', 'right-from-bracket']" /></span>
                  <span @click="logout()" class="title">ออกจากระบบ</span>
                </router-link>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div class="column is-9">
        <h1 class="has-text-weight-semibold is-size-3 mt-5 mb-5">ข้อมูลลูกค้า</h1>
        <!-- ค้นหา -->
        <div class="control has-icons-left">
          <span class="icon">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </span>
          <input v-model="input_cus" class="input" type="text" placeholder="ค้นหาชื่อลูกค้า"
            style="width: 200px; height: 40px;">
        </div>
        <!-- ตารางแสดงข้อมูลลูกค้า -->
        <table class="table is-bordered is-striped is-hoverable is-fullwidth mt-5">
          <thead>
            <tr>
              <th class="has-text-centered">ชื่อ</th>
              <th class="has-text-centered">นามสกุล</th>
              <th class="has-text-centered">ป้ายทะเบียนรถ</th>
              <th class="has-text-centered">จำนวนไมล์รถ</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="has-text-centered" v-for="customer in customers" :key="customer.cus_id">
            <tr>
              <td>{{ customer.cus_fname }}</td>
              <td>{{ customer.cus_lname }}</td>
              <td>{{ customer.license_plate }}</td>
              <td>{{ customer.cus_mile }}</td>
              <td class="has-text-centered">
                <a @click="classArray.push('is-active'), editFName=customer.cus_fname, editLName=customer.cus_lname, editCar=customer.license_plate, editMile = customer.cus_mile, editId= customer.cus_id">
                  <span class="icon">
                    <font-awesome-icon :icon="['fas', 'pen']" />
                  </span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- modal -->
        <div id="modal3" :class="classArray">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head px-5 py-3">
              <p class="modal-card-title">แก้ไขข้อมูลลูกค้า</p>
              <button class="delete" aria-label="close" @click="classArray.pop()"></button>
            </header>
            <section class="modal-card-body px-5 py-3">
              <div class="content">
                <div class="columns">
                  <div class="column pr-4">
                    <label>ชื่อ</label>
                    <input v-model="editFName" class="input" />
                  </div>
                  <div class="column pr-4">
                    <label>นามสกุล</label>
                    <input v-model="editLName" class="input" />
                  </div>
                </div>
                <div class="columns">
                  <div class="column pr-4">
                    <label>ป้ายทะเบียนรถ</label>
                    <input v-model="editCar" class="input" />
                  </div>
                  <div class="column">
                    <label>จำนวนไมล์รถ</label>
                    <input v-model="editMile" class="input" type="number" />
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <label>หมายเหตุ</label>
                    <textarea class="textarea"></textarea>
                  </div>
                </div>
                <div class="field is-grouped">
                  <div class="control">
                    <button class="button is-link px-4" @click="classArray.pop(), edit_customer()">Submit</button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
  
<script>
import axios from "axios";
export default {
  name: "HeaderView",
  data() {
    return {
      classArray: ['modal'],
      customers: null,
      editFName: null,
      editLName: null,
      editCar: null,
      editMile: null,
      editId: null
    };
  }, created(){
      this.get_data()
  }, methods: {
    get_data() {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-access-token': token
        }
      }
      axios.get("http://localhost:3000/customer", config)
        .then((respones) => {
          this.customers = respones.data
        })
        .catch((err) => {
          console.log(err)
        })
    },edit_customer(){
      console.log(1)
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-access-token': token
        }
      }
      const data = {
        firstname: this.editFName,
        lastname: this.editLName,
        mile: this.editMile,
        licensePlate: this.editCar
      }
      axios.put(`http://localhost:3000/customer/${this.editId}`, data, config)
      .then(()=>{
        this.get_data()
        alert("Success")
      }).catch((err)=>{
        alert("ไม่สำเร็จ")
        console.log("success2")
        console.log(err)
      })
    }, logout(){
      console.log(1)
      localStorage.removeItem('token')
      .then(()=>{
        this.$router.push({ path: "/" });
      })
    }

  }

};
</script>
  
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Prompt", sans-serif;
}

body {
  min-height: 100vh;
}

.nav {
  position: fixed;
  width: 200px;
  height: 100%;
  background-color: #253239;
  /* transition: 0.5s;
    overflow: hidden;
    z-index: 1; */
}

/* .nav:hover,
  .nav.active {
    width: 250px;
  } */

.nav ul {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.nav ul li {
  position: relative;
  width: 100%;
  list-style: none;
}

.nav ul li:hover {
  background-color: #414c52;
}

.nav ul li a {
  position: relative;
  display: block;
  width: 100%;
  display: flex;
  text-decoration: none;
  color: #fff;
}

.nav ul li a .icon {
  position: relative;
  min-width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}

.nav ul li a .title {
  position: relative;
  display: block;
  height: 60px;
  line-height: 60px;
  text-align: start;
  white-space: nowrap;
  color: #fff;
  font-size: 18px;
}

.nav .bottom {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}
</style>
  