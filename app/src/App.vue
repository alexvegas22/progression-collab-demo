<template>
	<div id="app"></div>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<router-link :to="{ name: 'Home' }" class="navbar-brand text-light">
			<span class="text-info"> Prog</span>ression
		</router-link>
		<button
			class="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#navbarNav"
			aria-controls="navbarNav"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav">
				<li class="nav-item active">
					<router-link :to="{ name: 'Question', params: { uri: uri, username: username } }" class="text-light">
						Question
					</router-link>
				</li>
			</ul>
		</div>
	</nav>
	<router-view />
</template>

<script>
export default {
	name: "App",
	computed: {
		uri() {
			return "aHR0cHM6Ly9wcm9ncmVzc2lvbi5wYWdlcy5kdGkuY3Jvc2Vtb250LnF1ZWJlYy9wcm9ncmVzc2lvbl9jb250ZW51X2RlbW8vbGVzX2ZvbmN0aW9uc18wMS9hcHBlbGVyX3VuZV9mb25jdGlvbl9wYXJhbSVDMyVBOXRyJUMzJUE5ZQ";
		},
		username() {
			return localStorage.getItem('user-name');
		},
	},
};
</script>

<style src="./css/style.css">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}
</style>
