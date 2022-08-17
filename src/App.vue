<template>
  <div class="ms-layout" id="layout">
    <TheHeader/>
    <TheContainer/>
  </div>
</template>

<script>

import TheHeader from "./components/layout/TheHeader.vue";
import TheContainer from "./components/layout/TheContainer.vue";
export default {
  name: 'App',
  components: {
    TheHeader,
    TheContainer
}
}
</script>

<style>
@import url(./css/main.css);

</style>
