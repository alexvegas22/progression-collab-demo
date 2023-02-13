<template>
	<v-sheet>
		<!-- Navigation-->
		<!-- 
	     <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
	     <div class="container">
	     <a class="navbar-brand" href="#page-top"><span class="text-info"> Prog</span><span style="color: white">ression</span></a>
	     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
	     <i class="fas fa-bars ms-1"></i>
	     </button>
	     <div class="collapse navbar-collapse" id="navbarResponsive">
	     <ul class="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
	     <li class="nav-item"><a class="nav-link" href="#débuter">Débuter</a></li>
	     <li class="nav-item"><a class="nav-link" href="https://progression.pages.dti.crosemont.quebec/progression_contenu_demo/">Documentation</a></li>
	     <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
	     </ul>
	     </div>
	     </div>
	     </nav>
	-->
		<!-- Masthead-->
		<header class="masthead">
			<div
				class="container"
				style="border-style: solid; border-width: 10px; border-color: white; border-radius: 20px; padding: 10px; background-color: rgba(60,40,60,0.85); position: relative"
			>
				<div class="masthead-heading">
					<span class="text-info"> Prog</span><span style="color: white">ression</span>
				</div>
				<div class="masthead-subheading text-uppercase">
					Le gym de la programmation
					<div style="position: absolute; width: 3rem; margin:0.5rem; margin-top: 0; padding:0.5rem; right: 0; top: 0">
						<a :title=version href="https://git.dti.crosemont.quebec/progression">
							<img width="35" src="https://gitlab.com/gitlab-com/gitlab-artwork/-/raw/master/logo/logo-grey.svg">
						</a>
					</div>
				</div>
				<p>
					Progression est un exerciseur conçu pour aider l'apprentissage de la programmation par la pratique. Il permet d’<b>exécuter</b> dans un IDE en ligne, <b>analyser</b> et <b>diagnostiquer</b> du code programmé dans le cadre d'un exercice proposé et génère pour l'étudiant une rétroaction immédiate et spécifique.
				</p>

				<a
					class="btn btn-primary btn-xl text-uppercase"
					href="#débuter"
				>Débuter</a>
			</div>
		</header>

		<!-- Services-->
		<section
			id="débuter"
			class="page-section"
		>
			<div class="container">
				<div class="text-center">
					<h2 class="section-heading text-uppercase">
						Je veux...
					</h2>
				</div>
				<div class="row text-center">
					<div class="col-md-4">
						<a href="#étudiant">
							<div class="fond-icône icône-centré">
								<v-icon class="icône-centré" icon="mdi-laptop" color="white" size="80" />
							</div>
							<h4 class="my-3">Apprendre la programmation</h4>
						</a>
						<p class="text-muted">
							Programmez en ligne. Mettez en pratique les nouveaux concepts de programmation et validez vos résultats instantanément.
						</p>
					</div>
					<div class="col-md-4">
						<a href="#enseignant">
							<div class="fond-icône icône-centré">
								<v-icon class="icône-centré" icon="mdi-human-male-board" color="white" size="80" />
							</div>
							<h4 class="my-3">Enseigner la programmation</h4>
						</a>
						<p class="text-muted">
							Aidez vos étudiants à mettre en pratique les concepts vus en classe à l'aide d'exercices existants ou créez vos propres exercices adaptés à leurs besoins.
						</p>
					</div>
					<div class="col-md-4">
						<a href="#collaborateur">
							<div class="fond-icône icône-centré">
								<v-icon class="icône-centré" icon="mdi-source-branch" color="white" size="80" />
							</div>
							<h4 class="my-3">Collaborateurs</h4>
						</a>
						<p class="text-muted">
							Collaborez au développement de la plateforme et de son contenu
						</p>
					</div>
				</div>
			</div>
			<div class="text-center">
				<h4><a href="#démos">TL;DR ➙ Essayez un exercice de démo ici</a></h4>
			</div>
		</section>


		<section
			id="étudiant"
			class="page-section"
		>
			<div class="container">
				<div class="text-center">
					<h2 class="section-heading text-uppercase">
						Pour les étudiants
					</h2>
					<h3 class="section-subheading text-muted">
						L'apprenti-programmeur
					</h3>
				</div>
				<ul class="timeline">
					<li class="timeline">
						<div class="timeline-image">
							<img
								class="rounded-circle img-fluid"
								src="./assets/img/1.jpg"
								alt="Où"
							>
						</div>
						<div class="timeline-panel">
							<div class="timeline-heading">
								<h4>Où? </h4>
							</div>
							<div class="timeline-body">
								<p class="text-muted">
									Entièrement en ligne! Toute la programmation à partir d’un navigateur et d'une connexion internet.
								</p>
							</div>
						</div>
					</li>

					<li class="timeline-inverted">
						<div class="timeline-image">
							<img
								class="rounded-circle img-fluid"
								src="./assets/img/2.jpg"
								alt="Pourquoi"
							>
						</div>
						<div class="timeline-panel">
							<div class="timeline-heading">
								<h4>Pourquoi? </h4>
							</div>
							<div class="timeline-body">
								<p class="text-muted">
									Pour pallier les obstacles de l’apprentissage de la programmation, Progression t'assistrera dans ton apprentissage en mode autonome en te proposant&nbsp;:
									<ul>
										<li>des exercices préformatés et prêts à l'emploi </li>
										<li>des consignes rédigés de manière uniforme, claire et complète</li>
										<li>une rétroaction automatique sur la validité de ton code et sur ses erreurs</li>
										<li>autant d'essais et d'expériences que nécessaire jusqu'à la réussite</li>
										<li>l'historique de tes tentatives antérieures</li>
										<li>la possibilité d'obtenir des ressources spécifiques à tes difficultés en cas de besoin</li>
									</ul>
								</p>
							</div>
						</div>
					</li>
		    
					<li class="timeline">
						<div class="timeline-image">
							<img
								class="rounded-circle img-fluid"
								src="./assets/img/4.jpg"
								alt="Pourquoi"
							>
						</div>
						<div class="timeline-panel">
							<div class="timeline-heading">
								<h4>Comment? </h4>
							</div>
							<div class="timeline-body">
								<p class="text-muted">
									<a href="./GuideProgression - Étudiants.pdf">Suivez le guide</a>
								</p>
							</div>
						</div>
					</li>

					<li class="timeline-inverted">
						<div class="timeline-image">
							<img
								class="rounded-circle img-fluid"
								src="./assets/img/5.jpg"
								alt="Pourquoi"
							>
						</div>
						<div class="timeline-panel">
							<div class="timeline-heading">
								<h4>Essaye-le maintenant! </h4>
							</div>
							<div class="timeline-body">
								<p class="text-muted">
									<a href="#démos">Essaye un exercice de démo ici</a>
								</p>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</section>
	
		<section
			id="enseignant"
			class="page-section"
		>
			<div class="container">
				<div class="text-center">
					<h2 class="section-heading text-uppercase">
						Pour les enseignants
					</h2>
					<h3 class="section-subheading text-muted">
						Coach de la programmation
					</h3>
				</div>
				<ul class="timeline">
					<li class="timeline">
						<div class="timeline-image">
							<img
								class="rounded-circle img-fluid"
								src="./assets/img/1.jpg"
								alt="Où"
							>
						</div>
						<div class="timeline-panel">
							<div class="timeline-heading">
								<h4>Où l’utiliser? </h4>
							</div>
							<div class="timeline-body">
								<p class="text-muted">
									Utilisable dans un environnement numérique, ne nécessite nulle autre technologie qu’un navigateur et une connexion internet, ainsi que l’enregistrement avec un code usager et mot de passe.
								</p>
							</div>
						</div>
					</li>

					<li class="timeline-inverted">
						<div class="timeline-image">
							<img
								class="rounded-circle img-fluid"
								src="./assets/img/2.jpg"
								alt="Pourquoi"
							>
						</div>
						<div class="timeline-panel">
							<div class="timeline-heading">
								<h4>Pourquoi l’utiliser? </h4>
							</div>
							<div class="timeline-body">
								<p class="text-muted">
									Pour pallier les obstacles de l’apprentissage de la programmation, l'outil permet d'assister l'élève dans son apprentissage en mode autonome en lui proposant&nbsp;: 
									<ul>
										<li>des exercices préformatés et prêts à l'emploi </li>
										<li>des consignes rédigés de manière uniforme, claire et complète  </li>
										<li>une rétroaction automatique sur la validité de son code et sur ses erreurs  </li>
										<li>de faire autant d'essais et d'expériences que nécessaire jusqu'à sa réussite  </li>
										<li>de consulter ses tentatives antérieures  </li>
										<li>d’être dirigé vers des ressources spécifiques à ses difficultés en cas de besoin</li>
									</ul>
								</p>
								<p class="text-muted">
									Pour pallier les difficultés particulières à l’enseignement de la programmation, l’outil permet d'assister l'enseignant.e en lui proposant&nbsp;: 
									<ul>
										<li>de sélectionner des exercices parmi une banque de questions en ligne, en constante évolution, organisée en une hiérarchie incrémentale de thématiques, assurant ainsi une gradation très&nbsp;«Progressive»&nbsp;en difficulté. </li>
										<li>de suivre le cheminement de ses élèves de façon systématique et de déceler les tendances ou les difficultés </li>
										<li>de se libérer en grande partie des tâches répétitives de correction du code </li>
										<li>de créer sa propre banque d’exercices et de  personnaliser les exercices existants </li>
										<li>de collaborer avec d’autres enseignants à l’enrichissement d’une banque de questions commune  </li>
									</ul>
								</p>
							</div>
						</div>
					</li>

					<li class="timeline-inverted">
						<div class="timeline-image">
							<img
								class="rounded-circle img-fluid"
								src="./assets/img/3.jpg"
								alt="Pourquoi"
							>
						</div>
						<div class="timeline-panel">
							<div class="timeline-heading">
								<h4>Quand l’utiliser? </h4>
							</div>
							<div class="timeline-body">
								<p class="text-muted">
									Pour éviter les obstacles freinant l’initiation à la programmation, qui sont, entre autres :
									<ul>
										<li>les embûches induites par l'installation et la configuration de logiciels</li>
										<li>le code encombrant et non pertinent aux notions visées, en le masquant </li>
										<li>les résolutions incomplètes dues à une compréhension partielle de l'énoncé </li>
									</ul>
								</p>
								<p class="text-muted">
									Pour consolider l’apprentissage de la programmation, en suivant ses recommandations pédagogiques spécifiques &nbsp;: 
									<ul>
										<li>fournir des consignes claires, détaillées et complètes  </li>
										<li>minimiser les contraintes technologiques   </li>
										<li>respecter une gradation très progressive en difficulté  </li>
										<li>fournir une rétroaction immédiate et constructive sur les erreurs  								</li>
									</ul>
								</p>
							</div>
						</div>
					</li>

					<li class="timeline">
						<div class="timeline-image">
							<img
								class="rounded-circle img-fluid"
								src="./assets/img/4.jpg"
								alt="Pourquoi"
							>
						</div>
						<div class="timeline-panel">
							<div class="timeline-heading">
								<h4>Comment? </h4>
							</div>
							<div class="timeline-body">
								<p class="text-muted">
									Pour essayer les exercices <a href="./GuideProgression - Enseignants.pdf">Suivez le guide</a>
								</p>
								<p class="text-muted">
									Pour intégrer les exercices à votre cours Moodle <a href="ProgressionDansMoodle.pdf">Suivez l'autre guide</a>
								</p>
							</div>
						</div>
					</li>

					<li class="timeline-inverted">
						<div class="timeline-image">
							<img
								class="rounded-circle img-fluid"
								src="./assets/img/5.jpg"
								alt="Pourquoi"
							>
						</div>
						<div class="timeline-panel">
							<div class="timeline-heading">
								<h4>Essayez-le maintenant! </h4>
							</div>
							<div class="timeline-body">
								<p class="text-muted">
									<a href="#démos">Essayez un exercice de démo ici</a>
								</p>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</section>

		<section
			id="démos"
			class="page-section"
		>
			<div class="container">
				<div class="text-center">
					<h2 class="section-heading text-uppercase">
						Exercices de démo
					</h2>
					<ul class="list-group">
						<li class="list-group-item">
							<h4>
								<a
									href="https://progression.dti.crosemont.quebec/demo/question?uri=aHR0cHM6Ly9wcm9ncmVzc2lvbi5wYWdlcy5kdGkuY3Jvc2Vtb250LnF1ZWJlYy9jb250ZW51L2RlbW8vNjM0NGY1MzgtMGVjMy00ZTNmLTgzMDgtZmMxMGQzNWM2YWFmL2luZm8ueW1s&demo"
									target="_blank"
								> Exercice 1 - Bonjour le monde!</a>
							</h4>
						</li>
						<li class="list-group-item">
							<h4>
								<a
									href="https://progression.dti.crosemont.quebec/demo/question?uri=aHR0cHM6Ly9wcm9ncmVzc2lvbi5wYWdlcy5kdGkuY3Jvc2Vtb250LnF1ZWJlYy9jb250ZW51L2RlbW8vNmUzNjNjYjMtNWEyOS00YjYyLThlY2YtNmJjZTI5MjNiOWQ0L2luZm8ueW1s"
									target="_blank"
								> Exercice 2 - Bonjour Java!</a>
							</h4>
						</li>
						<li class="list-group-item">
							<h4>
								<a
									href="https://progression.dti.crosemont.quebec/demo/question?uri=aHR0cHM6Ly9wcm9ncmVzc2lvbi5wYWdlcy5kdGkuY3Jvc2Vtb250LnF1ZWJlYy9jb250ZW51L2RlbW8vZGExNDNjMTEtZjc2My00MDY0LWJjMDMtNTYxZGNkODFjNmUyL2luZm8ueW1s"
									target="_blank"
								> Exercice 3 - Un premier algorithme</a>
							</h4>
						</li>
						<li class="list-group-item">
							<h4>
								<a
									href="https://progression.dti.crosemont.quebec/demo/question?uri=aHR0cHM6Ly9wcm9ncmVzc2lvbi5wYWdlcy5kdGkuY3Jvc2Vtb250LnF1ZWJlYy9jb250ZW51L2RlbW8vMzdhOTEwNGQtODJhZC00ZDZiLTk0OTktMmY2YTMxYzA1OTgyL2luZm8ueW1s"
									target="_blank"
								> Exercice 4 - Défi complet</a>
							</h4>
						</li>
					</ul>
				</div>
			</div>
		</section>
	
		<section
			id="collaborateur"
			class="page-section"
		>
			<div class="container">
				<div class="text-center">
					<h2 class="section-heading text-uppercase">
						Les collaborateurs
					</h2>
				</div>
		
				<ul class="timeline">
		    
					<li class="timeline">
						<div class="timeline-image">
							<img
								class="rounded-circle img-fluid"
								src="./assets/img/1.jpg"
								alt="Projet Progression"
							>
						</div>
						<div class="timeline-panel">
							<div class="timeline-heading">
								<h4>
									<a href="https://git.dti.crosemont.quebec/progression/progression_backend/-/graphs/master">Contributeurs</a>
								</h4>
							</div>
						</div>
					</li>

					<li class="timeline-inverted">
						<div class="timeline-image">
							<img
								class="rounded-circle img-fluid"
								src="./assets/img/2.jpg"
								alt="Projet Progression"
							>
						</div>
				
						<div class="timeline-panel">
							<div class="timeline-heading">
								<h4>Avec le soutien de 
								</h4>
								<div style="overflow: hidden; margin: -10% 0px 0px -12%">
									<img src="./assets/img/logo_crosemont.png" width="100%" >
								</div>
							</div>
						</div>
					</li>

					<li class="timeline">
						<div class="timeline-image">
							<img
								class="rounded-circle img-fluid"
								src="./assets/img/3.jpg"
								alt="Projet Progression"
							>
						</div>
			
						<div class="timeline-panel">
							<div class="timeline-heading">
								<img src="./assets/img/quebec_gouv.png" width="100%">
								<p class="text-center">
									Programme NovaScience
								</p>
							</div>
						</div>
					</li>

					<li class="timeline-inverted">
						<div class="timeline-image">
							<img
								class="rounded-circle img-fluid"
								src="./assets/img/4.jpg"
								alt="Projet Progression"
							>
						</div>

						<div class="timeline-panel">
							<div class="timeline-heading">
								<h4>Code source</h4>
							</div>
							<div class="timeline-body">
								<p class="text-muted">
									<a href="https://gitlab.com/projet-progression">projet-progression sur Gitlab</a>
								</p>
							</div>
						</div>
					</li>

					<li class="timeline">
						<div class="timeline-image">
							<img
								class="rounded-circle img-fluid"
								src="./assets/img/5.jpg"
								alt="Contenu"
							>
						</div>
						<div class="timeline-panel">
							<div class="timeline-heading">
								<h4>Développement d'exercices</h4>
							</div>
							<div class="timeline-body">
								<p class="text-muted">
									<a href="https://gitlab.com/projet-progression/contenu">contenu sur Gitlab</a>
								</p>
							</div>
						</div>
					</li>

					<li class="timeline-inverted">
						<div class="timeline-image">
							<img
								class="rounded-circle img-fluid"
								src="./assets/img/1.jpg"
								alt="Projet Progression"
							>
						</div>
						<div class="timeline-panel">
							<div class="timeline-heading">
								<h4>Documentation</h4>
							</div>
							<div class="timeline-body">
								<p class="text-muted">
									<a href="https://progression.pages.dti.crosemont.quebec/documentation">Documentation</a>
								</p>
							</div>
						</div>
					</li>

				</ul>
			</div>
		</section>
		<!-- Footer-->
		<footer class="footer py-4">
			<div class="container">
				<div class="row align-items-center">
					<div class="col-lg-4 text-lg-start">
						Copyright &copy; Progression 2021-2022
					</div>
					<div class="col-lg-4 text-lg-end" />
				</div>
			</div>
		</footer>
	</v-sheet>
</template>
<!-- Core theme JS-->

<script src="./home.js"></script>
<!-- Core theme CSS (includes Bootstrap)-->
<style scoped src="./home.css"></style>


<!-- Google fonts-->

