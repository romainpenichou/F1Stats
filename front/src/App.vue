<template>
  <div id="app">
    <Header />
    <b-container fluid class="app-container">
      <b-row>
        <b-col class="layout-col">
          <BurgerMenu/>
        </b-col>
        <b-col cols="10" class="layout-col">
          <DriverList/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from './components/Header'
import BurgerMenu from './components/BurgerMenu'
import DriverList from './components/DriverList.vue'

export default {
  name: 'App',
  components: {
    DriverList,
    BurgerMenu,
    Header
  }
}
</script>

<style scoped>
  #app >>> .layout-col {
    padding: 0px
  }

  #app >>> .app-container {
    margin-top: 40px
  }
</style>
