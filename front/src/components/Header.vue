<template>
    <div class="layout-header">
      <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
        <b-navbar-brand href="#">F1 Stats</b-navbar-brand>
      </b-navbar>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>
  .layout-header >>> .navbar {
    padding: 0;
  }
</style>