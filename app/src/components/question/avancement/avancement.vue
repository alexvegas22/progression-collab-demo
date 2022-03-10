<template>
	<div class="dropdown">
		<button class="btn btn-secondary dropdown-toggle" type="button" id="menu_historique" data-bs-toggle="dropdown" aria-expanded="false">
			{{this.langage}}
		</button>
		<ul class="dropdown-menu" aria-labelledby="menu_historique">
			<li v-for="langage in this.langages" key="langage">
				<button class="dropdown-item disabled" présentation_étape="4.0">{{langage}}</button>
				<ul>
					<li><button class="dropdown-item" @click="this.reinitialiserCodeEditeur(langage)"  présentation_étape="4.1">{{ $t('avancement.ébauche_initiale') }}</button></li>
					<li v-for="elem in this.filtrerTentativesParLangage(langage)">
						<button class="dropdown-item" @click="this.chargerTentative()" :value="elem.liens.self"  présentation_étape="4.2">
							{{ this.timestampVersDate(elem.date_soumission) }} {{ elem.réussi ? "  &#9989;" : "  &#10060;" }}							
						</button>
					</li>
				</ul>
			</li>
		</ul>		
		<button class="btn btn-secondary dropdown-toggle" type="button" id="menu_langages" data-bs-toggle="dropdown" aria-expanded="false">
			{{ $t('avancement.ébauches') }}<!--Par défaut-->
			<!--{{this.langage}}--><!--Dès qu'une ébauche est sélectionnée-->
		</button>
		<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
			<h6 class="dropdown-header">{{ $t('avancement.langages_supportés') }}</h6>
			<li>
				<a class="dropdown-item" href="#">Base de données</a>
				<ul class="dropdown-menu dropdown-submenu">
					<a class="dropdown-item">MySQL</a>		
					<a class="dropdown-item">SSHD</a>
				</ul>
			</li>
			<li>
				<a class="dropdown-item" href="#">Scriptage</a>
				<ul class="dropdown-menu dropdown-submenu">
					<a class="dropdown-item">Bash</a>			
					<a class="dropdown-item">Powershell</a>
				</ul>
			</li>
			<li>
				<a class="dropdown-item dropright" href="#">Programmation</a>
				<ul class="dropdown-menu dropdown-submenu">
					<li><a class="dropdown-item">C</a></li>
					<li><a class="dropdown-item">C++</a></li>
					<li><a class="dropdown-item">Clojure</a></li>
					<li><a class="dropdown-item">Go</a></li>
					<li><a class="dropdown-item">Java</a></li>
					<li><a class="dropdown-item">JavaScript</a></li>
					<li><a class="dropdown-item">Perl</a></li>
					<li><a class="dropdown-item">PHP</a></li>
					<li><a class="dropdown-item">Python</a></li>
					<li><a class="dropdown-item">Ruby</a></li>
					<li><a class="dropdown-item">Scala</a></li>
					<li><a class="dropdown-item">TypeScript</a></li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script src="./avancement.js"></script>
<style src="./avancement.css"></style>