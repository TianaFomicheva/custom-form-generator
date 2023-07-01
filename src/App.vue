<template>
  <form-view/>
</template>

<script>
import FormView from './components/formView.vue'

export default {
  name: 'App',
  components: {
    FormView
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<style lang="scss">
@import "./assets/style.scss";
</style>
