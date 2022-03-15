<template>
	<div class="dropdown">		
		<button class="btn btn-secondary dropdown-toggle" type="button" id="menu_langages" data-bs-toggle="dropdown" aria-expanded="false">
			<!--{{ $t('avancement.ébauches') }}--><!--Par défaut-->
			{{this.langage}}<!--Dès qu'une ébauche est sélectionnée-->
		</button>
		<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
			<h6 class="dropdown-header">{{ $t('avancement.langages_supportés') }}</h6>			
			<li>
				<a class="dropdown-item">
					<div class="input-group">
						<input id="nouveauLangage" type="text" class="form-control" placeholder="Langage" aria-label="Input group example" aria-describedby="basic-addon1">
						<button class="input-group-text" id="basic-addon1" @click="this.nouveauLangage()">
							<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
								<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
							</svg>
						</button>
					</div>
				</a>
			</li>
			<li v-for="langage in this.langages" key="langage">
				<a class="dropdown-item" @click="this.changerÉbauche(langage)">{{langage}}</a>
			</li>
		</ul>
	</div>
</template>

<script src="./choix_ébauche.js"></script>
<style src="./choix_ébauche.css"></style>