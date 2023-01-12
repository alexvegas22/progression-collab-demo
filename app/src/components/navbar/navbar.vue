<template>
	<nav class="navbar justify-content-between navbar-dark bg-dark"
		v-shortkey="raccourcis.basculerThème"
		@shortkey="basculerThèmeSombre"
	>
		<a
			href="/"
			class="navbar-brand text-light mr-auto"
		>
			<span class="text-info"> Prog</span>ression
		</a>
		<span class="text-username">{{username}}</span>
		<Transition>
			<div v-if="token" class="dropdown">
				<a data-bs-toggle="dropdown">
					<i
						class="fa fa-bars barBtn"
					/>
				</a>
				<ul
					class="dropdown-menu"
				>
					<li
						v-if="token"
						class="btnDMM"
					>
						<a class="focus padding">
							<i class="fas fa-laptop-code icône"/>
							<label>
								<span>{{ $t('menu.exercices') }}</span>
							</label>
						</a>
						<ul
							class="dropdown-menu dropdown-submenu-p dropdown-submenu-left"
						>
							<li
								class="btnDMM"
								@click="allerVers('Accomplissements')"
							>
								<a class="focus padding">
									<i class="fas fa-trophy icône"></i>
									<label>
										<span>{{ $t('menu.accomplissement') }}</span>
									</label>
								</a>
							</li>
							<li
								class="btnDMM"
							>
								<div class="focus padding" >
									{{ $t('menu.nouvelExercice') }}
									<div style="display: flex; flex-flow: row; align-items: bottom">
										<input type="text"
											:placeholder="$t('menu.invite_url')"
											class="champ-url"
											@change="chargerNouveau"
											v-model="nouvelUrl">
										<i class="btn-test-local fas fa-play" @click="chargerNouveau"></i>
									</div>
								</div>
							</li>
						</ul>
					</li>							
					<li
						class="btnDMM"
					>
						<a class="focus padding">
							<i class="fas fa-sliders-h icône"></i>
							<label>
								<span>{{ $t('menu.préférences') }}</span>
							</label>
						</a>
						<ul
							class="dropdown-menu dropdown-submenu-p dropdown-submenu-left"
						>
							<li
								class="btnDMM"
								@click="basculerThèmeSombre"
							>
								<a class="focus padding">
									<i class="fas fa-adjust icône"
									></i>
									<label>
										<span v-if="this.thèmeSombre===true">{{$t("menu.thèmeClair")}}</span>
										<span v-else>{{$t("menu.thèmeSombre")}}</span>
									</label>
								</a>
							</li>
							<li
								class="btnDMM"
								@click="basculerLocale"
							>
								<a class="focus padding">
									<i class="fas fa-globe icône"
									></i>
									<label>
										<span v-if="this.locale==='fr'">🇬🇧 {{$t("menu.english")}}</span>
										<span v-else>🇫🇷 {{$t("menu.français")}}</span>
									</label>
								</a>
							</li>
							<li v-if="indicateursDeFonctionnalitéVersionTest"
								class="btnDMM"
								@click="basculerVersionTest"
							>
								<a class="focus padding">
									<label>
										<span>{{$t("menu.versionTest")}}</span>
										<input
											v-model="versionTest"
											type="checkbox"
										>
									</label>
								</a>
							</li>
						</ul>
					</li>
					<li class="dropdown-divider"></li>
					<li class="btnDMM">
						<a>
							<button
								v-if="token"
								class="btn focus"
								@click="$emit('déconnexion')"
							><span class="fa fa-sign-out icône-déconnexion"></span>{{ $t('menu.déconnexion') }}</button>
						</a>
					</li>
				</ul>

			</div>
			<div v-else>
				<button
					class="btn focus btn-connexion"
					@click="$emit('connexion')"
				><span class="fa fa-sign-out icône-connexion"></span>{{ $t('menu.connexion') }}</button>
			</div>
		</Transition>
	</nav>
</template>

<script src="./navbar.js"/>
