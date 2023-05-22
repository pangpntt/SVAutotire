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
              <router-link to="/register">
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
              <router-link to="/import">
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
                  <span  @click="logout()" class="title">ออกจากระบบ</span>
                </router-link>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div class="column is-9">
        <h1 class="has-text-weight-semibold is-size-3 mt-5 mb-5">คลังสินค้า</h1>
        <!-- เพิ่มคลังสินค้า -->
        <div class="block">
          <a class="button is-primary px-3" @click="classArray2.push('is-active')">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'square-plus']" />
            </span>
            <p>เพิ่มข้อมูลคลังสินค้า</p>
          </a>
        </div>
        <!-- search -->
        <div class="control has-icons-left">
          <span class="icon">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </span>
          <input class="input" v-model="input_warehouse" type="text" placeholder="ค้นหาคลังสินค้า"
            style="width: 200px; height: 40px;">
        </div>
        <!-- ตารางแสดงข้อมูลคลังสินค้า -->
        <table class="table is-bordered is-striped is-hoverable is-fullwidth mt-5 has-text-centered">
          <thead>
            <tr>
              <th class="has-text-centered">รหัสคลังสินค้า</th>
              <th class="has-text-centered">หมายเหตุ</th>
              <th colspan="2"></th>
            </tr>
          </thead>
          <tbody v-for="warehouse in warehouses" :key="warehouse.warehouse_id">
            <td>
              {{ warehouse.warehouse_name }}
            </td>
            <td>
              {{ warehouse.note }}
            </td>

            <td class="has-text-centered">
              <a @click="classArray.push('is-active'), editName = warehouse.warehouse_name, editNote= warehouse.note, editNum = warehouse.warehouse_id">
                <span class="icon">
                  <font-awesome-icon :icon="['fas', 'pen']" />
                </span>
              </a>
            </td>
            <td class="has-text-centered">
              <a @click="isActive = true, numDeleteWarehouse = warehouse.warehouse_id">
                <span class="icon">
                  <font-awesome-icon :icon="['fas', 'trash']" style="color: #e4220c;" />
                </span>
              </a>
            </td>
          </tbody>
        </table>
        <!-- modal delete -->
        <div id="modal" :class="{ modal: modal, 'is-active': isActive }">
          <div class="modal-background"></div>
          <div class="modal-content">
            <div class="card">
              <div class="card-content px-5 py-5">
                <p class="title is-size-3">
                  ต้องการลบข้อมูลคลังสินค้าหรือไม่
                </p>
              </div>
              <footer class="card-footer ">
                <p class="card-footer-item has-background-primary">
                  <span>
                    <a @click="deleteWarehouse(), isActive = false" class="has-text-white is-size-5 py-5">ยืนยัน</a>
                  </span>
                </p>
                <p class="card-footer-item has-background-danger">
                  <span>
                    <a @click="isActive = false, numDeleteWarehouse = null"
                      class="has-text-white is-size-5 py-5">ยกเลิก</a>
                  </span>
                </p>
              </footer>
            </div>
          </div>
          <button class="modal-close is-large" aria-label="close" @click="isActive = false"></button>
        </div>
        <!-- modal เพิ่มข้อมูลคลังสินค้า -->
        <div id="modal1" :class="classArray2">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head px-5 py-3">
              <p class="modal-card-title">เพิ่มข้อมูลคลังสินค้า</p>
              <button class="delete" aria-label="close" @click="classArray2.pop()"></button>
            </header>
            <section class="modal-card-body px-5 py-3">
              <div class="content">
                <div class="columns">
                  <div class="column">
                    <label>รหัสคลังสินค้า</label>
                    <input placeholder="กรอกชื่อคลังสินค้า" class="input" v-model="createWarehouse" />
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <label>หมายเหตุ</label>
                    <textarea class="textarea" v-model="createNote"></textarea>
                  </div>
                </div>
                <div class="field is-grouped">
                  <div class="control">
                    <button @click="add_warehouse(), classArray2.pop()" class="button is-link px-4">Submit</button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <!-- modal edit -->
        <div id="modal2" :class="classArray">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head px-5 py-3">
              <p class="modal-card-title">แก้ไขข้อมูลคลังสินค้า</p>
              <button class="delete" aria-label="close" @click="classArray.pop()"></button>
            </header>
            <section class="modal-card-body px-5 py-3">
              <div class="content">
                <div class="columns">
                  <div class="column pr-4">
                    <label>ชื่อคลังสินค้า</label>
                    <input type="text" class="input" v-model="editName" />
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <label>หมายเหตุ</label>
                    <textarea class="textarea" v-model="editNote"></textarea>
                  </div>
                </div>

                <div class="field is-grouped">
                  <div class="control">
                    <button class="button is-link px-4" @click="editWarehouse(), classArray.pop()">Submit</button>
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
      modal: true,
      isActive: false,
      classArray: ['modal'],
      classArray2: ['modal'],
      warehouses: null,
      createWarehouse: null,
      createNote: null,
      connector: null,
      numDeleteWarehouse: null,
      editName: null,
      editNote: null,
      editNum: null

    };
  },
  created() {
    const token = localStorage.getItem('token');
    this.connector = {
      headers: {
        'x-access-token': token
      }
    }
    this.get_data()

  },
  methods: {
    async add_warehouse() {
      const data = {
        name: this.createWarehouse,
        note: this.createNote
      };
      // const headers = {
      //   'x-access-token': localStorage.getItem('token')
      // };
      axios
        .post("http://localhost:3000/warehouse", data, this.connector)
        .then(() => {
          this.createWarehouse = null
          this.createNote = null
          this.get_data()

        }).catch((err) => {
          console.log(err)
        })
    }, get_data() {
      axios.get("http://localhost:3000/warehouse", this.connector)

        .then((respones) => {
          this.warehouses = respones.data
        })
        .catch((err) => {
          console.log(err)
        })
    }, deleteWarehouse() {
      const data = {
        number: this.numDeleteWarehouse
      };
      console.log(data)
      axios
        .delete(`http://localhost:3000/warehouse/${this.numDeleteWarehouse}`, this.connector)
        .then(() => {
          alert("Sucess")
          this.get_data()
        }).catch((err) => {
          console.log(err)
          alert("ทำรายการไม่สำเร็จ")
        })
    },editWarehouse(){
      const data = {
        name: this.editName,
        note: this.editNote
      };
      axios.put(`http://localhost:3000/warehouse/edit/${this.editNum}`, data,this.connector)
      .then(()=>{
        alert("Success")
        this.get_data()
      }).catch((err)=>{
        console.log(err)
        alert("ทำรายการไม่สำเร็จ")
      })
    },logout(){
      console.log(1)
      localStorage.removeItem('token')
      .then(()=>{
        this.$router.push({ path: "/" });
      })
    }
  }
}
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
  