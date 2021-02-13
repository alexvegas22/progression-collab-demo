<template>
	<div id="app">
    <Login password_req="true" domaine_mail="crosemont.qc.ca" />
		<Question v-if="logué"/>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import Feedback from './components/Feedback.vue'

export default {
  name: 'App',
  components: {
    Login,
		Feedback
  }
}
</script>

<style src="./css/style.css">
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
