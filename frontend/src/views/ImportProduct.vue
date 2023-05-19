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
        <h1 class="has-text-weight-semibold is-size-3 mt-5 mb-5">
          การนำเข้าสินค้า
        </h1>
        <!-- ปุ่มเพิ่มสินค้า -->
        <div class="block">
          <a
            class="button is-primary px-3"
            @click="classArray2.push('is-active')"
          >
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'square-plus']" />
            </span>
            <p>เพิ่มข้อมูลการนำเข้าสินค้า</p>
          </a>
        </div>

        <!-- modal เพิ่มสินค้า -->
        <div id="modal1" :class="classArray2">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head px-5 py-3">
              <p class="modal-card-title">เพิ่มข้อมูลการนำเข้าสินค้า</p>
              <button
                class="delete"
                aria-label="close"
                @click="classArray2.pop()"
              ></button>
            </header>
            <section class="modal-card-body px-5 py-3">
              <div class="content">
                <div class="columns">
                  <div class="column pr-4">
                    <label>รหัสสินค้า</label>
                    <input class="input" />
                  </div>
                  <div class="column">
                    <label>รูปสินค้า</label>
                    <input type="file" id="img" name="img" accept="image/*" />
                  </div>
                </div>
                <div class="columns">
                  <div class="column pr-4">
                    <label>ชื่อสินค้า</label>
                    <input class="input" />
                  </div>
                  <div class="column">
                    <label>ประเภทสินค้า</label><br />
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
                    <label>ยี่ห้อ</label>
                    <input class="input" />
                  </div>
                  <div class="column">
                    <label>รุ่น</label>
                    <input class="input" />
                  </div>
                </div>
                <div class="columns">
                  <div class="column pr-4">
                    <label>ขนาด</label>
                    <input class="input" />
                  </div>
                  <div class="column">
                    <label>บริษัท</label>
                    <input class="input" />
                  </div>
                </div>
                <div class="columns">
                  <div class="column pr-4">
                    <label>สัปดาห์</label>
                    <input class="input" type="number" />
                  </div>
                  <div class="column">
                    <label>ปี</label>
                    <input class="input" type="number" />
                  </div>
                </div>
                <div class="columns">
                  <div class="column pr-4">
                    <label>วันที่นำเข้า</label>
                    <input class="input" type="date" />
                  </div>
                  <div class="column">
                    <label>ที่เก็บ</label><br />
                    <div class="select">
                      <select class="select">
                        <option></option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column pr-4">
                    <label>ราคาที่นำเข้า</label>
                    <input class="input" type="number" />
                  </div>
                  <div class="column">
                    <label>จำนวน</label>
                    <input class="input" type="number" />
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
                    <button
                      class="button is-link px-4"
                      @click="add_product(), classArray2.pop()"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <!-- search -->
        <div class="control has-icons-left">
            <span class="icon">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </span>
            <input class="input" v-model="search_name" type="text" placeholder="ค้นหา"
                        style="width: 200px; height: 40px;">
        </div>

        <!-- ตารางแสดงข้อมูล -->
        <table class="table is-bordered is-striped is-hoverable is-fullwidth mt-5">
            <thead>
                <tr>
                    <th class="has-text-centered">รหัสสินค้า</th>
                    <th class="has-text-centered">ชื่อสินค้า</th>
                    <th class="has-text-centered">ประเภทสินค้า</th>
                    <th class="has-text-centered">รูปสินค้า</th>
                    <th class="has-text-centered">ยี่ห้อ</th>
                    <th class="has-text-centered">รุ่น</th>
                    <th class="has-text-centered">ขนาด</th>
                    <th class="has-text-centered">บริษัท</th>
                    <th class="has-text-centered">สัปดาห์</th>
                    <th class="has-text-centered">ปี</th>
                    <th class="has-text-centered">วันที่นำเข้า</th>
                    <th class="has-text-centered">ที่เก็บ</th>
                    <th class="has-text-centered">ราคาที่นำเข้า</th>
                    <th class="has-text-centered">จำนวน</th>
                    <th colspan="3"></th>
                </tr>
            </thead>
            <tbody>
                <tr class="has-text-centered">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="image is-128x128"><img id="img_in_table" alt="product_img"></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="has-text-centered">
                        <a @click="classArray.push('is-active'), edit_product(index)">
                        <span class="icon">
                            <font-awesome-icon :icon="['fas', 'pen']" />
                        </span>
                        </a>
                    </td>
                    <td class="has-text-centered">
                        <a @click="isActive = true, del_index = index">
                        <span class="icon"><font-awesome-icon :icon="['fas', 'trash']" style="color: #d41e11;" /></span>
                    </a>
                    </td>
                    <td class="has-text-centered">
                        <a @click="classArray3.push('is-active')">
                        <span class="icon"><font-awesome-icon :icon="['fas', 'plus']" /></span>
                        </a>

                    </td>

                </tr>
            </tbody>
        </table>

        <!-- modal ลบ -->
        <div id="modal2" :class="{modal: modal, 'is-active': isActive}">
            <div class="modal-background"></div>
                <div class="modal-content">
                    <div class="card">
                        <div class="card-content px-5 py-5">
                            <p class="title is-size-3">
                                ยืนยันการลบข้อมูล
                            </p>
                        </div>
                        <footer class="card-footer">
                            <p class="card-footer-item has-background-primary">
                                <span>
                                    <a class="has-text-white is-size-5 py-5" @click="del_product()">ยืนยัน</a>
                                </span>
                            </p>
                            <p class="card-footer-item has-background-danger">
                                <span>
                                    <a class="has-text-white is-size-5 py-5" @click="isActive=false">ยกเลิก</a>
                                </span>
                            </p>
                        </footer>
                    </div>
                </div>
                    <button class="modal-close is-large" aria-label="close" @click="isActive = false"></button>
                </div>
      </div>

      <!-- modal แก้ไขจำนวนสินค้า -->
      <div id="modal3" :class="classArray">
        <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head px-5 py-3">
                    <p class="modal-card-title">แก้ไขจำนวนสินค้า</p>
                    <button class="delete" aria-label="close" @click="classArray.pop()"></button>
                </header>
            <section class="modal-card-body px-5 py-3">
                <div class="content">
                    <div class="columns">
                        <div class="column pr-4">
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
                                <select  class="select">
                                    <option value="ล้อ">ล้อ</option>
                                    <option value="ยางรถ">ยาง</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column pr-4">
                            <label>ยี่ห้อ</label>
                            <input  class="input" />
                        </div>
                        <div class="column">
                            <label>รุ่น</label>
                            <input class="input" />
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column pr-4">
                            <label>ขนาด</label>
                            <input class="input" type="text" />
                        </div>
                        <div class="column">
                            <label>บริษัท</label>
                            <input class="input" type="text" />
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column pr-4">
                            <label>สัปดาห์</label>
                            <input  class="input" type="number" />
                        </div>
                        <div class="column">
                            <label>ปี</label>
                            <input class="input" type="number" />
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <label>ที่เก็บ</label><br>
                            <div class="select">
                                <select class="select">
                                    <option ></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <label>จำนวนที่แก้ไข</label>
                            <input class="input" type="number" />
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
                            <button class="button is-link px-4"
                                @click="update_product(), classArray.pop()">Submit</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </div>

    <!-- modal เพิ่มสินค้า -->
    <div id="modal4" :class="classArray3">
        <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head px-5 py-3">
                    <p class="modal-card-title">เพิ่มจำนวนสินค้า</p>
                    <button class="delete" aria-label="close" @click="classArray3.pop()"></button>
                </header>
                <section class="modal-card-body px-5 py-3">
                    <div class="content">
                        <div class="columns">
                            <div class="column">
                                <label>รหัสสินค้า</label>
                                <input  class="input" />
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column pr-4">
                                <label>ชื่อสินค้า</label>
                                <input  class="input" />
                            </div>
                            <div class="column">
                                <label>ประเภทสินค้า</label><br>
                                <div class="select">
                                    <select class="select">
                                        <option value="ล้อ">ล้อ</option>
                                        <option value="ยางรถ">ยาง</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column pr-4">
                                <label>ยี่ห้อ</label>
                                <input  class="input" />
                            </div>
                            <div class="column">
                                <label>รุ่น</label>
                                <input  class="input" />
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column pr-4">
                                <label>ขนาด</label>
                                <input  class="input" type="text" />
                            </div>
                            <div class="column">
                                <label>บริษัท</label>
                                <input  class="input" type="text" />
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column pr-4">
                                <label>สัปดาห์</label>
                                <input  class="input" type="number" />
                            </div>
                            <div class="column">
                                <label>ปี</label>
                                <input  class="input" type="number" />
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <label>ที่เก็บ</label><br>
                                <div class="select">
                                    <select  class="select">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <label>จำนวนที่เพิ่ม</label>
                                <input  class="input" type="number" />
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
                                <button class="button is-link px-4"
                                    @click="classArray3.pop()">Submit</button>
                            </div>
                        </div>
                            </div>
                        </section>
                    </div>
                </div>
    </div>
  </section>
</template>
  
<script>
export default {
  data() {
    return {
      modal: true,
      isActive: false,
      classArray: ["modal"],
      classArray2: ["modal"],
      classArray3: ["modal"],
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
  