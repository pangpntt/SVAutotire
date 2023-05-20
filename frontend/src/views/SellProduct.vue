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
            <h1 class="has-text-weight-semibold is-size-3 mt-5 mb-5">ขายสินค้า</h1>
                <div class="block">
                    <a class="button is-primary px-3" @click="classArray.push('is-active')">
                        <span class="icon">
                            <font-awesome-icon :icon="['fas', 'square-plus']" />
                        </span>
                        <p>เพิ่มข้อมูลการขายเข้าสินค้า</p>
                    </a>
                </div>
                <!-- modal -->
                <div id="modal3" :class="classArray">
                    <div class="modal-background"></div>
                    <div class="modal-card">
                        <header class="modal-card-head px-5 py-3">
                            <p class="modal-card-title">ขายสินค้า</p>
                            <button class="delete" aria-label="close" @click="classArray.pop()"></button>
                        </header>
                        <section class="modal-card-body px-5 py-3">
                            <div class="content">
                                <div class="columns">
                                    <div class="column">
                                        <label>รหัสสินค้า</label>
                                        <input class="input" />
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column pr-4">
                                        <label>ชื่อสินค้า</label>
                                        <input class="input" />
                                    </div>
                                    <div class="column">
                                        <label>ประเภทสินค้า</label><br>
                                        <div class="select">
                                            <select class="select">
                                                <option value="ล้อ">ล้อ</option>
                                                <option value="ยาง">ยาง</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column pr-4">
                                        <label>พนักงานขาย</label>
                                        <input disabled class="input" />
                                    </div>
                                    <div class="column">
                                        <label>วันที่ขาย</label>
                                        <input class="input" type="date" />
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column pr-4">
                                        <label>ราคาที่ขาย</label>
                                        <input class="input" type="number" />
                                    </div>
                                    <div class="column">
                                        <label>จำนวน</label>
                                        <input class="input" type="number" />
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column">
                                        <label class="radio">
                                            <input value="old" type="radio">
                                            ลูกค้าเก่า
                                        </label>
                                    </div>
                                    <div class="column">
                                        <label>รายชื่อลูกค้าเก่า</label><br>
                                        <div class="select">
                                            <select class="select" >
                                                <div>
                                                    <option >
                                                        <div></div>
                                                    </option>
                                                </div>

                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column">
                                        <label class="radio">
                                            <input value="new" type="radio">
                                            ลูกค้าใหม่
                                        </label>
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column pr-4">
                                        <label>ชื่อ</label>
                                        <input class="input" />
                                    </div>
                                    <div class="column">
                                        <label>นามสกุล</label>
                                        <input class="input" />
                                    </div>
                                </div>
                                <div class="columns" >
                                    <div class="column pr-4">
                                        <label>ป้ายทะเบียนรถ</label>
                                        <input class="input" />
                                    </div>
                                    <div class="column">
                                        <label>ไมล์รถ</label>
                                        <input class="input" />
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
                                        <button class="button is-link px-4" @click="add_sale_table()">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <!-- ค้นหา -->
                <div class="control has-icons-left">
                    <span class="icon"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /><i class="fa fa-search"></i>
                    </span>
                    <input class="input" type="text" placeholder="ค้นหา" style="width: 200px; height: 40px;">
                </div>
                <!-- ตารางแสดงข้อมูล -->
                <table class="table is-bordered is-striped is-hoverable is-fullwidth mt-5">
                    <thead>
                        <tr>
                            <th class="has-text-centered">รหัสสินค้า</th>
                            <th class="has-text-centered">ชื่อสินค้า</th>
                            <th class="has-text-centered">รูปสินค้า</th>
                            <th class="has-text-centered">ประเภทสินค้า</th>
                            <th class="has-text-centered">ลูกค้า</th>
                            <th class="has-text-centered">พนักงานขาย</th>
                            <th class="has-text-centered">วันที่ขาย</th>
                            <th class="has-text-centered">ราคาที่ขาย</th>
                            <th class="has-text-centered">จำนวน</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td><img id='img_in_table' alt="product_img"></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "HeaderView",
    data() {
      return {
        classArray: ['modal'],
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
  