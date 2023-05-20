<template>
    <section>
    <div class="columns">
        <div class="column is-2">
          <div class="nav">
            <ul>
              <li>
                <router-link to="/stock">
                  <span class="icon"
                    ><font-awesome-icon :icon="['fas', 'store']"
                  /></span>
                  <span class="title">สินค้าในสต็อก</span>
                </router-link>
              </li>
              <li>
                <router-link to="/tire">
                  <span class="icon"
                    ><font-awesome-icon :icon="['fas', 'gear']"
                  /></span>
                  <span class="title">ยาง</span>
                </router-link>
              </li>
              <li>
                <router-link to="/wheel">
                  <span class="icon"
                    ><font-awesome-icon :icon="['fas', 'truck-monster']"
                  /></span>
                  <span class="title">ล้อ</span>
                </router-link>
              </li>
              <li>
                <router-link to="/import">
                  <span class="icon"
                    ><font-awesome-icon :icon="['fas', 'truck-arrow-right']"
                  /></span>
                  <span class="title">การนำเข้าสินค้า</span>
                </router-link>
              </li>
              <li>
                <router-link to="/sell">
                  <span class="icon"
                    ><font-awesome-icon :icon="['fas', 'money-bill']"
                  /></span>
                  <span class="title">การขายสินค้า</span>
                </router-link>
              </li>
              <li>
                <router-link to="/customer">
                  <span class="icon"
                    ><font-awesome-icon :icon="['fas', 'user']"
                  /></span>
                  <span class="title">ข้อมูลลูกค้า</span>
                </router-link>
              </li>
              <li>
                <router-link to="/warehouse">
                  <span class="icon"
                    ><font-awesome-icon :icon="['fas', 'warehouse']"
                  /></span>
                  <span class="title">คลังสินค้า</span>
                </router-link>
              </li>
              <div class="bottom">
                <li>
                  <router-link to="/">
                    <span class="icon"
                      ><font-awesome-icon :icon="['fas', 'right-from-bracket']"
                    /></span>
                    <span class="title">ออกจากระบบ</span>
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
                    <input class="input" v-model="input_warehouse" type="text" placeholder="ค้นหาคลังสินค้า" style="width: 200px; height: 40px;">
                </div>
                <!-- ตารางแสดงข้อมูลคลังสินค้า -->
                <table class="table is-bordered is-striped is-hoverable is-fullwidth mt-5 has-text-centered">
                    <thead>
                        <tr>
                            <th class="has-text-centered">รหัสคลังสินค้า</th>
                            <th colspan="2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <td></td>

                        <td class="has-text-centered">
                            <a @click="classArray.push('is-active')">
                                <span class="icon">
                                    <font-awesome-icon :icon="['fas', 'pen']" />
                                </span>
                            </a>
                        </td>
                        <td class="has-text-centered">
                            <a @click="isActive = true">
                                <span class="icon">
                                    <font-awesome-icon :icon="['fas', 'trash']" style="color: #e4220c;" />
                                </span>
                            </a>
                        </td>
                    </tbody>
                </table>
                <!-- modal delete -->
                <div id="modal" :class="{modal: modal, 'is-active': isActive}">
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
                                        <a class="has-text-white is-size-5 py-5">ยืนยัน</a>
                                    </span>
                                </p>
                                <p class="card-footer-item has-background-danger">
                                    <span>
                                        <a class="has-text-white is-size-5 py-5">ยกเลิก</a>
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
                                        <input v-model="add" class="input"/>
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
                                        <button @click="add_warehouse()" class="button is-link px-4">Submit</button>
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
                                        <label>รหัสสินค้า</label>
                                        <input class="input" />
                                    </div>
                                    <div class="column">
                                        <label>ชื่อสินค้า</label>
                                        <input class="input" />
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column pr-4">
                                        <label>ที่เก็บที่แก้ไข</label>
                                        <input class="input" />
                                    </div>
                                    <div class="column">
                                        <label>จำนวนที่แก้ไข</label>
                                        <input class="input" type="number"/>
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
                                        <button class="button is-link px-4">Submit</button>
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
  export default {
    name: "HeaderView",
    data() {
      return {
        modal: true,
        isActive: false,
        classArray: ['modal'],
        classArray2: ['modal']
      };
    },
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
  