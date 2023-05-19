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
            
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "HeaderView",
    data() {
      return {};
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
  