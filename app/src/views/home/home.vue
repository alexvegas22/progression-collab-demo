<template>
	<div>
		
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
            <div class="container" style="border-style: solid; border-width: 10px; border-color: white; border-radius: 20px; padding: 10px; background-color: rgba(60,40,60,0.85)">
                <div class="masthead-heading"><span class="text-info"> Prog</span><span style="color: white">ression</span></div>
                <div class="masthead-subheading text-uppercase">Le gym de la programmation</div>
				<p>
					Progression est un exerciseur conçu pour aider l'apprentissage de la programmation par la pratique. Il permet d’<b>exécuter</b> dans un IDE en ligne, <b>analyser</b> et <b>diagnostiquer</b> du code programmé dans le cadre d'un exercice proposé et génère pour l'étudiant une rétroaction immédiate et spécifique.
				</p>

                <a class="btn btn-primary btn-xl text-uppercase" href="#débuter">Débuter</a>
            </div>
        </header>

		<!-- Services-->
		<section class="page-section" id="débuter">
			<div class="container">
				<div class="text-center">
					<h2 class="section-heading text-uppercase">Je veux...</h2>
				</div>
				<div class="row text-center">
					<div class="col-md-4">
						<a href="#étudiant">
							<span class="fa-stack fa-4x">
								<i class="fas fa-circle fa-stack-2x text-primary"></i>
								<i class="fas fa-laptop fa-stack-1x fa-inverse"></i>
							</span>
							<h4 class="my-3">apprendre la programmation</h4>
						</a>
						<p class="text-muted">Programmez en ligne. Mettez en pratique les nouveaux concepts de programmation et validez vos résultats instantanément.</p>
					</div>
					<div class="col-md-4">
						<a href="#enseignant">
							<span class="fa-stack fa-4x">
								<i class="fas fa-circle fa-stack-2x text-primary"></i>
								<i class="fas fa-chalkboard-teacher fa-stack-1x fa-inverse"></i>
							</span>
							<h4 class="my-3">enseigner la programmation</h4>
						</a>
						<p class="text-muted">Aidez vos étudiants à mettre en pratique les concepts vus en classe à l'aide d'exercices existants ou créez vos propres exercices adaptés à leurs besoins.</p>
					</div>
					<div class="col-md-4">
						<a href="#collaborateur">
							<span class="fa-stack fa-4x">
								<i class="fas fa-circle fa-stack-2x text-primary"></i>
								<i class="fas fa-code-branch fa-stack-1x fa-inverse"></i>
							</span>
							<h4 class="my-3">collaborer</h4>
						</a>
						<p class="text-muted">Donnez un coup de main pour l'amélioration de l'outil.</p>
					</div>
				</div>
			</div>
		</section>


		<section class="page-section" id="étudiant">
			<div class="container">
				<div class="text-center">
					<h2 class="section-heading text-uppercase">Pour les étudiants</h2>
				</div>
						<img src="./img/InterfaceDépart.png">
						<img src="./img/InterfaceRésultat.png">
			</div>
		</section>
		
		<section class="page-section" id="enseignant">
			<div class="container">
				<div class="text-center">
					<h2 class="section-heading text-uppercase">Pour les enseignants</h2>
				</div>
				
				<ul>
					<li> Utiliser des <a href="https://progression.pages.dti.crosemont.quebec/progression_contenu_demo/liste_questions.html"> questions existantes</a>
					</li>
					<li> Créer des questions :
						<a href="https://progression.pages.dti.crosemont.quebec/progression_contenu_demo/CONTRIBUTING.html">Contribuer</a>
					</li>
					<li> Intégrer des questions à Moodle
					</li>
				</ul>
			</div>
		</section>

		<section class="page-section" id="collaborateur">
			<div class="container">
				<div class="text-center">
					<h2 class="section-heading text-uppercase">Pour les collaborateurs</h2>
				</div>
				
				à venir
			</div>
		</section>
		<!-- Footer-->
		<footer class="footer py-4">
			<div class="container">
				<div class="row align-items-center">
					<div class="col-lg-4 text-lg-start">Copyright &copy; Progression 2021</div>
					<div class="col-lg-4 text-lg-end">
					</div>
				</div>
			</div>
		</footer>

	</div>
</template>
<!-- Core theme JS-->

<script src="./home.js"></script>
<!-- Core theme CSS (includes Bootstrap)-->
<style src="./home.css"></style>


<!-- Google fonts-->

