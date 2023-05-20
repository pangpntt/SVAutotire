<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>

export default {
  data () {
    return {
      user: null
    }
  },
     mounted () {
     this.onAuthChange()
   },
   methods: {
     onAuthChange () {
       const token = localStorage.getItem('token')
       if (token) {
         this.getUser()
       }
     },
     getUser () {
       const token = localStorage.getItem('token')
      console.log(token)
     },
   }
}
</script>