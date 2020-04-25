<template>
    <div class="layout-burger-menu">
    <b-nav vertical class="w-25 ">
        <b-nav-item active>Active</b-nav-item>
        <b-nav-item>Link</b-nav-item>
        <b-nav-item>Another Link</b-nav-item>
        <b-nav-item disabled>Disabled</b-nav-item>
    </b-nav>
    </div>
</template>

<script>
export default {
    name: 'Burger '
}
</script>

<style scoped>
  .layout-burger-menu {
      background-color: #8080802e;
      height: calc(100vh - 40px);
  }
</style>